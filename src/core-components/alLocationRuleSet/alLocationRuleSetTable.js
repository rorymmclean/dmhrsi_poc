import React, { useMemo, useState } from 'react';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'thunk-dispatch';
import { getArsetListThunk } from './api/AlLocationRuleSet-thunk-api';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import AddAlLocationRuleSet from './addalLocationRuleSet';
import EditAlLocationRuleSet from './editalLocationRuleSet';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';
import Autocomplete from '@mui/material/Autocomplete';

export default function AlLocationRuleSetTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [valueEmployee, setValueEmployee] = React.useState(null);
  const [inputValueEmployee, setInputValueEmployee] = React.useState('');
  const [optionsEmployee, setOptionsEmployee] = React.useState([]);
  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Date',
        field: 'FIRST_NAME',
        customSort: (a, b) => {
          if (a.START_DATE === '' || a.START_DATE === null || a.START_DATE === undefined) return 1;
          if (b.START_DATE === '' || b.START_DATE === null || b.START_DATE === undefined) return -1;

          return new Date(a.START_DATE).getTime() < new Date(b.START_DATE).getTime() ? -1 : 1;
        },
        render: rowData => (
          <Typography type={'h3'}>{`${rowData?.START_DATE} - ${rowData?.END_DATE}`}</Typography>
        )
      },
      {
        customSort: (a, b) => a.NAME?.localeCompare(b.NAME),

        title: 'Name',
        field: 'NAME',
        render: rowData => <Typography type={'h3'}>{`${rowData?.NAME}`}</Typography>
      },
      {
        customSort: (a, b) => a.FULLNAME?.localeCompare(b.FULLNAME),

        title: 'Person Name',
        field: 'FULLNAME',
        render: rowData => <Typography type={'h3'}>{`${rowData?.FULLNAME}`}</Typography>
      },
      {
        field: 'view',
        editable: 'never',
        title: 'Edit',
        render: rowData => (
          <EditAlLocationRuleSet
            rowData={rowData}
            onSave={result => {
              setState(prevState => {
                const data = [...prevState.data];
                return {
                  ...prevState,
                  data: data.map(item => {
                    return item.RULE_SET_ID === result.RULE_SET_ID ? result : item;
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
        render: rowData => <EditAlLocationRuleSet rowData={rowData} disabled={true} />
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
        name: data.name,
        id: data.id
      };
    });

  const searchAlLocationRuleSets = value => {
    if (value?.length) {
      ThunkDispatch(getArsetListThunk({ search_string: value }))
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
  const theme = createMuiTheme({ style });

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
                <JPGrid item xs={3}>
                  <CardIcon color="primary">
                    <Diversity1Icon />
                  </CardIcon>
                  <GridItem xs={12} sm={12} md={12}>
                    <Typography
                      style={{
                        color: '#000',
                        fontFamily: 'Papyrus',
                        fontWeight: 'bold',
                        fontSize: '22px'
                      }}
                    >
                      Allocation Rule Set
                    </Typography>
                  </GridItem>
                </JPGrid>
                <JPGrid item xs={6}>
                  {' '}
                  <Autocomplete
                    id="Persons"
                    getOptionLabel={option =>
                      `${option.FIRST_NAME} ${option.MIDDLE_NAME} ${option.LAST_NAME}`
                    }
                    filterOptions={x => x}
                    options={optionsEmployee}
                    autoComplete
                    style={{ paddingTop: 8 }}
                    includeInputInList
                    filterSelectedOptions
                    value={valueEmployee}
                    noOptionsText="No Persons"
                    onChange={(event, newValue) => {
                      setOptionsEmployee(
                        newValue ? [newValue, ...optionsEmployee] : optionsEmployee
                      );
                      searchAlLocationRuleSets(
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
                </JPGrid>
                <JPGrid item xs={3} container alignItems="flex-end" justify="flex-end">
                  <AddAlLocationRuleSet
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
            <CardBody>{customersOptions}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
/*Bud Jerrold Whitfield */
