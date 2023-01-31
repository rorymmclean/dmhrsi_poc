import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Card from 'components/Card/Card.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Button from 'components/CustomButtons/Button';
import 'date-fns';

import MaterialTable from 'material-table';
import { getPersonDetailsThunk } from './api/person-thunk-api';
import { ThunkDispatch } from 'thunk-dispatch';
import { getAssignmentDetailsThunk } from 'core-components/assignment/api/assignment-thunk-api';

export default function Assignments() {
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = React.useState(true);

  const [data, setData] = React.useState({});

  const [state, setState] = React.useState({
    columns: [
      { title: 'Task', field: 'TASK_NAME' },
      { title: 'Organization', field: 'ORGANIZATION_NAME' },
      { title: 'Start Date ', field: 'START_DATE' },
      { title: 'End Date', field: 'END_DATE' },
      { title: 'Primary', field: 'PRIMARY_FLAG' }
    ],
    data: []
  });
  useEffect(() => {
    ThunkDispatch(getPersonDetailsThunk({ id: location.pathname.split('/')[3] }))
      .then(result => {
        if (result?.data?.body) {
          setData({ ...JSON.parse(result.data.body)[0], id: location.pathname.split('/')[3] });
        }
      })
      .catch(error => console.error('getPersonDetailsThunk', error))
      .finally(() => {});

    ThunkDispatch(getAssignmentDetailsThunk({ search_string: location.pathname.split('/')[3] }))
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
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            <h4
              style={{
                color: '#000',
                fontFamily: 'Trattatello',
                fontWeight: 'bold',
                fontSize: '23px'
              }}
            >
              Assignments
            </h4>
          </CardHeader>
          {Object.keys(data).length ? (
            <CardBody>
              <GridContainer>
                <MaterialTable style={{fontFamily: 'Trattatello'}}
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
