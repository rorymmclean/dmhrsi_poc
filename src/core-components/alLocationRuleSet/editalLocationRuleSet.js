import React, { useEffect } from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import {
  allocengineThunk,
  editAlLocationRuleSetThunk,
  getRuleDetailsThunk
} from './api/AlLocationRuleSet-thunk-api';
import Edit from '@material-ui/icons/Edit';
import { Search } from '@material-ui/icons';
import { Alert, Snackbar } from '@mui/material';
import AlLocationRuleSetWorkSchedule from './alLocationRuleSetWorkSchedule';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function EditAlLocationRuleSet(props) {
  const { onSave, rowData, disabled } = props;
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({});
  const [valueEmployee, setValueEmployee] = React.useState(null);
  const [inputValueEmployee, setInputValueEmployee] = React.useState('');
  const [optionsEmployee, setOptionsEmployee] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openTT, setOpenTT] = React.useState(false);
  const [expanded, setExpanded] = React.useState('panel1');

  useEffect(() => {
    if (show)
      ThunkDispatch(getRuleDetailsThunk({ id: rowData.RULE_SET_ID }))
        .then(result => {
          if (result?.data?.body) {
            setData({ ...JSON.parse(result.data.body)[0] });
          }
        })
        .catch(error => console.error('getRuleDetailsThunk', error))
        .finally(() => {});
  }, [rowData.RULE_SET_ID, show]);

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
          defaultTitle="Allocation Rule Set"
          title={`Allocation Rule Set`}
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
                        RULE_SET_ID: rowData.RULE_SET_ID,
                        START_DATE: data?.START_DATE,
                        END_DATE: data?.END_DATE,
                        NAME: data?.NAME,
                        PERSON_ID: valueEmployee?.PERSON_ID || data.PERSON_ID
                      };
                      ThunkDispatch(editAlLocationRuleSetThunk({ ...userObject }))
                        .then(result => {
                          onSave({ ...rowData, ...userObject });

                          setOpen(true);
                          setShow(false);
                          setData({});
                        })
                        .catch(error => console.error('editAlLocationRuleSetThunk', error))
                        .finally(() => {});
                    },
                    isLoading: false,
                    disabled:
                      !data?.START_DATE?.length ||
                      !data?.END_DATE?.length ||
                      !(valueEmployee?.PERSON_ID?.length || data.PERSON_ID) ||
                      !data?.NAME?.length,
                    color:
                      !data?.START_DATE?.length ||
                      !data?.END_DATE?.length ||
                      !(valueEmployee?.PERSON_ID?.length || data.PERSON_ID) ||
                      !data?.NAME?.length
                        ? null
                        : 'info'
                  }
                ]
          }
        >
          <JPGrid minHeight={200}>
            <JPGrid container direction="row" alignItems="center" spacing={1} padding={8}>
              <JPGrid item xs={12} sm={3} marginTop="0.8vh">
                <TextField
                  InputLabelProps={{
                    style: {
                      fontFamily: 'Trattatello'
                    }
                  }}
                  InputProps={{
                    style: {
                      fontFamily: 'Trattatello'
                    }
                  }}
                  style={{ fontSize: '25px', fontFamily: 'Trattatello' }}
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="Name"
                  autoComplete="Name"
                  disabled={disabled}
                  value={data?.NAME}
                  onChange={e => setData({ ...data, NAME: e.target.value })}
                />
              </JPGrid>
              <JPGrid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ fontFamily: 'Trattatello' }}
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    InputLabelProps={{
                      style: {
                        fontFamily: 'Trattatello'
                      }
                    }}
                    format="yyy/MM/dd"
                    shouldDisableDate={date => {
                      const day = moment(date).day();
                      return day !== 1;
                    }}
                    value={data?.START_DATE}
                    disabled={disabled}
                    onChange={e => setData({ ...data, START_DATE: moment(e).format('YYYY/MM/DD') })}
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </JPGrid>
              <JPGrid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ fontFamily: 'Trattatello' }}
                    margin="normal"
                    id="date-picker-dialog"
                    label="End Date"
                    format="yyy/MM/dd"
                    InputLabelProps={{
                      style: {
                        fontFamily: 'Trattatello'
                      }
                    }}
                    disabled={disabled}
                    value={data?.END_DATE}
                    onChange={e => setData({ ...data, END_DATE: moment(e).format('YYYY/MM/DD') })}
                    shouldDisableDate={date => {
                      const day = moment(date).day();
                      return day !== 5;
                    }}
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </JPGrid>
              <JPGrid item xs={12} sm={3}>
                <Button
                  style={{
                    fontFamily: 'Trattatello',
                    fontWeight: 'bold'
                  }}
                  color={!disabled ? 'info' : null}
                  disabled={disabled}
                  onClick={() => {
                    ThunkDispatch(
                      allocengineThunk({
                        id: data.PERSON_ID
                      })
                    )
                      .then(result => {
                        setOpenTT(true);
                      })
                      .catch(error => console.error('allocengineThunk', error))
                      .finally(() => {});
                  }}
                >
                  Run Engine
                </Button>
              </JPGrid>

              <Typography
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  fontFamily: 'Trattatello'
                }}
              >
                Hours:
              </Typography>

              {show ? (
                <AlLocationRuleSetWorkSchedule
                  types={'HOURS'}
                  RULE_SET_ID={rowData.RULE_SET_ID}
                  PERSON_ID={rowData.PERSON_ID}
                  disabled={disabled}
                  START_DATE={data?.START_DATE}
                />
              ) : null}

              <Typography
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  fontFamily: 'Trattatello'
                }}
              >
                Allocations:
              </Typography>

              {show ? (
                <AlLocationRuleSetWorkSchedule
                  types={'PERCENT'}
                  RULE_SET_ID={rowData.RULE_SET_ID}
                  PERSON_ID={rowData.PERSON_ID}
                  disabled={disabled}
                  START_DATE={data?.START_DATE}
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
        open={openTT}
        autoHideDuration={1000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setOpenTT(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === 'clickaway') {
              return;
            }

            setOpenTT(false);
          }}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Successful!
        </Alert>
      </Snackbar>

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
          rule Update is Successful!
        </Alert>
      </Snackbar>
      {customersOptions}
      <Button
        color={'info'}
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
