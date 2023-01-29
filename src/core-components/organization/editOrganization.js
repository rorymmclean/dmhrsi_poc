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
import { ThunkDispatch } from 'thunk-dispatch';
import { editOrganizationThunk, getOrganizationDetailsThunk } from './api/organization-thunk-api';
import { Alert, Snackbar } from '@mui/material';
import GetContactDetailsPrimary from 'core-components/contact/getContactDetailsPrimary';
import ProjectTable from 'core-components/project/projectTable';

export default function EditOrganization() {
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);

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
          Organization Update is Successful!
        </Alert>
      </Snackbar>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Edit />
            </CardIcon>
            <h4 style={{ color: '#000' }}>Edit Organization</h4>
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
                        onClick={() => {
                          ThunkDispatch(editOrganizationThunk(data))
                            .then(result => {
                              setOpen(true);
                            })
                            .catch(error => console.error('editOrganizationThunk', error))
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

                <GridItem xs={12} sm={6} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    required
                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="Type"
                    label="Type"
                    name="Type"
                    autoComplete="Type"
                    value={data?.SERVICE}
                    onChange={e => setData({ ...data, SERVICE: e.target.value })}
                  />
                </GridItem>
                <GetContactDetailsPrimary ENTITITY_TYPE={'ORG'} />
                <GridItem xs={12} sm={12} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <ProjectTable
                    ID={location.pathname.split('/')[3]}
                    NAME={data?.ORGANIZATION_NAME}
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
