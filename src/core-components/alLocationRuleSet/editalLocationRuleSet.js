import React, { useEffect } from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import { useLocation } from 'react-router-dom';
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
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from 'moment';
import {  editAlLocationRuleSetThunk, getAlLocationRuleSetDetailsThunk } from './api/AlLocationRuleSet-thunk-api';
import Edit from "@material-ui/icons/Edit";
import WorkScheduleTest from 'core-components/timeEntry/workScheduleTest';
import { Search } from '@material-ui/icons';
import { Alert, Snackbar } from '@mui/material';
import AlLocationRuleSetWorkSchedule from './alLocationRuleSetWorkSchedule';

export default function EditAlLocationRuleSet(props) {
    const { onSave,rowData,disabled } = props;
    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({});
    const [valueEmployee, setValueEmployee] = React.useState(null);
    const [inputValueEmployee, setInputValueEmployee] = React.useState('');
    const [optionsEmployee, setOptionsEmployee] = React.useState([]);
    const STATUS_NAME = { 'Open': 'O','Approved':"A" ,'Close':'C'}
    const STATUS_ID = {  'O':'Open',"A":'Approved' ,'C':'Close'}
  const [open, setOpen] = React.useState(false);

    
    useEffect( () =>
    {
      if(show)
    ThunkDispatch(getAlLocationRuleSetDetailsThunk({id:rowData.RULE_ID}))
      .then(result => {
          if ( result?.data?.body )
          {              
         setData({ ...JSON.parse(result.data.body)[0] })
      
      }
      })
      .catch(error => console.error('getAlLocationRuleSetDetailsThunk', error))
      .finally(() => { });
  }, [ rowData.RULE_ID,show ] );
    
    const searchEmployees = ( value ) =>
    {
        if(value?.length)
        ThunkDispatch(getPersonListThunk({ search_string: value }))
            .then(result => {
                if (result?.data?.body) {
                    setOptionsEmployee(JSON.parse(result.data.body));
                } else {
                    setOptionsEmployee([]);

                }
            })
            .catch(error => console.error('getPersonListThunk', error))
            .finally(() => { });
    };
    React.useEffect(() => {
        let active = true;
        if (inputValueEmployee === '') {
            setOptionsEmployee([]);
            return undefined;
        }
        searchEmployees(inputValueEmployee)


        return () => {
            active = false;
        };
    }, [inputValueEmployee]);



    const customersOptions = useMemo(
        () => (
            <>
                <JPModal
                    defaultTitle="Al-Location Rule Set"
                    title={`Al-Location Rule Set`}
                    onClose={_ => {
                        setShow(false)
                        setData({})
                    }}
                    closeButton={true}
                    fullWidth
                    maxWidth="lg"
                    open={show}
                    dialogActions={disabled?[]:[{
                        name: 'Save', onClick: _ => {

                            const userObject = {
                                RULE_ID:rowData.RULE_ID,
                                START_DATE: data?.START_DATE,
                                END_DATE: data?.END_DATE,
                                STATUS: data?.STATUS,
                                PERSON_ID: valueEmployee?.PERSON_ID||data.PERSON_ID,
                                

                            };
                            ThunkDispatch(editAlLocationRuleSetThunk({ ...userObject }))
                                .then(result => {
onSave({ ...rowData,...userObject})

setOpen(true)
                                    setShow(false)
                                    setData({})
                                


                                })
                                .catch(error => console.error('editAlLocationRuleSetThunk', error))
                                .finally(() => { });

                        },
                        isLoading: false,
                        disabled: !data?.START_DATE?.length || !data?.END_DATE?.length|| !(valueEmployee?.PERSON_ID?.length||data.PERSON_ID)|| !data?.STATUS?.length,
                        color:  !data?.START_DATE?.length || !data?.END_DATE?.length|| !(valueEmployee?.PERSON_ID?.length||data.PERSON_ID)|| !data?.STATUS?.length ? null : 'info'
                    }]}

                >
                    <JPGrid minHeight={200} >
                        <JPGrid container direction="row" alignItems="center" spacing={1} padding={8} >
                            <JPGrid item xs={12} sm={12}>
                                <TextField
                    variant="outlined"
                    required
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="Name"
                    label="Name"
                    name="Name"
                    autoComplete="Name"
                    value={data?.NAME}
                    onChange={(e) => setData({ ...data, NAME: e.target.value })}
                  />
                            </JPGrid>
                            <JPGrid item xs={ 12 } sm={ 6 }>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    format="yyy/MM/dd"
                                        value={ data?.START_DATE }
                                        disabled={disabled}
                    onChange={(e) => setData({ ...data, START_DATE:moment(e).format('YYYY/MM/DD') })}

                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
            
                                
                            </JPGrid>
                            <JPGrid item xs={ 12 } sm={ 6 }>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="End Date"
                                        format="yyy/MM/dd"
                                        disabled={disabled}
                    value={data?.END_DATE}
                    onChange={(e) => setData({ ...data, END_DATE: moment(e).format('YYYY/MM/DD')})}

                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
            
                                
                            </JPGrid>
                            { show ? <AlLocationRuleSetWorkSchedule RULE_ID={ rowData.RULE_ID } PERSON_ID={rowData.PERSON_ID} disabled={ disabled } START_DATE={ data?.START_DATE } /> : null }

                            
                        </JPGrid>
                    </JPGrid>
                </JPModal>

            </>
        ),
        [show, data, optionsEmployee]
    );
    return (
        <>
            <Snackbar
                anchorOrigin={ { vertical: "top", horizontal: "right" } }
 open={open} autoHideDuration={1000} onClose={(event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }}>
        <Alert onClose={(event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }} severity="success" variant="filled" sx={{ width: '100%' }}>
          rule Update is Successful!
        </Alert>
      </Snackbar>
            {customersOptions}
            <Button color={'info'} onClick={() => setShow(true)} style={{
          padding: "8px 4px 6px 8px",
          borderRadius: "20px"
        }}>
                { disabled ?<Search onClick={ () => setShow( true ) } />: <Edit onClick={ () => setShow( true ) } /> }
        </Button>
        </>
    );
}
