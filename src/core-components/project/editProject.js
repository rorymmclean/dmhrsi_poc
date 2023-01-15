import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Edit from "@material-ui/icons/Edit";
import Card from 'components/Card/Card.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Button from 'components/CustomButtons/Button';
import "date-fns";
import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';;
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { editProjectThunk, getProjectDetailsThunk } from './api/project-thunk-api';
import { ThunkDispatch } from 'thunk-dispatch';
import { Alert, Snackbar } from '@mui/material';
import { getOrganizationListThunk } from 'core-components/organization/api/organization-thunk-api';
import Autocomplete from '@mui/material/Autocomplete';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';
import TaskTable from 'core-components/task/taskTable';



export default function EditProject() {
  const history = useHistory();
  const location = useLocation();

 const [expanded, setExpanded] = React.useState('panel1');
  const [open, setOpen] = React.useState(false);
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
  }, [ inputValue ] );
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
    useEffect(() => {
    ThunkDispatch(getProjectDetailsThunk({id:location.pathname.split('/')[3]}))
      .then(result => {
        if (result?.data?.body) {
          setData( { ...JSON.parse( result.data.body )[ 0 ], id: location.pathname.split( '/' )[ 3 ] } )
          setValue( JSON.parse( result.data.body )[ 0 ] )
          setValueManager( JSON.parse( result.data.body )[ 0 ])

      }
      })
      .catch(error => console.error('getProjectDetailsThunk', error))
      .finally(() => { });
  }, []);

  return (
    <GridContainer>
      <Snackbar         anchorOrigin={{ vertical:"top", horizontal:"right" }}
 open={open} autoHideDuration={1000} onClose={(event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }}>
        <Alert onClose={(event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }} severity="success" variant="filled" sx={{ width: '100%' }}>
          Project Update is Successful!
        </Alert>
      </Snackbar>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Edit />
              </CardIcon>
              <h4 style={{color:"#000"}}>Edit Project</h4>
            </CardHeader>
          {Object.keys(data).length ? <CardBody>

            <GridContainer xs={12} sm={12} md={12}>
              <GridItem item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  id="PROJECT_NAME"
                  label="Project Name"
                  name="PROJECT_NAME"
                  autoComplete="PROJECT_NAME"
                  value={data?.PROJECT_NAME}
                  onChange={(e) => setData({ ...data, PROJECT_NAME: e.target.value })}
                />
              </GridItem>
             
              
              <GridItem xs={12} sm={4}>

                <JPGrid container direction={'row'} justify={'flex-end'}>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                      onClick={() => {
                        history.push({
                          pathname: `/admin/project`
                   
                        })
                      }}
                      variant={'outlined'}
                    >
                      Cancel
                    </Button>
                  </JPGrid>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                      onClick={ () =>
                      {
                        const userObject = {
                          ORGANIZATION_ID: value.ORGANIZATION_ID,
                          PROJECT_NAME: data.PROJECT_NAME,
                          PROJECT_NBR: data.PROJECT_NBR,
                          MANAGER_ID: valueManager.PERSON_ID,
                          PROJECT_ID: location.pathname.split( '/' )[ 3 ]
                                

                        };

                        ThunkDispatch( editProjectThunk( userObject ) )
                          .then( result =>
                          {


                            setOpen( true )
                          } )
                          .catch( error => console.error( 'editProjectThunk', error ) )
                          .finally( () => { } );

                      } }
                      disabled={ !value?.ORGANIZATION_ID?.length || !data?.PROJECT_NBR?.length ||!data?.PROJECT_NAME?.length || !(valueManager?.PERSON_ID?.length||data?.MANAGER_ID?.length) }
                      color={ !value?.ORGANIZATION_ID?.length || !data?.PROJECT_NBR?.length ||!data?.PROJECT_NAME?.length || !(valueManager?.PERSON_ID?.length||data?.MANAGER_ID?.length) ? null : 'info' }
                   
                      variant={'outlined'}
                    >
                      Save
                    </Button>
                  </JPGrid>
                </JPGrid>
              </GridItem>
                                          
     
                       <GridItem item xs={12} sm={6} style={{ marginTop: '16px' }}>

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
 
              </GridItem>
              <GridItem item xs={ 12 } sm={ 6 } style={ { marginTop: '16px' } }>
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
              </GridItem>

              <GridItem xs={12} sm={6} style={{ marginTop: '16px' ,marginBottom: "16px" }}>
                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  id="Service"
                  label="Service"
                  name="Service"
                  autoComplete="Service"
                  value={data?.PROJECT_NBR}
                  onChange={(e) => setData({ ...data, PROJECT_NBR: e.target.value })}
                />
              </GridItem>
              
             
             
             
             
              <GridItem xs={12} sm={12} >

               <TaskTable search_string={location.pathname.split('/')[3]} />
                
              </GridItem>
              



               
            </GridContainer>

          </CardBody> :
            <Grid
            container
            justify="center"
              alignItems="center"
              style={{  minHeight: 400}}
          >
            <CircularProgress size={35}></CircularProgress>
          </Grid>}
          </Card>
        </GridItem>
      </GridContainer>
        

      
  );
}
