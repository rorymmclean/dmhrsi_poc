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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
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
import { ThunkDispatch } from 'thunk-dispatch';
import { editTimeCardThunk, getTimeCardDetailsThunk, getTimeCardListThunk } from './api/timeCard-thunk-api';

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



export default function EditTimeCard() {
  const history = useHistory();
  const location = useLocation();

  const [expanded, setExpanded] = React.useState('panel1');
    const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);

  
  useEffect(() => {
    ThunkDispatch(getTimeCardDetailsThunk({id:location.pathname.split('/')[3]}))
      .then(result => {
        if (result?.data?.body) {
          setData({ ...JSON.parse(result.data.body)[0],START_DATE:new Date(),id:location.pathname.split('/')[3] })
      
      }
      })
      .catch(error => console.error('getTimeCardDetailsThunk', error))
      .finally(() => { });
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  

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
          TimeCard Update is Successful!
        </Alert>
      </Snackbar>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Edit />
              </CardIcon>
              <h4 style={{color:"#000"}}>Edit TimeCard</h4>
            </CardHeader>
          {Object.keys(data).length ? <CardBody>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  id="ID"
                  label="TimeCard ID"
                  name="ID"
                  autoComplete="ID"
                  value={data?.TIMECARD_ID}
                  onChange={(e) => setData({ ...data, TIMECARD_ID: e.target.value })}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>

                <JPGrid container direction={'row'} justify={'flex-end'}>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                      onClick={() => {
                        history.push({
                          pathname: `/admin/TimeCard`
                   
                        })
                      }}
                      variant={'outlined'}
                    >
                      Cancel
                    </Button>
                  </JPGrid>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                      onClick={() => { ThunkDispatch(editTimeCardThunk(data))
                                .then(result => {


setOpen(true)
                                })
                                .catch(error => console.error('editTimeCardThunk', error))
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
              <GridItem xs={12} sm={6} style={{ marginBottom: '20px' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="From"
                    format="MM/dd/yyyy"
                    value={data?.START_DATE}
                    onChange={(e) => setData({ ...data, START_DATE: e })}

                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
            
              </GridItem>
              <GridItem xs={12} sm={6} style={{ marginTop: '16px' }}>

                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  id="Type"
                  label="Type"
                  name="Type"
                  autoComplete="Type"
                  value={data?.SERVICE}
                  onChange={(e) => setData({ ...data, SERVICE: e.target.value })}
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

          </CardBody> : <Grid
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
