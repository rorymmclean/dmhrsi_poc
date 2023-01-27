import React, { useEffect } from 'react';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ThunkDispatch } from 'thunk-dispatch';
import { getTaskListThunk } from 'core-components/task/api/task-thunk-api';
import { editTimeEntryTaskThunk, editTimeEntryThunk } from './api/timeEntry-thunk-api';
import { editTaskThunk } from 'core-components/alLocationRuleSet/api/AlLocationRuleSet-thunk-api';



export default function CustamAutocomplete( props ){
    const {disabled,task,onAddTask,TIMECARD_ENTRY_ID,RULE_ID} = props;
    const [valueTaskOne, setValueTaskOne] = React.useState(null);
    const [inputValueTaskOne, setInputValueTaskOne] = React.useState('');
    const [ optionsTaskOne, setOptionsTaskOne ] = React.useState( [] );
    

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
    {
        if(TIMECARD_ENTRY_ID&& TIMECARD_ENTRY_ID[0]){
const userObject = {
                          TASK_ID: val.TASK_ID,
                           TIMECARD_ENTRY_ID: TIMECARD_ENTRY_ID[0],
         }

             ThunkDispatch(editTimeEntryTaskThunk(userObject))
      .then(result => {
        
      })
      .catch(error => console.error('editTimeEntryTaskThunk', error))
      .finally(() => {  });
       }
       if ( RULE_ID && RULE_ID[0] )
       {
        const userObject = {
                          TASK_ID: val.TASK_ID,
                           RULE_ID: RULE_ID[0],
         }

             ThunkDispatch(editTaskThunk(userObject))
      .then(result => {
        
      })
      .catch(error => console.error('editTaskThunk', error))
      .finally(() => {  });   
       }
         
      
    };

    const editInputDebounce = React.useRef(_.debounce(editInput, 1000)).current;

    
    return <>
        <JPGrid item xs={ 12 } sm={ 2 } marginRight={ '6.2px' } marginBottom={ '6.2px' } >
        
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
                                if ( re == "clear" )
                                {
                                    setOptionsTaskOne( [] )
                                    setValueTaskOne( null )
                                    setInputValueTaskOne('')
                                    return;

                                }
                                editInputDebounce( newValue )
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
                    <JPGrid item xs={ 12 } sm={ 1 } minWidth={140} marginRight={ '6.2px' } marginBottom={ '6.2px' }>
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
