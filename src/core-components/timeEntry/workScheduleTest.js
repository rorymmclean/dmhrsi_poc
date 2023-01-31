import React, { useEffect, useMemo, useRef } from 'react';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { ThunkDispatch } from 'thunk-dispatch';
import {
  addTimeEntryThunk,
  editTimeEntryThunk,
  getTimeEntryListThunk
} from './api/timeEntry-thunk-api';
import moment from 'moment';
import CustamAutocomplete from './CustamAutocomplete';
import Button from 'components/CustomButtons/Button';

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export default function WorkScheduleTest(props) {
  const { TIMECARD_ID, disabled, START_DATE, week, END_DATE } = props;
  const daysHeader = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const [getTimeEntryList, setGetTimeEntryList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  let ref = useRef({});

  useEffect(() => {
    let start = '';
    let end = '';

    let currentDate = new Date(START_DATE);

    currentDate.setDate(currentDate.getDate() + week);
    if (week == 0) {
      let currentDate = new Date(START_DATE);

      currentDate.setDate(currentDate.getDate() + 7);
      start = START_DATE;
      end = moment(currentDate).format('YYYY-MM-DD');
    } else {
      let currentDate = new Date(START_DATE);

      currentDate.setDate(currentDate.getDate() + week);
      start = moment(currentDate).format('YYYY-MM-DD');
      end = END_DATE;
    }

    ThunkDispatch(
      getTimeEntryListThunk({ search_string: TIMECARD_ID || '', startdate: start, enddate: end })
    )
      .then(result => {
        let endList = [];

        if (result?.data?.body) {
          let startList =
            JSON.parse(result.data.body).sort((a, b) => {
              return new Date(a.POST_DATE).getTime() - new Date(b.POST_DATE).getTime();
            }) || [];

          const groupedPeople = groupBy(startList, 'TASK_ID');

          Object.keys(groupedPeople).forEach((item, index) => {
            const task = groupedPeople[item].find(i => i.TASK_ID == item);

            endList.push({
              W: groupedPeople[item],
              task: {
                SERVICE_TYPE: task?.SERVICE_TYPE,
                TASK_ID: task?.TASK_ID,
                TASK_NAME: task?.TASK_NAME
              }
            });
          });

          setGetTimeEntryList(endList);
          setIsLoading(false);
        } else {
          endList.push({ W: [], task: { SERVICE_TYPE: '', TASK_ID: '', TASK_NAME: '' } });

          setGetTimeEntryList(endList);
        }
      })
      .catch(error => console.error('getTimeEntryListThunk', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [TIMECARD_ID]);

  const createInput = (value, index, obj, currentDayIndex, ttimeEntryList) => {
    let currentDate = new Date(START_DATE);

    currentDate.setDate(currentDate.getDate() + currentDayIndex + week);

    const userObject = {
      TIMECARD_ID: TIMECARD_ID,
      POST_DATE: moment(currentDate).format('YYYY/MM/DD'),
      HOURS: value,
      TASK_ID: ttimeEntryList[index]?.task?.TASK_ID || ref.current?.TASK_ID
    };
    if (ttimeEntryList[index]?.task?.TASK_ID || ref.current?.TASK_ID)
      ThunkDispatch(addTimeEntryThunk(userObject))
        .then(result => {})
        .catch(error => console.error('addTimeEntryThunk', error))
        .finally(() => {});
  };

  const editInput = (val, value) => {
    const userObject = {
      TIMECARD_ID: TIMECARD_ID,
      POST_DATE: value.POST_DATE,
      HOURS: val,
      TASK_ID: value.TASK_ID,
      TIMECARD_ENTRY_ID: value.TIMECARD_ENTRY_ID
    };

    ThunkDispatch(editTimeEntryThunk(userObject))
      .then(result => {})
      .catch(error => console.error('editTimeEntryThunk', error))
      .finally(() => {});
  };

  return (
    <JPGrid
      container
      direction="row"
      alignContent={'flex-start'}
      alignItems={'flex-start'}
      justify={'flex-start'}
    >
      <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'}>
        <Typography style={{ textAlign: 'center' }}>Task</Typography>
      </JPGrid>

      <JPGrid item xs={12} sm={1} minWidth={140} marginRight={'6.2px'} marginBottom={'6.2px'}>
        <Typography style={{ textAlign: 'center' }}>Type</Typography>
      </JPGrid>

      {daysHeader.map((day, index) => (
        <JPGrid item xs={12} sm={1} key={index} marginLeft={'6.2px'} marginBottom={'6.2px'}>
          <Typography style={{ textAlign: 'center' }}>{day}</Typography>
        </JPGrid>
      ))}
      {!isLoading ? (
        getTimeEntryList?.map((day, index) => {
          return (
            <>
              <CustamAutocomplete
                disabled={disabled}
                task={day.task}
                TIMECARD_ENTRY_ID={day?.W?.map(i => i.TIMECARD_ENTRY_ID) || 0}
                TIMECARD_ID={TIMECARD_ID}
                onAddTask={val => {
                  ref.current = val;
                }}
              />

              {daysHeader.map((d, currentDayIndex) => {
                let ccc = day.W.find(iDay => iDay.DOW == d) || {};

                return (
                  <JPGrid
                    item
                    xs={12}
                    sm={1}
                    key={currentDayIndex}
                    marginLeft={'6.2px'}
                    marginBottom={'6.2px'}
                  >
                    {Object.keys(ccc).length ? (
                      <TextField
                        variant="outlined"
                        style={{ fontSize: '25px' }}
                        fullWidth
                        defaultValue={ccc?.HOURS}
                        disabled={disabled}
                        onBlur={e => editInput(e.target.value, ccc)}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        style={{ fontSize: '25px' }}
                        fullWidth
                        disabled={disabled}
                        onBlur={e =>
                          createInput(
                            e.target.value,
                            index,
                            day.W,
                            currentDayIndex,
                            getTimeEntryList
                          )
                        }
                      />
                    )}
                  </JPGrid>
                );
              })}
            </>
          );
        })
      ) : (
        <Grid container justify="center" alignItems="center" style={{ minHeight: 400 }}>
          <CircularProgress size={35}></CircularProgress>
        </Grid>
      )}

      {!isLoading ? (
        <JPGrid container direction="row" alignItems="center" justify="flex-end">
          <JPGrid>
            {!disabled ? (
              <Button
                style={{
                  fontFamily: 'Trattatello',
                  fontWeight: 'bold'
                }}
                color={!ref.current?.TASK_ID?.length || false ? 'info' : null}
                disabled={ref.current?.TASK_ID?.length || false}
                onClick={() =>
                  setGetTimeEntryList(prevState => {
                    return [
                      ...prevState,
                      { W: [], task: { SERVICE_TYPE: '', TASK_ID: '', TASK_NAME: '' } }
                    ];
                  })
                }
              >
                Add Task
              </Button>
            ) : null}
          </JPGrid>
        </JPGrid>
      ) : null}
    </JPGrid>
  );
}
