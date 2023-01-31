import React, { useEffect } from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { editTimeCardThunk, getTimeCardDetailsThunk } from './api/timeCard-thunk-api';
import Edit from '@material-ui/icons/Edit';
import WorkScheduleTest from 'core-components/timeEntry/workScheduleTest';
import { Search } from '@material-ui/icons';
import { Alert, Snackbar } from '@mui/material';

import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function EditTimeCard(props) {
  const { onSave, rowData, disabled } = props;
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({});
  const [valueEmployee, setValueEmployee] = React.useState(null);
  const [inputValueEmployee, setInputValueEmployee] = React.useState('');
  const [optionsEmployee, setOptionsEmployee] = React.useState([]);
  const STATUS_NAME = { Open: 'O', Approved: 'A', Close: 'C' };
  const STATUS_ID = { O: 'Open', A: 'Approved', C: 'Close' };
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState('panel1');

  useEffect(() => {
    if (show)
      ThunkDispatch(getTimeCardDetailsThunk({ id: rowData.TIMECARD_ID }))
        .then(result => {
          if (result?.data?.body) {
            setData({ ...JSON.parse(result.data.body)[0] });
          }
        })
        .catch(error => console.error('getTimeCardDetailsThunk', error))
        .finally(() => {});
  }, [rowData.TIMECARD_ID, show]);

  const searchEmployees = value => {
    if (value?.length)
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

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const customersOptions = useMemo(
    () => (
      <>
        <JPModal
          defaultTitle="Timecard"
          title={`Timecard`}
          onClose={_ => {
            setShow(false);
            setData({});
          }}
          closeButton={true}
          fullWidth
          maxWidth="lg"
          open={show}
          dialogActions={
            disabled
              ? []
              : [
                  {
                    name: 'Save',
                    onClick: _ => {
                      const userObject = {
                        TIMECARD_ID: rowData.TIMECARD_ID,
                        START_DATE: data?.START_DATE,
                        END_DATE: data?.END_DATE,
                        STATUS: data?.STATUS,
                        PERSON_ID: valueEmployee?.PERSON_ID || data.PERSON_ID
                      };
                      ThunkDispatch(editTimeCardThunk({ ...userObject }))
                        .then(result => {
                          onSave({ ...rowData, ...userObject });

                          setOpen(true);
                          setShow(false);
                          setData({});
                        })
                        .catch(error => console.error('ddTimeCardThunk', error))
                        .finally(() => {});
                    },
                    isLoading: false,
                    disabled:
                      !data?.START_DATE?.length ||
                      !data?.END_DATE?.length ||
                      !(valueEmployee?.PERSON_ID?.length || data.PERSON_ID) ||
                      !data?.STATUS?.length,
                    color:
                      !data?.START_DATE?.length ||
                      !data?.END_DATE?.length ||
                      !(valueEmployee?.PERSON_ID?.length || data.PERSON_ID) ||
                      !data?.STATUS?.length
                        ? null
                        : 'info'
                  }
                ]
          }
        >
          <JPGrid minHeight={200}>
            <JPGrid container direction="row" alignItems="center" spacing={1} padding={8}>
              <JPGrid item xs={12} sm={3}>
                <Autocomplete
                  id="Employees"
                  getOptionLabel={option =>
                    `${option.FIRST_NAME} ${option.MIDDLE_NAME} ${option.LAST_NAME}`
                  }
                  filterOptions={x => x}
                  options={optionsEmployee}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={valueEmployee?.length ? valueEmployee : data}
                  disabled={data.STATUS == 'C' || disabled}
                  noOptionsText="No Employees"
                  onChange={(event, newValue) => {
                    setOptionsEmployee(newValue ? [newValue, ...optionsEmployee] : optionsEmployee);
                    setValueEmployee(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValueEmployee(newInputValue);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Employee Name"
                      fullWidth
                      variant="outlined"
                      required
                    />
                  )}
                />
              </JPGrid>

              <JPGrid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={STATUS_ID[data.STATUS]}
                    disabled={disabled}
                    label="Status"
                    onChange={e => setData({ ...data, STATUS: STATUS_NAME[e.target.value] })}
                  >
                    <MenuItem value={'Open'}>Open</MenuItem>
                    <MenuItem value={'Approved'}>Approved</MenuItem>
                    <MenuItem value={'Close'}>Close</MenuItem>
                  </Select>
                </FormControl>
              </JPGrid>
              <JPGrid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    format="yyy/MM/dd"
                    shouldDisableDate={date => {
                      const day = moment(date).day();
                      return day !== 1;
                    }}
                    value={data?.START_DATE}
                    disabled={disabled}
                    style={{ width: '100% !important' }}
                    onChange={e => setData({ ...data, START_DATE: moment(e).format('YYYY/MM/DD') })}
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </JPGrid>
              <JPGrid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="End Date"
                    format="yyy/MM/dd"
                    disabled={disabled}
                    value={data?.END_DATE}
                    shouldDisableDate={date => {
                      const day = moment(date).day();
                      return day !== 5;
                    }}
                    style={{ width: '100% !important' }}
                    onChange={e => setData({ ...data, END_DATE: moment(e).format('YYYY/MM/DD') })}
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </JPGrid>

              <Typography style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
                First Week:
              </Typography>

              {show ? (
                <WorkScheduleTest
                  TIMECARD_ID={rowData.TIMECARD_ID}
                  disabled={disabled}
                  START_DATE={data?.START_DATE}
                  END_DATE={data?.END_DATE}
                  week={0}
                />
              ) : null}
              <Typography style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
                Second Week:
              </Typography>

              {show ? (
                <WorkScheduleTest
                  TIMECARD_ID={rowData.TIMECARD_ID}
                  disabled={disabled}
                  START_DATE={data?.START_DATE}
                  END_DATE={data?.END_DATE}
                  week={7}
                />
              ) : null}
            </JPGrid>
          </JPGrid>
        </JPModal>
      </>
    ),
    [show, data, optionsEmployee, expanded]
  );
  return (
    <>
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
          Timecard Update is Successful!
        </Alert>
      </Snackbar>
      {customersOptions}
      <Button
        color={rowData?.STATUS == 'O' || disabled ? 'info' : null}
        disabled={disabled ? false : rowData?.STATUS !== 'O'}
        onClick={() => setShow(true)}
        style={{
          padding: '8px 4px 6px 8px',
          borderRadius: '20px'
        }}
      >
        {disabled ? (
          <Search onClick={() => setShow(true)} />
        ) : (
          <Edit onClick={() => setShow(true)} />
        )}
      </Button>
    </>
  );
}
