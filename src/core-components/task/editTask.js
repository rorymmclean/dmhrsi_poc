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
import { editTaskThunk, getTaskDetailsThunk } from './api/task-thunk-api';
import { ThunkDispatch } from 'thunk-dispatch';
import { Alert, Snackbar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { getLaborcostsThunk } from 'core-components/laborcosts/laborcosts-thunk-api';
import { getProjectListThunk } from 'core-components/project/api/project-thunk-api';

export default function EditTask() {
  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  useEffect(() => {
    ThunkDispatch(getTaskDetailsThunk({ id: location.pathname.split('/')[3] }))
      .then(result => {
        if (result?.data?.body) {
          setData({ ...JSON.parse(result.data.body)[0], id: location.pathname.split('/')[3] });
          setValue(JSON.parse(result.data.body)[0]);
          setValueLaborcosts(JSON.parse(result.data.body)[0]);
        }
      })
      .catch(error => console.error('getTaskDetailsThunk', error))
      .finally(() => { });
  }, []);

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const [valueLaborcosts, setValueLaborcosts] = React.useState(null);
  const [inputValueLaborcosts, setInputValueLaborcosts] = React.useState('');
  const [optionsLaborcosts, setOptionsLaborcosts] = React.useState([]);

  React.useEffect(() => {
    ThunkDispatch(getLaborcostsThunk())
      .then(result => {
        if (result?.data?.body) {
          setOptionsLaborcosts(JSON.parse(result.data.body));
        } else {
          setOptionsLaborcosts([]);
        }
      })
      .catch(error => console.error('getPersonListThunk', error))
      .finally(() => { });
  }, []);

  const searchProjects = value => {
    ThunkDispatch(getProjectListThunk({ search_string: value }))
      .then(result => {
        if (result?.data?.body) {
          setOptions(JSON.parse(result.data.body));
        } else {
          setOptions([]);
        }
      })
      .catch(error => console.error('getProjectListThunk', error))
      .finally(() => { });
  };
  React.useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }
    searchProjects(inputValue);

    return () => {
      active = false;
    };
  }, [inputValue]);

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
          Task Update is Successful!
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
                fontSize: '23px'
              }}
            >
              Edit Task
            </h4>
          </CardHeader>
          {Object.keys(data).length ? (
            <CardBody>
              <GridContainer xs={12} sm={12} md={12}>
                <GridItem item xs={12} sm={8}>
                  <TextField
                    variant="outlined"
                    required

                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="TASK_NAME"
                    label="Task Name"
                    name="TASK_NAME"
                    autoComplete="TASK_NAME"
                    value={data?.TASK_NAME}
                    onChange={e => setData({ ...data, TASK_NAME: e.target.value })}
                  />
                </GridItem>

                <GridItem xs={12} sm={4}>
                  <JPGrid container direction={'row'} justify={'flex-end'}>
                    <JPGrid item marginRight={3} marginLeft={3}>
                      <Button
                        style={{
                          fontFamily: 'Papyrus',
                          fontWeight: 'bold'
                        }}
                        onClick={() => {
                          history.push({
                            pathname: `/admin/task`
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
                          const userObject = {
                            TASK_ID: location.pathname.split('/')[3],
                            PROJECT_ID: value.PROJECT_ID,
                            TASK_NAME: data.TASK_NAME,
                            SERVICE_TYPE: data.SERVICE_TYPE,
                            TASK_NBR: data.TASK_NBR,
                            FCC: data?.FCC,
                            SUPE: data?.SUPE,
                            LABOR_COST_ID: valueLaborcosts?.LABOR_COST_ID
                          };
                          ThunkDispatch(editTaskThunk(userObject))
                            .then(result => {
                              setOpen(true);
                            })
                            .catch(error => console.error('editTaskThunk', error))
                            .finally(() => { });
                        }}
                        variant={'outlined'}
                        disabled={
                          !value?.PROJECT_ID?.length ||
                          !data?.TASK_NAME?.length ||
                          !data?.SERVICE_TYPE?.length ||
                          !data?.TASK_NBR?.length
                        }
                        color={
                          !value?.PROJECT_ID?.length ||
                            !data?.TASK_NAME?.length ||
                            !data?.SERVICE_TYPE?.length ||
                            !data?.TASK_NBR?.length
                            ? null
                            : 'info'
                        }
                      >
                        Save
                      </Button>
                    </JPGrid>
                  </JPGrid>
                </GridItem>

                <GridItem item xs={12} sm={4} style={{ marginTop: '16px' }}>
                  <Autocomplete
                    id="Project"
                    getOptionLabel={option => option.PROJECT_NAME}
                    filterOptions={x => x}
                    options={options}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={value}
                    noOptionsText="No ProjectS"
                    onChange={(event, newValue) => {
                      setOptions(newValue ? [newValue, ...options] : options);
                      setValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Project Name"
                        fullWidth
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </GridItem>

                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    required

                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="SERVICE_TYPE"
                    label="Service"
                    name="SERVICE_TYPE"
                    autoComplete="SERVICE_TYPE"
                    value={data?.SERVICE_TYPE}
                    onChange={e => setData({ ...data, SERVICE_TYPE: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <TextField
                    variant="outlined"
                    required

                    style={{ fontSize: '25px' }}
                    fullWidth
                    id="TASK_NBR"
                    label="TASK #"
                    name="TASK_NBR"
                    autoComplete="TASK_NBR"
                    value={data?.TASK_NBR}
                    onChange={e => setData({ ...data, TASK_NBR: e.target.value })}
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
                    id="SUPE"
                    label="SUPE"
                    name="SUPE"
                    autoComplete="SUPE"
                    value={data?.SUPE}
                    onChange={e => setData({ ...data, SUPE: e.target.value })}
                  />
                </GridItem>
                <GridItem xs={12} sm={4} style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <Autocomplete
                    id="Laborcosts"
                    getOptionLabel={option => `${option.LABOR_COST_ID}`}
                    filterOptions={x => x}
                    options={optionsLaborcosts}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueLaborcosts}
                    noOptionsText="No Labor Costs"
                    onChange={(event, newValue) => {
                      setOptionsLaborcosts(
                        newValue ? [newValue, ...optionsLaborcosts] : optionsLaborcosts
                      );
                      setValueLaborcosts(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputValueLaborcosts(newInputValue);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Labor Cost Name"
                        fullWidth
                        variant="outlined"
                        required
                      />
                    )}
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
