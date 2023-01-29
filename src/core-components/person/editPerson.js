import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import Edit from '@material-ui/icons/Edit';
import Card from 'components/Card/Card.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Button from 'components/CustomButtons/Button';
import 'date-fns';
import { editPersonThunk, getPersonDetailsThunk } from './api/person-thunk-api';
import { ThunkDispatch } from 'thunk-dispatch';
import { Alert, Snackbar } from '@mui/material';
import GetContactDetailsPrimary from 'core-components/contact/getContactDetailsPrimary';
import ProjectTable from 'core-components/project/projectTable';

export default function EditPerson() {
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  useEffect(() => {
    ThunkDispatch(getPersonDetailsThunk({ id: location.pathname.split('/')[3] }))
      .then(result => {
        if (result?.data?.body) {
          setData({ ...JSON.parse(result.data.body)[0], id: location.pathname.split('/')[3] });
        }
      })
      .catch(error => console.error('getPersonDetailsThunk', error))
      .finally(() => {});
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
          Person Update is Successful!
        </Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Edit />
            </CardIcon>
            <h4 style={{ color: '#000' }}>Edit Person</h4>
          </CardHeader>
          {Object.keys(data).length ? (
            <CardBody>
              <GridContainer xs={12} sm={12} md={12}>
                <GridItem item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    required
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="FirstName"
                    label="First Name"
                    name="FirstName"
                    autoComplete="FirstName"
                    value={data?.FIRST_NAME}
                    onChange={e => setData({ ...data, FIRST_NAME: e.target.value })}
                  />
                </GridItem>
                <GridItem item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    required
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="MiddleName"
                    label="Middle Name"
                    name="MiddleName"
                    autoComplete="MiddleName"
                    value={data?.MIDDLE_NAME}
                    onChange={e => setData({ ...data, MIDDLE_NAME: e.target.value })}
                  />
                </GridItem>
                <GridItem item xs={12} sm={3}>
                  <TextField
                    variant="outlined"
                    required
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    name="LastName"
                    autoComplete="LastName"
                    value={data?.LAST_NAME}
                    onChange={e => setData({ ...data, LAST_NAME: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={3}>
                  <JPGrid container direction={'row'} justify={'flex-end'}>
                    <JPGrid item marginRight={3} marginLeft={3}>
                      <Button
                        onClick={() => {
                          history.push({
                            pathname: `/admin/person`
                          });
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
                              setOpen(true);
                            })
                            .catch(error => console.error('editPersonThunk', error))
                            .finally(() => {});
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
                <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="Grade"
                    label="Grade"
                    name="Grade"
                    autoComplete="Grade"
                    value={data?.GRADE}
                    onChange={e => setData({ ...data, GRADE: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="EDIPN"
                    label="EDIPN"
                    name="EDIPN"
                    autoComplete="ENIPN"
                    value={data?.EDIPN}
                    onChange={e => setData({ ...data, EDIPN: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="PersonType"
                    label="Person Type"
                    name="PersonType"
                    autoComplete="PersonType"
                    value={data?.PERSON_TYPE}
                    onChange={e => setData({ ...data, PERSON_TYPE: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="NationalId"
                    label="National ID"
                    name="NationalId"
                    autoComplete="NationalId"
                    value={data?.NATIONAL_ID}
                    onChange={e => setData({ ...data, NATIONAL_ID: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="CIVILLIAN_TITLE"
                    label="Title"
                    name="CIVILLIAN_TITLE"
                    autoComplete="CIVILLIAN_TITLE"
                    value={data?.CIVILLIAN_TITLE}
                    onChange={e => setData({ ...data, CIVILLIAN_TITLE: e.target.value })}
                  />
                </GridItem>

                <GetContactDetailsPrimary ENTITITY_TYPE={'PERSON'} />

                <GridItem xs={12} sm={12} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <ProjectTable
                    ID={location.pathname.split('/')[3]}
                    NAME={`${data?.FIRST_NAME} ${data?.MIDDLE_NAME} ${data?.LAST_NAME}`}
                  />
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
