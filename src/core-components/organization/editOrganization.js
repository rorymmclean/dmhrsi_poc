import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Edit from '@material-ui/icons/Edit';
import Card from 'components/Card/Card.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Button from 'components/CustomButtons/Button';
import 'date-fns';
import { ThunkDispatch } from 'thunk-dispatch';
import { editOrganizationThunk, getOrganizationDetailsThunk } from './api/organization-thunk-api';
import { Alert, Snackbar } from '@mui/material';
import GetContactDetailsPrimary from 'core-components/contact/getContactDetailsPrimary';
import ProjectTable from 'core-components/project/projectTable';
import { Tabs, Tab } from '@material-ui/core';
import PersonTable from 'core-components/person/personTable';
import defaultImage from "assets/img/under.jpeg";
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function EditOrganization() {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);


  const useStyles = makeStyles({
    root: {
      '& .MuiTabs-indicator': {
        backgroundColor: 'blue',
      },
    },
  });
  const classes = useStyles();


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
      <GridItem xs={12} sm={12}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <GridItem xs={12} sm={12} style={{ marginTop: '16px', marginBottom: '16px' }}>

            {index === 1 ? (
              <>
                <PersonTable
                  ID={location.pathname.split('/')[0]}
                  NAME={data?.ORGANIZATION_NAME}
                  MODE={"Model"}
                />
              </>
            ) : index === 2 ? (
              <>
       


              <Stack sx={{ width: '100%', color: 'grey.500',position: 'center', bottom: 10 }} >

<LinearProgress color="secondary" />
<LinearProgress color="success" />
<LinearProgress color="inherit" />

<LinearProgress color="secondary" />
<LinearProgress color="success" />
<LinearProgress color="inherit" />
<Typography style={{fontFamily:'Papyrus',fontWeight:'bold',fontSize:'30px',textAlign:'center',color:'black'}}>Under Construction...</Typography>
<LinearProgress color="secondary" />
<LinearProgress color="success" />
<LinearProgress color="inherit" />
<LinearProgress color="secondary" />
<LinearProgress color="success" />
<LinearProgress color="inherit" />




</Stack>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  
                  
                  <img src={defaultImage} width={'55%'} />
                  
                </div>
              </>

            ) : (
              <ProjectTable
                ID={location.pathname.split('/')[0]}
                NAME={data?.ORGANIZATION_NAME}
                MODE={"Model"}
              />
            )

            }
          </GridItem>
        )}

      </GridItem>
    );
  }


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      className: 'PrivateTabIndicator-color'
    };
  }


  useEffect(() => {
    ThunkDispatch(getOrganizationDetailsThunk({ id: location.pathname.split('/')[3] }))
      .then(result => {
        if (result?.data?.body) {
          setData({
            ...JSON.parse(result.data.body)[0],
            START_DATE: new Date(),
            id: location.pathname.split('/')[3]
          });
        }
      })
      .catch(error => console.error('getOrganizationDetailsThunk', error))
      .finally(() => { });
  }, []);

  return (
    <GridContainer>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={1000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setOpen(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }

            setOpen(false);
          }}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Organization Update Is Successful!
        </Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Edit />
            </CardIcon>
            <h4
              style={{
                color: '#000',
                fontFamily: 'Papyrus',
                fontWeight: 'bold',
                fontSize: '28px'
              }}
            >
              Edit Organization
            </h4>
          </CardHeader>
          {Object.keys(data).length ? (
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    required

                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="Name"
                    label="Organization Name"
                    name="Name"
                    autoComplete="Name"
                    value={data?.ORGANIZATION_NAME}
                    onChange={e => setData({ ...data, ORGANIZATION_NAME: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <JPGrid container direction={'row'} justify={'flex-end'}>
                    <JPGrid item marginRight={3} marginLeft={3}>
                      <Button
                        style={{
                          fontFamily: 'Papyrus',
                          fontWeight: 'bold'
                        }}
                        onClick={() => {
                          history.push({
                            pathname: `/admin/organization`
                          });
                        }}
                        variant={'outlined'}
                      >
                        Cancel
                      </Button>
                    </JPGrid>
                    <JPGrid item marginRight={3} marginLeft={3}>
                      <Button
                        style={{
                          fontFamily: 'Papyrus',
                          fontWeight: 'bold'
                        }}
                        onClick={() => {
                          ThunkDispatch(editOrganizationThunk(data))
                            .then(result => {
                              setOpen(true);
                            })
                            .catch(error => console.error('editOrganizationThunk', error))
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

                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    required
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="Service"
                    label="Service"
                    name="Service"
                    autoComplete="Service"
                    value={data?.SERVICE}
                    onChange={e => setData({ ...data, SERVICE: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="UIC"
                    label="UIC"
                    name="UIC"
                    autoComplete="UIC"
                    value={data?.UIC}
                    onChange={e => setData({ ...data, UIC: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="DMIS"
                    label="DMIS"
                    name="DMIS"
                    autoComplete="DMIS"
                    value={data?.DMIS}
                    onChange={e => setData({ ...data, DMIS: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="PARENT_DMIS"
                    label="UIC"
                    name="PARENT_DMIS"
                    autoComplete="PARENT_DMIS"
                    value={data?.PARENT_DMIS}
                    onChange={e => setData({ ...data, PARENT_DMIS: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="FCC"
                    label="FCC"
                    name="FCC"
                    autoComplete="FCC"
                    value={data?.FCC}
                    onChange={e => setData({ ...data, FCC: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="PEC"
                    label="PEC"
                    name="PEC"
                    autoComplete="PEC"
                    value={data?.PEC}
                    onChange={e => setData({ ...data, PEC: e.target.value })}
                  />
                </GridItem>
                <GetContactDetailsPrimary ENTITITY_TYPE={'ORG'} />

                <GridItem xs={12} sm={12}  >
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    classes={{ root: classes.root }}

                    style={{ width: '100%', paddingTop: '1vh', border: '0.5px solid #cfcccc', borderRadius: '5px', backgroundColor: '#f0f0f0' }}
                    textColor="primary"
                    centered
                  >
                    <Tab label="Manage &nbsp; Projects" style={{ fontFamily: 'Papyrus', fontWeight: 'bold', fontSize: '17px', color: 'black', marginRight: '25px' }} {...a11yProps(0)} />
                    <Tab label="Manage &nbsp; People" style={{ fontFamily: 'Papyrus', fontWeight: 'bold', fontSize: '17px', color: 'black', marginRight: '25px' }}  {...a11yProps(1)} />
                    <Tab label="Manage &nbsp; LCA " style={{ fontFamily: 'Papyrus', fontWeight: 'bold', fontSize: '17px', color: 'black', marginRight: '25px' }} {...a11yProps(2)} />

                  </Tabs>
                  <TabPanel value={value} index={0} >
                    Projects content
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Task content
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Persons content
                  </TabPanel>

                </GridItem>

              </GridContainer>
            </CardBody>
          ) : (
            <Grid container justify="center" alignItems="center" style={{ minHeight: 400 }}>
              <CircularProgress size={35}></CircularProgress>
            </Grid>
          )}
        </Card>
      </GridItem>
    </GridContainer>
  );
}
