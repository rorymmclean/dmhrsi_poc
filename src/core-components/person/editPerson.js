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
import { editPersonThunk, getPersonDetailsThunk } from './api/person-thunk-api';
import { ThunkDispatch } from 'thunk-dispatch';
import { Alert, Snackbar } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



export default function EditPerson() {
  const history = useHistory();
  const location = useLocation();

 const [expanded, setExpanded] = React.useState('panel1');
  const [open, setOpen] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
    const [data, setData] = React.useState({});
console.log(data);
    useEffect(() => {
    ThunkDispatch(getPersonDetailsThunk({id:location.pathname.split('/')[3]}))
      .then(result => {
        if (result?.data?.body) {
          setData({ ...JSON.parse(result.data.body)[0],id:location.pathname.split('/')[3] })
      
      }
      })
      .catch(error => console.error('getPersonDetailsThunk', error))
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
          Person Update is Successful!
        </Alert>
      </Snackbar>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Edit />
              </CardIcon>
              <h4 style={{color:"#000"}}>Edit Person</h4>
            </CardHeader>
          {Object.keys(data).length ? <CardBody>

            <GridContainer xs={12} sm={12} md={12}>
              <GridItem item xs={12} sm={3}>
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
              </GridItem>
              <GridItem item xs={12} sm={3}>
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
              </GridItem>
              <GridItem item xs={12} sm={3}>
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
              </GridItem>
              <GridItem xs={12} sm={3}>

                <JPGrid container direction={'row'} justify={'flex-end'}>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                      onClick={() => {
                        history.push({
                          pathname: `/admin/person`
                   
                        })
                      }}
                      variant={'outlined'}
                    >
                      Cancel
                    </Button>
                  </JPGrid>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                      onClick={() => {
 ThunkDispatch(editPersonThunk(data))
                                .then(result => {


setOpen(true)
                                })
                                .catch(error => console.error('editPersonThunk', error))
                                .finally(() => { });

                       }}
                      variant={'outlined'}
                      color={'info'}
                    >
                      Save
                    </Button>
                  </JPGrid>
                </JPGrid>
              </GridItem>
                                          
     
                 
              <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
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
              </GridItem>
              <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
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
              </GridItem>
              <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
                <TextField
                  variant="outlined"
                  style={{ fontSize: "25px" }}
                  fullWidth
                  id="EDIPN"
                  label="EDIPN"
                  name="EDIPN"
                  autoComplete="ENIPN"
                  value={data?.EDIPN}
                  onChange={(e) => setData({ ...data, EDIPN: e.target.value })}
                />
              </GridItem>
              <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
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
              </GridItem>
              <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
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
              </GridItem>
              <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: "16px" }}>
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
              </GridItem>
              <GridItem xs={12} sm={12} >

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Primary Location</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.SERVICE}
                            label="Type"
                            onChange={(e) => setData({ ...data, SERVICE: e.target.value })}

                          >
                            <MenuItem value={10}>W2DN04</MenuItem>
                            <MenuItem value={20}>W2DN05</MenuItem>
                            <MenuItem value={30}>W2DN11</MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <JPGrid container direction={'row'} justify={'flex-end'}>
                          <JPGrid item marginRight={3} marginLeft={3}>
                            <Button
                              onClick={() => {
                                history.push({
                                  pathname: `/admin/contact/${location.pathname.split('/')[3]}`,
                                  state: {
                                    id: 1
                                  }
                                });
                              }}
                              variant={'outlined'}
                              color={'info'}
                            >
                              Contacts
                            </Button>
                          </JPGrid>
                          <JPGrid item marginRight={3} marginLeft={3}>
                            <Button
                              onClick={() => {
                                history.push({
                                  pathname: `/admin/assignments/${location.pathname.split('/')[3]}`,
                                  state: {
                                    id: 1
                                  }
                                });
                              }}
                              variant={'outlined'}
                              color={'info'}
                            >
                              Assignments
                            </Button>
                          </JPGrid>
                        </JPGrid>

                        
                      </GridItem>
                      <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                        <TextField
                          variant="outlined"
                          style={{ fontSize: "25px" }}
                          fullWidth
                          id="ADDRESS_1"
                          label="Address 1"
                          name="ADDRESS_1"
                          autoComplete="ADDRESS_1"
                          value={data?.ADDRESS_1}
                          onChange={(e) => setData({ ...data, ADDRESS_1: e.target.value })}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                        <TextField
                          variant="outlined"
                          style={{ fontSize: "25px" }}
                          fullWidth
                          id="ADDRESS_2"
                          label="Address 2"
                          name="ADDRESS_2"
                          autoComplete="ADDRESS_2"
                          value={data?.ADDRESS_2}
                          onChange={(e) => setData({ ...data, ADDRESS_2: e.target.value })}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                        <TextField
                          variant="outlined"
                          style={{ fontSize: "25px" }}
                          fullWidth
                          id="ADDRESS_3"
                          label="Address 3"
                          name="ADDRESS_3"
                          autoComplete="ADDRESS_3"
                          value={data?.ADDRESS_3}
                          onChange={(e) => setData({ ...data, ADDRESS_3: e.target.value })}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} style={{ marginTop: '16px' }}>

                        <TextField
                          variant="outlined"
                          style={{ fontSize: "25px" }}
                          fullWidth
                          id="COUNTRY"
                          label="Country"
                          name="COUNTRY"
                          autoComplete="COUNTRY"
                          value={data?.COUNTRY}
                          onChange={(e) => setData({ ...data, COUNTRY: e.target.value })}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>

                        <TextField
                          variant="outlined"
                          style={{ fontSize: "25px" }}
                          fullWidth
                          id="CITY"
                          label="City"
                          name="CITY"
                          autoComplete="CITY"
                          value={data?.CITY}
                          onChange={(e) => setData({ ...data, CITY: e.target.value })}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>

                        <TextField
                          variant="outlined"
                          style={{ fontSize: "25px" }}
                          fullWidth
                          id="POSTAL_CODE"
                          label="Postal Code"
                          name="POSTAL_CODE"
                          autoComplete="POSTAL_CODE"
                          value={data?.POSTAL_CODE}
                          onChange={(e) => setData({ ...data, POSTAL_CODE: e.target.value })}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10} style={{ marginTop: '16px' }}>
                        <JPGrid container direction={'row'} justify={'flex-end'}>
                          <JPGrid item >
                            <TextField
                              variant="outlined"
                              style={{ fontSize: "25px" }}
                              fullWidth
                              id="STATE"
                              label="State"
                              name="STATE"
                              autoComplete="STATE"
                              value={data?.STATE}
                              onChange={(e) => setData({ ...data, STATE: e.target.value })}
                            />
                          </JPGrid>
                        </JPGrid>

                        
                      </GridItem>
                    </GridContainer>

                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>LCA Codes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
         
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Self-Service Preferences</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
         
                  </AccordionDetails>
                </Accordion>
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
