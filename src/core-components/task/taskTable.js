import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Button from 'components/CustomButtons/Button.jsx';
import Edit from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import AddTask from './addTask';
import { Search } from '@material-ui/icons';

import TaskIcon from '@material-ui/icons/AssignmentLate';
import { getTaskListAPI } from './api/task-api';
export default function TaskTable(props) {
  const { search_string, PROJECT_NAME } = props;

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const onClickStory = item => {
    history.push({
      pathname: `/admin/editTask/${item?.TASK_ID}`,
      state: { id: item?.TASK_ID }
    });
  };
  const onClickStoryview = item => {
    history.push({
      pathname: `/admin/viewTask/${item?.TASK_ID}`,
      state: { id: item?.TASK_ID }
    });
  };

  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (search_string?.length) searchTasks(search_string);
    else {
      searchTasks('01175');
    }
  }, [search_string]);

  const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        name: data.name,
        id: data.id
      };
    });

  const searchTasks = async value => {
    const response = await getTaskListAPI({ search_string: value });

    if (response?.data?.body) {
      setIsLoading(false);
      setData(JSON.parse(response.data.body));
    } else {
      setData([]);
    }
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    searchTasks(value);
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
  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Trattatello',
      fontWeight: 'bold',
      fontSize: '28px',
      color: '#000',
    },
  });




  return (
    <div className="m-sm-30">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <JPGrid container direction="row" alignItems="flex-end" justify="space-between">
                <JPGrid item xs={2}>
                  <CardIcon color="primary">
                    <TaskIcon />
                  </CardIcon>
                  <GridItem xs={12}  sm={12} md={12}>
                  <Typography 
                    style={{
                      color: '#000',
                      fontFamily: 'Trattatello',
                      fontWeight: 'bold',
                      fontSize: '23px'
                    }}
                  >
                    Tasks
                  </Typography>
                  </GridItem>
                </JPGrid>
                <JPGrid item xs={8}>
                  {' '}
                  {!search_string?.length ? (
                    <TextField
                      type="search"
                      variant="outlined"
                      style={{ paddingTop: 4 }}
                      fullWidth
                      placeholder="Search"
                      onChange={handleInputChange}
                      defaultValue={PROJECT_NAME?.length ? PROJECT_NAME : '01175'}
                      InputProps={{
                        style: { fontFamily: 'Trattatello' },
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  ) : null}
                </JPGrid>
                <JPGrid item xs={2} container alignItems="flex-end" justify="flex-end">
                  <AddTask
                    search_string={search_string}
                    onSave={result => {
                      setData(prevState => {
                        const data = [...prevState];
                        data.unshift(result);

                        return data;
                      });
                    }}
                  />
                </JPGrid>
              </JPGrid>
            </CardHeader>
            <CardBody>
              <MuiThemeProvider theme={theme}>
                <MaterialTable
                  isLoading={isLoading}
                  columns={[
                    { title: 'Task Name', field: 'TASK_NAME' },
                    { title: 'Task #', field: 'TASK_NBR' },
                    { title: 'Service Type', field: 'SERVICE_TYPE' },
                    { title: 'FCC', field: 'FCC' },
                    { title: 'SUPE', field: 'SUPE' },
                    { title: 'Labor Cost', field: 'LABOR_COST_ID' },
                    !search_string?.length
                      ? {
                          field: 'view',
                          editable: 'never',
                          title: 'Edit',
                          render: rowData => (
                            <Button
                              color={'info'}
                              onClick={() => onClickStory(rowData)}
                              style={{
                                padding: '8px 4px 6px 8px',
                                borderRadius: '20px'
                              }}
                            >
                              <Edit onClick={() => onClickStory(rowData)} />
                            </Button>
                          )
                        }
                      : null,
                    search_string?.length
                      ? {
                          field: 'view',
                          editable: 'never',
                          title: 'View',
                          render: rowData => (
                            <Button
                              color={'info'}
                              onClick={() => onClickStoryview(rowData)}
                              style={{
                                padding: '8px 4px 6px 8px',
                                borderRadius: '20px'
                              }}
                            >
                              <Search onClick={() => onClickStoryview(rowData)} />
                            </Button>
                          )
                        }
                      : null
                  ].filter(item => item)}
                  components={{
                    Container: props => (
                      <JPGrid container>
                        <JPGrid item xs={12}>
                          <Paper {...props} sx elevation={0} />
                        </JPGrid>
                      </JPGrid>
                    )
                  }}
                  data={renderList(data)}
                  options={{
                    rowStyle: {
                      height: 4,
                      width: 5
                    },
                    search: false,
                    showTitle: false,
                    toolbar: false
                  }}
                />
              </MuiThemeProvider>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
