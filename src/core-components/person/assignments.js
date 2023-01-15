import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Card from 'components/Card/Card.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Button from 'components/CustomButtons/Button';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import MaterialTable from 'material-table';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { getPersonDetailsThunk } from './api/person-thunk-api';
import { ThunkDispatch } from 'thunk-dispatch';
import { getAssignmentDetailsThunk } from 'core-components/assignment/api/assignment-thunk-api';
import ProjectTable from 'core-components/project/projectTable';



export default function Assignments() {
  const history = useHistory();
  const location = useLocation();


    const [isLoading, setIsLoading] = React.useState(true);

    const [data, setData] = React.useState({});
  console.log( data );

   const [state, setState] = React.useState({
      columns: [
       { title: 'Project', field: 'FIRST_NAME' },
      { title: 'Task', field: 'TASK_ID' },
        { title: 'Organization', field: 'ORGANIZATION_ID' },
          { title: 'START_DATE', field: 'Start Date' },
          { title: 'END_DATE', field: 'End Date' },
          { title: 'Location', field: 'LOCATION_ID' },
          { title: 'Primary', field: 'PRIMARY_FLAG' },

    ],
    data: []
  });
      useEffect(() => {
    ThunkDispatch(getPersonDetailsThunk({id:location.pathname.split('/')[3]}))
      .then(result => {
        if (result?.data?.body) {
          setData({ ...JSON.parse(result.data.body)[0],id:location.pathname.split('/')[3] })
      
      }
      })
      .catch(error => console.error('getPersonDetailsThunk', error))
          .finally( () => { } );
        
       ThunkDispatch(getAssignmentDetailsThunk({search_string:location.pathname.split('/')[3]}))
      .then(result => {
        if (result?.data?.body) {
            
      
        setState(prevState => {
          const data = [...prevState.data];
          for (let index = 0; index < JSON.parse(result.data.body).length; index++) {
            data.push(JSON.parse(result.data.body)[index]);
          }
          return { ...prevState, data };
        });
      }
      })
      .catch(error => console.error('getAssignmentDetailsThunk', error))
      .finally(() => { setIsLoading(false) });
      }, [] );
  
    const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        name: data.name,
        id: data.id
      };
    });
  return (
           <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <AssignmentIcon />
              </CardIcon>
              <h4 style={{color:"#000"}}>Assignment</h4>
            </CardHeader>
            {Object.keys(data).length ? <CardBody>

            <GridContainer>
            <GridItem item xs={12} sm={1}>
              <Typography>Person</Typography>
                            </GridItem>

               <GridItem item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  id="FirstName"
                  disabled
                  label="First Name"
                  name="FirstName"
                  autoComplete="FirstName"
                  value={data?.FIRST_NAME}
                />
              </GridItem>
              <GridItem item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  disabled
                  id="MiddleName"
                  label="Middle Name"
                  name="MiddleName"
                  autoComplete="MiddleName"
                  value={data?.MIDDLE_NAME}
                />
              </GridItem>
              <GridItem item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  disabled
                  id="LastName"
                  label="Last Name"
                  name="LastName"
                  autoComplete="LastName"
                  value={data?.LAST_NAME}
                />
              </GridItem>
                            <GridItem xs={12} sm={12} md={2}>

                          <JPGrid container direction={'row'} justify={'flex-end'}>
              <JPGrid item marginRight={3} marginLeft={3}>
                <Button
                  onClick={()=>{history.push({
      pathname: `/admin/editPerson/${location.pathname.split('/')[3]}`,
                    
    });}}
                  variant={'outlined'}
                >
                  Cancel
                </Button>
                                  </JPGrid>
                                  <JPGrid item marginRight={3} marginLeft={3}>
                <Button
                  onClick={()=>{}}
                  variant={'outlined'}
                  color={'info'}
                >
                  Save
                </Button>
                </JPGrid>
                </JPGrid>
                </GridItem>


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

               </GridContainer>

      

               

            </CardBody>:<Grid
            container
            justify="center"
              alignItems="center"
              style={{  minHeight: 400}}
          >
            <CircularProgress size={35}></CircularProgress>
          </Grid> }
        </Card>
                          
        </GridItem>
      </GridContainer>
        

      
  );
}
