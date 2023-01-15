import React from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';

import { useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { addPersonThunk } from './api/person-thunk-api';

import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import { getOrganizationListThunk } from 'core-components/organization/api/organization-thunk-api';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };



export default function AddPerson(props) {
    const { onSave } = props;
    const location = useLocation();


    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({});
     const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    
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
                    defaultTitle="Person"
                    title={`Add Person`}
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
                                FIRST_NAME: data.FIRST_NAME,
                                MIDDLE_NAME: data.MIDDLE_NAME,
                                LAST_NAME: data.LAST_NAME,
                                SERVICE: data.SERVICE,
                                EDIPN: data?.EDIPN,
                                PERSON_TYPE: data?.PERSON_TYPE,
                                NATIONAL_ID: data?.NATIONAL_ID,
                                CIVILLIAN_TITLE: data?.CIVILLIAN_TITLE,
                                PERSONNEL_CAT: data?.PERSONNEL_CAT,
                                GRADE:data?.GRADE,

                            };



                            ThunkDispatch(addPersonThunk({ ...userObject }))
                                .then(result => {

                                    onSave({ ...userObject ,PERSON_ID:result.data.ID})


                                    setShow(false)
                                    setData({})

                                })
                                .catch(error => console.error('addPersonThunk', error))
                                .finally(() => { });

                        },
                        isLoading: false,
                        disabled: !value?.ORGANIZATION_ID?.length|| !data?.SERVICE?.length || !data?.FIRST_NAME?.length || !data?.MIDDLE_NAME?.length || !data?.LAST_NAME?.length ,
                        color: !value?.ORGANIZATION_ID?.length|| !data?.SERVICE?.length || !data?.FIRST_NAME?.length || !data?.MIDDLE_NAME?.length || !data?.LAST_NAME?.length ? null : 'info'
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

                            <JPGrid item xs={12} sm={4}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="FirstName"
                                    label="First Name"
                                    name="FirstName"
                                    autoComplete="FirstName"
                                    value={data?.FIRST_NAME}
                                    onChange={(e) => setData({ ...data, FIRST_NAME: e.target.value })}
                                />
                            </JPGrid>
                             <JPGrid item xs={12} sm={4}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="MiddleName"
                                    label="Middle Name"
                                    name="MiddleName"
                                    autoComplete="MiddleName"
                                    value={data?.MIDDLE_NAME}
                                    onChange={(e) => setData({ ...data, MIDDLE_NAME: e.target.value })}
                                />
                            </JPGrid>
                             <JPGrid item xs={12} sm={4}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="LastName"
                                    label="Last Name"
                                    name="LastName"
                                    autoComplete="LastName"
                                    value={data?.LAST_NAME}
                                    onChange={(e) => setData({ ...data, LAST_NAME: e.target.value })}
                                />
                            </JPGrid>
                            <JPGrid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="Service"
                                    label="Service"
                                    name="Service"
                                    autoComplete="Service"
                                    value={data?.SERVICE}
                                    onChange={(e) => setData({ ...data, SERVICE: e.target.value })}
                                />
                            </JPGrid>
                           <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="Grade"
                                    label="Grade"
                                    name="Grade"
                                    autoComplete="Grade"
                                    value={data?.GRADE}
                                    onChange={(e) => setData({ ...data, GRADE: e.target.value })}
                                />
                            </JPGrid>
<JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="EDIPN"
                                    label="EDIPN"
                                    name="EDIPN"
                                    autoComplete="EDIPN"
                                    value={data?.EDIPN}
                                    onChange={(e) => setData({ ...data, EDIPN: e.target.value })}
                                />
                            </JPGrid>
                             <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="PersonType"
                                    label="Person Type"
                                    name="PersonType"
                                    autoComplete="PersonType"
                                    value={data?.PERSON_TYPE}
                                    onChange={(e) => setData({ ...data, PERSON_TYPE: e.target.value })}
                                />
                            </JPGrid>
                            <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="NationalId"
                                    label="National ID"
                                    name="NationalId"
                                    autoComplete="NationalId"
                                    value={data?.NATIONAL_ID}
                                    onChange={(e) => setData({ ...data, NATIONAL_ID: e.target.value })}
                                />
                            </JPGrid>
                             <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="CIVILLIAN_TITLE"
                                    label="Title"
                                    name="CIVILLIAN_TITLE"
                                    autoComplete="CIVILLIAN_TITLE"
                                    value={data?.CIVILLIAN_TITLE}
                                    onChange={(e) => setData({ ...data, CIVILLIAN_TITLE: e.target.value })}
                                />
                            </JPGrid>
                             <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="PERSONNEL_CAT"
                                    label="Category"
                                    name="PERSONNEL_CAT"
                                    autoComplete="PERSONNEL_CAT"
                                    value={data?.PERSONNEL_CAT}
                                    onChange={(e) => setData({ ...data, PERSONNEL_CAT: e.target.value })}
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
                        Add Person
                    </Button>
                </JPGrid>
            </JPGrid>

        </>


    );
}
