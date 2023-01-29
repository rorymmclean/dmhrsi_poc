import React, { useMemo, useState } from 'react';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'thunk-dispatch';
import { getTimeCardListThunk } from './api/timeCard-thunk-api';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AddTimeCard from './addTimeCard';
import EditTimeCard from './editTimeCard';
import { Chip } from '@mui/material';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';
import Autocomplete from '@mui/material/Autocomplete';

export default function TimeCardTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [valueEmployee, setValueEmployee] = React.useState(null);
  const [inputValueEmployee, setInputValueEmployee] = React.useState('');
  const [optionsEmployee, setOptionsEmployee] = React.useState([]);

  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Date',
        field: 'FIRST_NAME',
        render: rowData => (
          <Typography type={'h3'}>{`${rowData?.START_DATE} - ${rowData?.END_DATE}`}</Typography>
        )
      },
      {
        title: 'Approver',
        field: 'FIRST_NAME',
        render: rowData => (
          <Typography
            type={'h3'}
          >{`${rowData?.FIRST_NAME} ${rowData?.MIDDLE_NAME} ${rowData?.LAST_NAME}`}</Typography>
        )
      },
      {
        title: 'Status',
        field: 'FIRST_NAME',
        render: rowData => {
          let s = '';
          let color = '';
          if (rowData?.STATUS == 'C') {
            s = 'Close';
            color = 'error';
          }
          if (rowData?.STATUS == 'A') {
            s = 'Approved';
            color = 'success';
          }
          if (rowData?.STATUS == 'O') {
            s = 'Open';
            color = 'primary';
          }
          return <Chip label={`${s}`} color={color} variant="outlined" />;
        }
      },
      {
        title: 'Hours',
        field: 'HOURS',
        render: rowData => <Typography type={'h3'}>{`${rowData?.HOURS || 0} Hrs `}</Typography>
      },
      {
        field: 'view',
        editable: 'never',
        title: 'Edit',
        render: rowData => (
          <EditTimeCard
            rowData={rowData}
            onSave={result => {
              setState(prevState => {
                const data = [...prevState.data];
                return {
                  ...prevState,
                  data: data.map(item => {
                    return item.TIMECARD_ID === result.TIMECARD_ID ? result : item;
                  })
                };
              });
            }}
          />
        )
      },
      {
        field: 'view',
        editable: 'never',
        title: 'View',
        render: rowData => <EditTimeCard rowData={rowData} disabled={true} />
      }
    ],
    data: []
  });

  const searchEmployees = value => {
    ThunkDispatch(getPersonListThunk({ search_string: value }))
      .then(result => {
        if (result?.data?.body) {
          setOptionsEmployee(JSON.parse(result.data.body));
        } else {
          setOptionsEmployee([]);
        }
      })
      .catch(error => console.error('getPersonListThunk', error))
      .finally(() => {});
  };
  React.useEffect(() => {
    let active = true;
    if (inputValueEmployee === '') {
      setOptionsEmployee([]);
      return undefined;
    }
    searchEmployees(inputValueEmployee);

    return () => {
      active = false;
    };
  }, [inputValueEmployee]);

  const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        TIMECARD_ID: data.TIMECARD_ID
      };
    });

  const searchTimeCards = value => {
    if (value?.length) {
      ThunkDispatch(getTimeCardListThunk({ search_string: value }))
        .then(result => {
          if (result?.data?.body) {
            setState(prevState => {
              return { ...prevState, data: JSON.parse(result.data.body) };
            });
          } else {
            setState(prevState => {
              return { ...prevState, data: [] };
            });
          }
        })
        .catch(error => console.error('getTimeCardListThunk', error))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setState(prevState => {
        return { ...prevState, data: [] };
      });
    }
  };

  const style = {
    overrides: {
      MuiTableCell: {
        root: {
          padding: '6px'
        }
      }
    }
  };
  const theme = createMuiTheme(style);
  const customersOptions = useMemo(
    () => (
      <>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            isLoading={isLoading}
            columns={state.columns}
            components={{
              Container: props => (
                <JPGrid container>
                  <JPGrid item xs={12}>
                    <Paper {...props} sx elevation={0} />
                  </JPGrid>
                </JPGrid>
              )
            }}
            data={renderList(state.data)}
            options={{
              search: false,
              showTitle: false,
              toolbar: false
            }}
          />
        </MuiThemeProvider>
      </>
    ),
    [state.data, state.columns, isLoading]
  );

  return (
    <div className="m-sm-30">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <JPGrid container direction="row" alignItems="flex-end" justify="space-between">
                <JPGrid item xs={6}>
                  <CardIcon color="primary">
                    <ScheduleIcon />
                  </CardIcon>
                  <h4 style={{ color: '#000' }}>Timecards</h4>
                </JPGrid>
                <JPGrid item xs={6} container alignItems="flex-end" justify="flex-end">
                  <AddTimeCard
                    onSave={result => {
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.unshift(result);

                        return { ...prevState, data };
                      });
                    }}
                  />
                </JPGrid>
              </JPGrid>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Autocomplete
                    id="Persons"
                    getOptionLabel={option =>
                      `${option.FIRST_NAME} ${option.MIDDLE_NAME} ${option.LAST_NAME}`
                    }
                    filterOptions={x => x}
                    options={optionsEmployee}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueEmployee}
                    noOptionsText="No Persons"
                    onChange={(event, newValue) => {
                      setOptionsEmployee(
                        newValue ? [newValue, ...optionsEmployee] : optionsEmployee
                      );
                      searchTimeCards(
                        newValue
                          ? `${newValue.FIRST_NAME} ${newValue.MIDDLE_NAME} ${newValue.LAST_NAME}`
                          : null
                      );
                      setValueEmployee(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputValueEmployee(newInputValue);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Person Name"
                        fullWidth
                        variant="outlined"
                        required
                      />
                    )}
                  />
                </GridItem>
              </GridContainer>
              {customersOptions}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
/*Bud Jerrold Whitfield */
