import React, { useEffect } from 'react';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ThunkDispatch } from 'thunk-dispatch';
import { getTaskListThunk } from 'core-components/task/api/task-thunk-api';
import { addTimeEntryThunk, editTimeEntryThunk, getTimeEntryListThunk } from './api/timeEntry-thunk-api';
import moment from 'moment';

function getMinAndMax(dates) {
    var result = {};
    for (var index in dates) {
        var thisDate = dates[index]
        ,   dateParts = thisDate.split(/\//)
        ,   fullDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        if(!result['max'] || fullDate > result['max']) {
            result['max'] = fullDate;
        }
        if(!result['min'] || fullDate < result['min']) {
            result['min'] = fullDate
        }
    }
    return result;
}

function isSameWeek(dates) {
    var minAndMax = getMinAndMax(dates)
    ,   dayOfWeek = {}
    dayOfWeek['min'] = minAndMax['min'].getDay();
    dayOfWeek['max'] = minAndMax['max'].getDay();
    if(minAndMax['max'] - minAndMax['min'] > 518400000 || dayOfWeek['min'] > dayOfWeek['max']) {
        return false;
    }
    return true;
}

export default function WorkScheduleTest( props )
{
    const {TIMECARD_ID ,disabled,START_DATE} = props;
    const daysHeader = [ 'SUN', 'MON', "TUE", "WED","THU", "FRI", "SAT"];
    const [data, setData] = React.useState({});
    const [valueTaskOne, setValueTaskOne] = React.useState(null);
    const [inputValueTaskOne, setInputValueTaskOne] = React.useState('');
    const [optionsTaskOne, setOptionsTaskOne] = React.useState([]);
    const [ getTimeEntryList, setGetTimeEntryList ] = React.useState( [] );
    const [ isLoading, setIsLoading ] = React.useState( true );

  useEffect(() => {
    ThunkDispatch(getTimeEntryListThunk({search_string:TIMECARD_ID||""}))
        .then( result =>
        {
                    let endList = [];

        if (result?.data?.body) {
          let startList = JSON.parse( result.data.body ).sort( ( a, b ) =>
          {
            return new Date( a.POST_DATE ).getTime() - new Date( b.POST_DATE ).getTime();
          } ) || [];


           let x = [];
          startList.forEach( (item,index) =>
          {
          if(index < startList?.length)
            if (isSameWeek([moment(startList[ index ]?.POST_DATE).format('MM/DD/YYYY'),moment(startList[ index+1 ]?.POST_DATE).format('MM/DD/YYYY') ]))
            {
               x.push(item)
            } else
            {
               x.push(item)

              endList.push({ W: x,task:{SERVICE_TYPE:startList[ index ].SERVICE_TYPE,TASK_ID:startList[ index ].TASK_ID,TASK_NAME:startList[ index ].TASK_NAME} }) 
            x=[]
            }

           
          } )
          
           
            
            if ( endList?.length === 1 )
            {
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 

            }
             if ( endList?.length === 2 )
            {
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 

             }
            if ( endList?.length === 3 )
            {
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 

            }
          setGetTimeEntryList(endList)
          setIsLoading(false)
    
            
        } else
        {
             endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 
            endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 
            endList.push( { W: [], task: { SERVICE_TYPE: "", TASK_ID: "", TASK_NAME: "" } } ) 
            setGetTimeEntryList(endList)

      }
      })
      .catch(error => console.error('getTimeEntryListThunk', error))
      .finally(() => {           setIsLoading(false) });
  }, [TIMECARD_ID] );
    
    
    const searchTaskOne = ( value ) =>
    {
        if(value?.length)
        ThunkDispatch(getTaskListThunk({ search_string: value }))
            .then(result => {
                if (result?.data?.body) {
                    setOptionsTaskOne(JSON.parse(result.data.body));
                } else {
                    setOptionsTaskOne([]);

                }
            })
            .catch(error => console.error('getTaskListThunkOne', error))
            .finally(() => { });
    };
    React.useEffect(() => {
        let active = true;
        if (inputValueTaskOne === '') {
            setOptionsTaskOne([]);
            return undefined;
        }
        searchTaskOne(inputValueTaskOne)


        return () => {
            active = false;
        };
    }, [ inputValueTaskOne ] );
    
    const createInput = ( value,index,obj,currentDayIndex,ttimeEntryList ) =>
    {
       let currentDate = new Date( START_DATE )
       
        currentDate.setDate( currentDate.getDate() + currentDayIndex+index*7  );
        
        console.log("userObject", index,currentDayIndex ,ttimeEntryList,ttimeEntryList[index]?.task?.TASK_ID);
        
      

        const userObject = {
                          TIMECARD_ID: TIMECARD_ID,
                          POST_DATE: moment(currentDate).format('YYYY/MM/DD'),
                          HOURS: value,
                         TASK_ID:ttimeEntryList[index]?.task?.TASK_ID,
             

        };
                            console.log("userObject",userObject);
if(ttimeEntryList[index]?.task?.TASK_ID)
       ThunkDispatch(addTimeEntryThunk(userObject))
      .then(result => {
        
      })
      .catch(error => console.error('addTimeEntryThunk', error))
      .finally(() => {  });
    };

    
    const editInput = ( val,value ) =>
    {
         const userObject = {
                          TIMECARD_ID: TIMECARD_ID,
                          POST_DATE: value.POST_DATE,
                          HOURS: val,
                          TASK_ID: value.TASK_ID,
                           TIMECARD_ENTRY_ID: value.TIMECARD_ENTRY_ID,
             

         };

        console.log("userObject",userObject);
       ThunkDispatch(editTimeEntryThunk(userObject))
      .then(result => {
        
      })
      .catch(error => console.error('editTimeEntryThunk', error))
      .finally(() => {  });
    };

    const createInputDebounce = React.useRef( _.debounce( createInput, 500 ) ).current;
    const editInputDebounce = React.useRef(_.debounce(editInput, 500)).current;


    
    return (

        <JPGrid container direction="row" alignContent={'center'} alignItems={'center'} justify={'center'}  >
            <JPGrid item xs={12} sm={2}>

                <Typography style={{ textAlign: 'center' }}>Task</Typography>
            </JPGrid>

            <JPGrid item xs={12} sm={2}>
                <Typography style={{ textAlign: 'center' }}>Type</Typography>
            </JPGrid>

            {daysHeader.map((day) => (
                <JPGrid item xs={12} sm={1} key={day} marginLeft={'6.2px'}     >
                    <Typography style={{ textAlign: 'center' }}>{day}</Typography>
                </JPGrid>
            ))}
            {!isLoading? getTimeEntryList?.map( ( day, index ) =>
            {
                
                return  <>
                    <JPGrid item xs={ 12 } sm={ 2 } marginRight={ '6.2px' } marginBottom={ '6.2px' } >
                        <Autocomplete
                            id="Tasks"
                            getOptionLabel={ ( option ) => `${ option.TASK_NAME }`
                            }
                            filterOptions={ ( x ) => x }
                            options={ optionsTaskOne }
                            autoComplete
                            includeInputInList
                            filterSelectedOptions
                            disabled={disabled}
                            value={ valueTaskOne?.length?valueTaskOne:day.task }
                            defaultValue={ day.task }
                            noOptionsText="No Tasks"
                            onChange={ ( event, newValue ) =>
                            {
                                setOptionsTaskOne( newValue ? [ newValue, ...optionsTaskOne ] : optionsTaskOne );
                                setValueTaskOne( newValue );
                            } }
                            onInputChange={ ( event, newInputValue ) =>
                            {
                                setInputValueTaskOne( newInputValue );
                            } }
                            renderInput={ ( params ) => (
                                <TextField { ...params }  fullWidth variant="outlined" required />
                            ) }

                        />
                    </JPGrid>  
                    <JPGrid item xs={ 12 } sm={ 2 } marginRight={ '6.2px' } marginBottom={ '6.2px' }>
                        <TextField
                            variant="outlined"
                            fullWidth
                            
                            disabled
                            defaultValue={day?.task?.SERVICE_TYPE}
                        />
                
            </JPGrid>
                    { daysHeader.map( (d,currentDayIndex) =>
                    {
                        let ccc = day.W.find( iDay => iDay.DOW == d ) || {};
                        

                        

                        return <JPGrid item xs={ 12 } sm={ 1 } key={ day } marginLeft={ '6.2px' } marginBottom={ '6.2px' }  >
                        {Object.keys( ccc ).length   ? <TextField
                            variant="outlined"
                            style={ { fontSize: "25px" } }
                            fullWidth
                            defaultValue={ ccc?.HOURS  }
                               
                                disabled={disabled}
                                 onChange={ ( e ) =>editInputDebounce(e.target.value,ccc)  }

                        /> : <TextField
                            variant="outlined"
                            style={ { fontSize: "25px" } }
                                    fullWidth
                                    disabled={disabled}
                           
                            onChange={ ( e ) =>createInputDebounce(e.target.value,index,day.W,currentDayIndex,getTimeEntryList)  }
                        /> }
                    </JPGrid>
                   })}
                   </>
                
                
           }): <Grid
            container
            justify="center"
              alignItems="center"
              style={{  minHeight: 400}}
          >
            <CircularProgress size={35}></CircularProgress>
          </Grid>}

           
         
           
          

          
           

        </JPGrid>
    )
}
