import React from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';

import { useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { addTaskThunk } from './api/task-thunk-api';

import Autocomplete from '@mui/material/Autocomplete';
import { getOrganizationListThunk } from 'core-components/organization/api/organization-thunk-api';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';
import { getProjectListThunk } from 'core-components/project/api/project-thunk-api';
import { getLaborcostsThunk } from 'core-components/laborcosts/laborcosts-thunk-api';


export default function AddTask(props) {
    const { onSave,search_string } = props;
    const location = useLocation();


    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({});
     const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    
     const [valueLaborcosts, setValueLaborcosts] = React.useState(null);
  const [inputValueLaborcosts, setInputValueLaborcosts] = React.useState('');
    const [ optionsLaborcosts, setOptionsLaborcosts ] = React.useState( [] );
    
    React.useEffect( () =>
    { 
         ThunkDispatch(getLaborcostsThunk())
      .then(result => {
        if (result?.data?.body) {
                      setOptionsLaborcosts(JSON.parse(result.data.body));
        } else {
                setOptionsLaborcosts([]);

      }
      })
      .catch(error => console.error('getPersonListThunk', error))
      .finally(() => {  });
     }, [  ] );


     const searchProjects = (value) => {
       ThunkDispatch(getProjectListThunk({search_string:value}))
      .then(result => {
        if (result?.data?.body) {
                      setOptions(JSON.parse(result.data.body));
        } else {
                setOptions([]);

      }
      })
      .catch(error => console.error('getProjectListThunk', error))
      .finally(() => {  });
  };
  React.useEffect(() => {
      let active = true;
    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }
searchProjects(inputValue)


    return () => {
      active = false;
    };
  }, [ inputValue]);

    
    const customersOptions = useMemo(
        () => (
            <>


                <JPModal
                    defaultTitle="Task"
                    title={`Add Task`}
                    onClose={_ => {
                        setShow(false)
                        setData({})

                    }}
                    closeButton={true}
                    fullWidth
                    maxWidth="sm"
                    open={show}
                    dialogActions={[{
                        name: 'Save', onClick: _ => {

                            const userObject = {
                                PROJECT_ID: search_string?.length?search_string:value.PROJECT_ID,
                                TASK_NAME: data.TASK_NAME,
                                SERVICE_TYPE: data.SERVICE_TYPE,
                                TASK_NBR: data.TASK_NBR,
                                FCC: data?.FCC,
                                SUPE: data?.SUPE,
                                LABOR_COST_ID:valueLaborcosts.LABOR_COST_ID
                            };



                            ThunkDispatch(addTaskThunk({ ...userObject }))
                                .then(result => {

                                    onSave({ ...userObject ,TASK_ID:result.data.ID})


                                    setShow(false)
                                    setData({})

                                })
                                .catch(error => console.error('addTaskThunk', error))
                                .finally(() => { });

                        },
                        isLoading: false,
                        disabled: !value?.PROJECT_ID?.length|| !data?.TASK_NAME?.length|| !data?.SERVICE_TYPE?.length|| !data?.TASK_NBR?.length  ||!valueLaborcosts?.LABOR_COST_ID?.length ,
                        color: !value?.PROJECT_ID?.length|| !data?.TASK_NAME?.length|| !data?.SERVICE_TYPE?.length|| !data?.TASK_NBR?.length  ||!valueLaborcosts?.LABOR_COST_ID?.length? null : 'info'
                    }]}


                >
                    <JPGrid minHeight={300}>
                        <JPGrid container direction="row" alignItems="center" spacing={2} padding={8}>
                                                        
                               
                            <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="TASK_NAME"
                                    label="Task Name"
                                    name="TASK_NAME"
                                    autoComplete="TASK_NAME"
                                    value={data?.TASK_NAME}
                                    onChange={(e) => setData({ ...data, TASK_NAME: e.target.value })}
                                />
                            </JPGrid>
                                                       {!search_string?.length? <JPGrid item xs={12} sm={12}>

                                  <Autocomplete
      id="Projects"
      getOptionLabel={(option) => option.PROJECT_NAME
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No Projects"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Project Name" fullWidth variant="outlined" required/>
      )}
     
                                />
                            </JPGrid>:null}
                            <JPGrid item xs={12} sm={12}>

                                  
                                  <Autocomplete
      id="Laborcosts"
      getOptionLabel={(option) => `${option.LABOR_COST_ID}`
      }
      filterOptions={(x) => x}
      options={optionsLaborcosts}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={valueLaborcosts}
      noOptionsText="No Labor Costs"
      onChange={(event, newValue) => {
        setOptionsLaborcosts(newValue ? [newValue, ...optionsLaborcosts] : optionsLaborcosts);
        setValueLaborcosts(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValueLaborcosts(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Labor Cost Name" fullWidth variant="outlined" required/>
      )}
     
    />
 
                            </JPGrid>

                             <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="SERVICE_TYPE"
                                    label="Service"
                                    name="SERVICE_TYPE"
                                    autoComplete="SERVICE_TYPE"
                                    value={data?.SERVICE_TYPE}
                                    onChange={(e) => setData({ ...data, SERVICE_TYPE: e.target.value })}
                                />
                            </JPGrid>
                            <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="TASK_NBR"
                                    label="tASK #"
                                    name="TASK_NBR"
                                    autoComplete="TASK_NBR"
                                    value={data?.TASK_NBR}
                                    onChange={(e) => setData({ ...data, TASK_NBR: e.target.value })}
                                />
                            </JPGrid>
                         <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="FCC"
                                    label="FCC"
                                    name="FCC"
                                    autoComplete="FCC"
                                    value={data?.FCC}
                                    onChange={(e) => setData({ ...data, FCC: e.target.value })}
                                />
                </JPGrid>
                 <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="SUPE"
                                    label="SUPE"
                                    name="SUPE"
                                    autoComplete="SUPE"
                                    value={data?.SUPE}
                                    onChange={(e) => setData({ ...data, SUPE: e.target.value })}
                                />
                            </JPGrid>
                        </JPGrid>
                        
                    </JPGrid>
                </JPModal>

            </>
        ),
        [show, data,options]
    );
    return (
        <>
            {customersOptions}
            <JPGrid container direction="row" alignItems="center" justify="flex-end" >
                <JPGrid>
                    <Button color={'info'} onClick={() => setShow(true)} >
                        Add Task
                    </Button>
                </JPGrid>
            </JPGrid>

        </>


    );
}
