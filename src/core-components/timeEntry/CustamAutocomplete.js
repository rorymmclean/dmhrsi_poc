import React, { useEffect } from 'react';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ThunkDispatch } from 'thunk-dispatch';
import { getTaskListThunk } from 'core-components/task/api/task-thunk-api';
import { editTimeEntryThunk } from './api/timeEntry-thunk-api';



export default function CustamAutocomplete( props ){
    const {disabled,task,TIMECARD_ID,onAddTask} = props;
    const [valueTaskOne, setValueTaskOne] = React.useState(null);
    const [inputValueTaskOne, setInputValueTaskOne] = React.useState('');
    const [ optionsTaskOne, setOptionsTaskOne ] = React.useState( [] );
    
console.log("valueTaskOne",valueTaskOne);

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
    React.useEffect( () =>
    {
setValueTaskOne(task)
    }, [ task ] );

    React.useEffect(() => {
        let active = true;
        console.log("inputValueTaskOne",inputValueTaskOne);
        if ( inputValueTaskOne === '' )
        {
            setOptionsTaskOne( [] );
            return undefined;
        } else
        {
            searchTaskOne( inputValueTaskOne )
        }

        return () => {
            active = false;
        };
    }, [ inputValueTaskOne ] );
 
    
   const editInput = ( val ) =>
    {onAddTask(val)
         /*const userObject = {
                          TIMECARD_ID: TIMECARD_ID,
                          POST_DATE: value.POST_DATE,
                          HOURS: val,
                          TASK_ID: value.TASK_ID,
                           TIMECARD_ENTRY_ID: value.TIMECARD_ENTRY_ID,
             

         };*/

       // console.log("userObject",userObject);
       /*ThunkDispatch(editTimeEntryThunk(userObject))
      .then(result => {
        
      })
      .catch(error => console.error('editTimeEntryThunk', error))
      .finally(() => {  });*/
    };

    const editInputDebounce = React.useRef(_.debounce(editInput, 1000)).current;

    
    return <>
        <JPGrid item xs={ 12 } sm={ 3 } marginRight={ '6.2px' } marginBottom={ '6.2px' } >
        
               <Autocomplete
                            
                            getOptionLabel={ ( option ) => option.TASK_NAME
                            }
                            filterOptions={ ( x ) => x }
                            options={ optionsTaskOne }
                            autoComplete
                            includeInputInList
                            filterSelectedOptions
                            disabled={disabled}
                            value={ valueTaskOne}
                            noOptionsText="No Tasks"
                            onChange={ ( event, newValue,re ) =>
                            {
                               console.log("valueTaskOne",re,newValue);
                                if ( re == "clear" )
                                {
                                    setOptionsTaskOne( [] )
                                    setValueTaskOne( null )
                                    setInputValueTaskOne('')
                                    return;

                                }
                                //editInputDebounce( newValue )
                                onAddTask(newValue)
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
                    <JPGrid item xs={ 12 } sm={ 1 } marginRight={ '6.2px' } marginBottom={ '6.2px' }>
             <TextField
                variant="outlined"
                fullWidth
                      key={valueTaskOne?.SERVICE_TYPE}      
                disabled
                defaultValue={ valueTaskOne?.SERVICE_TYPE }
            /> 
                
            </JPGrid>
    </>
    
}
