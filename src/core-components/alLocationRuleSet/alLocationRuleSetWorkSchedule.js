import React, { useEffect, useMemo, useRef } from 'react';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { ThunkDispatch } from 'thunk-dispatch';
import moment from 'moment';
import Button from 'components/CustomButtons/Button';
import CustamAutocomplete from 'core-components/timeEntry/CustamAutocomplete';
import { getAlLocationRuleSetDetailsThunk ,editRuleSetThunk, addRuleSetThunk} from './api/AlLocationRuleSet-thunk-api';


function groupBy(objectArray, property) {
   return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
         acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
   }, {});
}

export default function AlLocationRuleSetWorkSchedule( props )
{
    const {RULE_SET_ID ,disabled,START_DATE} = props;
    const daysHeader = [ 'SUN', 'MON', "TUE", "WED","THU", "FRI", "SAT"];
    const [ getTimeEntryList, setGetTimeEntryList ] = React.useState( [] );
    const [ isLoading, setIsLoading ] = React.useState( true );
    let ref = useRef( {} );

    useEffect( () =>
    {
    ThunkDispatch(getAlLocationRuleSetDetailsThunk({id:RULE_SET_ID||""}))
        .then( result =>
        {
            let endList = [];

        if (result?.data?.body) {
          let startList = JSON.parse( result.data.body ).sort( ( a, b ) =>
          {
            return new Date( a.POST_DATE ).getTime() - new Date( b.POST_DATE ).getTime();
          } ) || [];

            const groupedPeople = groupBy( startList, 'TASK_ID' );
            
            Object.keys( groupedPeople ).forEach( ( item, index ) =>
            { 
            const task = groupedPeople[ item ].find( i => i.TASK_ID == item );
                
             endList.push( { W: groupedPeople[item], task: { SERVICE_TYPE: task?.SERVICE_TYPE, TASK_ID: task?.TASK_ID, TASK_NAME: task?.TASK_NAME } } )
 
            })

           
          setGetTimeEntryList(endList)
          setIsLoading(false)
    
            
        } else
        {
             endList.push({ W: [],task:{SERVICE_TYPE:"",TASK_ID:"",TASK_NAME:""} }) 
        
            setGetTimeEntryList(endList)

      }
      })
      .catch(error => console.error('getAlLocationRuleSetDetailsThunk', error))
      .finally(() => {           setIsLoading(false) });
  }, [RULE_SET_ID] );
    
    

    const createInput = ( value,index,obj,currentDayIndex,ttimeEntryList,d ) =>
    {
       

        const userObject = {
                    
                          RULE_SET_ID: RULE_SET_ID,
                          RECORD_TYPE: "PERCENT",
                          TASK_ID: ttimeEntryList[index]?.task?.TASK_ID|| ref.current?.TASK_ID,
                          DOW: d,
                          UNITS: value,

        };
        console.log("userObject",userObject);
if(ttimeEntryList[index]?.task?.TASK_ID|| ref.current?.TASK_ID)
       ThunkDispatch(addRuleSetThunk(userObject))
      .then(result => {
        
      })
      .catch(error => console.error('addRuleSetThunk', error))
      .finally(() => {  });
    };

    
    const editInput = ( val,value ) =>
    {
         const userObject = {
                          RULE_SET_ID: RULE_SET_ID,
                          RECORD_TYPE: "PERCENT",
                          TASK_ID: value.TASK_ID,
                          DOW: value.DOW,
                          UNITS: val,
                          RULE_ID:value.RULE_ID
         };
console.log("userObject",userObject);
       ThunkDispatch(editRuleSetThunk(userObject))
      .then(result => {
        
      })
      .catch(error => console.error('editRuleSetThunk', error))
      .finally(() => {  });
    };

    const createInputDebounce = React.useRef( _.debounce( createInput, 500 ) ).current;
    const editInputDebounce = React.useRef(_.debounce(editInput, 500)).current;


    
    return (

        <JPGrid container direction="row" alignContent={'flex-start'} alignItems={'flex-start'} justify={'flex-start'}  >
            <JPGrid item xs={12} sm={3} marginRight={ '6.2px' } marginBottom={ '6.2px' }>

                <Typography style={{ textAlign: 'center' }}>Task</Typography>
            </JPGrid>

            <JPGrid item xs={12} sm={1} marginRight={ '6.2px' } marginBottom={ '6.2px' }>
                <Typography style={{ textAlign: 'center' }}>Type</Typography>
            </JPGrid>

            {daysHeader.map((day,index) => (
                <JPGrid  item xs={12} sm={1} key={index} marginLeft={ '6.2px' } marginBottom={ '6.2px' }      >
                    <Typography style={{ textAlign: 'center' }}>{day}</Typography>
                </JPGrid>
            ))}
            {!isLoading? getTimeEntryList?.map( ( day, index ) =>
            {
                
                return  <>
            

                    <CustamAutocomplete disabled={ disabled } task={ day.task } RULE_ID={day?.W?.map(i=>i.RULE_ID)||0}  onAddTask={ ( val ) => { ref.current = val } } />

    
                   
                    { daysHeader.map( (d,currentDayIndex) =>
                    {
                        let ccc = day.W.find( iDay => iDay.DOW == d ) || {};
                        

                        

                        return <JPGrid item xs={ 12 } sm={ 1 } key={ currentDayIndex } marginLeft={ '6.2px' } marginBottom={ '6.2px' }  >
                        {Object.keys( ccc ).length   ? <TextField
                            variant="outlined"
                            style={ { fontSize: "25px" } }
                            fullWidth
                            defaultValue={ ccc?.UNITS  }
                                InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
                                disabled={disabled}
                                 onChange={ ( e ) =>editInputDebounce(e.target.value,ccc)  }

                        /> : <TextField
                            variant="outlined"
                            style={ { fontSize: "25px" } }
                                    fullWidth
                                    disabled={ disabled }
                                     InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
                           
                            onChange={ ( e ) =>createInputDebounce(e.target.value,index,day.W,currentDayIndex,getTimeEntryList,d)  }
                        /> }
                    </JPGrid>
                    } ) }
                 
                   </>
                
                
           }): <Grid
            container
            justify="center"
              alignItems="center"
              style={{  minHeight: 400}}
          >
            <CircularProgress size={35}></CircularProgress>
          </Grid>}

           
         
            { !isLoading  ? <JPGrid container direction="row" alignItems="center" justify="flex-end"  >
                <JPGrid>
                    { !disabled ? <Button color={ !ref.current?.TASK_ID?.length || false ? 'info' : null } disabled={ ref.current?.TASK_ID?.length || false } onClick={ () => setGetTimeEntryList( prevState =>
                    {
          
                        return [ ...prevState, { W: [], task: { SERVICE_TYPE: "", TASK_ID: "", TASK_NAME: "" } } ];
                    } )
                    } >
                        Add Task
                    </Button> : null }
                </JPGrid>
            </JPGrid> : null }
          

          
           

        </JPGrid>
    )
}
