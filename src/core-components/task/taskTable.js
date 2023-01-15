import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import Edit from "@material-ui/icons/Edit";
import { useHistory } from 'react-router-dom';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { Paper, Typography } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import _ from 'lodash';
import { getTaskListThunk } from './api/task-thunk-api';
import AddTask from './addTask';
import TaskIcon from '@mui/icons-material/Task';

export default function TaskTable (props)
{
  const { search_string } = props;

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onClickStory = (item) => {
    history.push({
      pathname: `/admin/editTask/${item?.TASK_ID}`,
      state: { id: item?.TASK_ID }
    });
  }

  const [state, setState] = React.useState({
      columns: [
      { title: 'Task Name', field: 'TASK_NAME' },
        { title: 'Task #', field: 'TASK_NBR' },
        { title: 'Service Type', field: 'SERVICE_TYPE' },
        { title: 'FCC', field: 'FCC' },
        { title: 'SUPE', field: 'SUPE' },
        { title: 'Labor Cost', field: 'LABOR_COST_ID' },
    {
      field: 'view',
      editable: 'never',
      title: 'Edit',
      render: rowData => <Button color={'info'} onClick={() => onClickStory(rowData)} style={{
        padding: "8px 4px 6px 8px",
        borderRadius: "20px"
      }}>
        <Edit onClick={() => onClickStory(rowData)} />
      </Button>
    }
    ],
    data: []
  } );
  
  useEffect( () =>
  {
    if(search_string?.length)
   searchTasks(search_string)
  }, [search_string]);

  const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        name: data.name,
        id: data.id
      };
    });


    const searchTasks = (value) => {
       ThunkDispatch(getTaskListThunk({search_string:value}))
      .then(result => {
        if (result?.data?.body) {
            
        console.log(JSON.parse(result.data.body));
        setState(prevState => {
          const data = [...prevState.data];
          for (let index = 0; index < JSON.parse(result.data.body).length; index++) {
            data.push(JSON.parse(result.data.body)[index]);
          }
          return { ...prevState, data };
        });
        } else {
           setState(prevState => {
             let data = [];
          return { ...prevState, data };
        });
      }
      })
      .catch(error => console.error('getTaskListThunk', error))
      .finally(() => { setIsLoading(false) });
  };

 const inputDebounce = React.useRef(_.debounce(searchTasks, 1000)).current;

  
  
  const handleInputChange = ({ target }) => {
    const { value } = target;
    inputDebounce(value);
  };
  return (
    <div className="m-sm-30">
          <AddTask search_string={search_string} onSave={(result) => {
        setState(prevState => {
          const data = [...prevState.data];
          data.unshift(result);

          return { ...prevState, data };
        });

      }} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <TaskIcon />
              </CardIcon>
              <h4 style={{color:"#000"}}>Tasks</h4>
            </CardHeader>
            <CardBody>
               <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
 <TextField
        type="search"
        variant="outlined"
                    margin="normal"
                    fullWidth
                      placeholder="Search"
      onChange={handleInputChange}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
                </GridItem>
                      </GridContainer>


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
              toolbar: false,

           
      }}
              />
              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
