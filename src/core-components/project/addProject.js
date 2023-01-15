import React from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';

import { useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { addProjectThunk } from './api/project-thunk-api';

import Autocomplete from '@mui/material/Autocomplete';
import { getOrganizationListThunk } from 'core-components/organization/api/organization-thunk-api';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';


export default function AddProject(props) {
    const { onSave } = props;
    const location = useLocation();


    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({});
     const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    
    const [valueManager, setValueManager] = React.useState(null);
  const [inputValueManager, setInputValueManager] = React.useState('');
    const [ optionsManager, setOptionsManager ] = React.useState( [] );
    
     const searchManagers = (value) => {
       ThunkDispatch(getPersonListThunk({search_string:value}))
      .then(result => {
        if (result?.data?.body) {
                      setOptionsManager(JSON.parse(result.data.body));
        } else {
                setOptionsManager([]);

      }
      })
      .catch(error => console.error('getPersonListThunk', error))
      .finally(() => {  });
  };
  React.useEffect(() => {
      let active = true;
    if (inputValueManager === '') {
      setOptionsManager([]);
      return undefined;
    }
searchManagers(inputValueManager)


    return () => {
      active = false;
    };
  }, [ inputValueManager]);



     const searchOrganizations = (value) => {
       ThunkDispatch(getOrganizationListThunk({search_string:value}))
      .then(result => {
        if (result?.data?.body) {
                      setOptions(JSON.parse(result.data.body));
        } else {
                setOptions([]);

      }
      })
      .catch(error => console.error('getOrganizationListThunk', error))
      .finally(() => {  });
  };
  React.useEffect(() => {
      let active = true;
    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }
searchOrganizations(inputValue)


    return () => {
      active = false;
    };
  }, [ inputValue]);

    
    const customersOptions = useMemo(
        () => (
            <>


                <JPModal
                    defaultTitle="Project"
                    title={`Add Project`}
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
                                ORGANIZATION_ID: value.ORGANIZATION_ID,
                                PROJECT_NAME: data.PROJECT_NAME,
                                PROJECT_NBR: data.PROJECT_NBR,
                                MANAGER_ID: valueManager.PERSON_ID,
                                

                            };



                            ThunkDispatch(addProjectThunk({ ...userObject }))
                                .then(result => {

                                    onSave({ ...userObject ,PROJECT_ID:result.data.ID})


                                    setShow(false)
                                    setData({})

                                })
                                .catch(error => console.error('addProjectThunk', error))
                                .finally(() => { });

                        },
                        isLoading: false,
                        disabled: !value?.ORGANIZATION_ID?.length|| !data?.PROJECT_NBR?.length || !data?.PROJECT_NAME?.length||!valueManager.PERSON_ID?.length  ,
                        color: !value?.ORGANIZATION_ID?.length|| !data?.PROJECT_NBR?.length || !data?.PROJECT_NAME?.length ||!valueManager.PERSON_ID?.length ? null : 'info'
                    }]}


                >
                    <JPGrid minHeight={300}>
                        <JPGrid container direction="row" alignItems="center" spacing={2} padding={8}>
                                                        <JPGrid item xs={12} sm={12}>

                                  <Autocomplete
      id="Organization"
      getOptionLabel={(option) => option.ORGANIZATION_NAME
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No Organizations"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Organization Name" fullWidth variant="outlined" required/>
      )}
     
    />
 
                            </JPGrid>
                               <JPGrid item xs={12} sm={12}>

                                  <Autocomplete
      id="Managers"
      getOptionLabel={(option) => `${option.FIRST_NAME} ${option.MIDDLE_NAME} ${option.LAST_NAME}`
      }
      filterOptions={(x) => x}
      options={optionsManager}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={valueManager}
      noOptionsText="No Managers"
      onChange={(event, newValue) => {
        setOptionsManager(newValue ? [newValue, ...optionsManager] : optionsManager);
        setValueManager(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValueManager(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Manager Name" fullWidth variant="outlined" required/>
      )}
     
    />
 
                                                            </JPGrid>


                            <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="ProjectName"
                                    label="Project Name"
                                    name="ProjectName"
                                    autoComplete="ProjectName"
                                    value={data?.PROJECT_NAME}
                                    onChange={(e) => setData({ ...data, PROJECT_NAME: e.target.value })}
                                />
                            </JPGrid>
                             <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="PROJECT_NBR"
                                    label="Service"
                                    name="PROJECT_NBR"
                                    autoComplete="PROJECT_NBR"
                                    value={data?.PROJECT_NBR}
                                    onChange={(e) => setData({ ...data, PROJECT_NBR: e.target.value })}
                                />
                            </JPGrid>
                           
    
                        </JPGrid>
                    </JPGrid>
                </JPModal>

            </>
        ),
        [show, data,options,optionsManager]
    );
    return (
        <>
            {customersOptions}
            <JPGrid container direction="row" alignItems="center" justify="flex-end" >
                <JPGrid>
                    <Button color={'info'} onClick={() => setShow(true)} >
                        Add Project
                    </Button>
                </JPGrid>
            </JPGrid>

        </>


    );
}
