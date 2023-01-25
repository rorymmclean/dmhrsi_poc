import React from 'react';
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
import { addTimeCardThunk } from './api/timeCard-thunk-api';

export default function AddTimeCard(props) {
    const { onSave } = props;
    
    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({STATUS:'O',START_DATE:moment(new Date()).format('YYYY/MM/DD') });
    const [valueEmployee, setValueEmployee] = React.useState(null);
    const [inputValueEmployee, setInputValueEmployee] = React.useState('');
    const [optionsEmployee, setOptionsEmployee] = React.useState([]);
    const STATUS_NAME = { 'Open': 'O','Approved':"A" ,'Close':'C'}
    const STATUS_ID = {  'O':'Open',"A":'Approved' ,'C':'Close'}
    
    const searchEmployees = (value) => {
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
                    defaultTitle="Time Card"
                    title={`Add Time Card`}
                    onClose={_ => {
                        setShow(false)
                        setData({})
                    }}
                    closeButton={true}
                    fullWidth
                    maxWidth="sm"
                    open={show}
                    dialogActions={[{
                        name: 'Save', onClick: _ => {

                            const userObject = {
                                START_DATE: data?.START_DATE,
                                END_DATE: data?.END_DATE,
                                STATUS: data?.STATUS,
                                PERSON_ID: valueEmployee?.PERSON_ID,
                                

                            };
                            ThunkDispatch(addTimeCardThunk({ ...userObject }))
                                .then(result => {

                                    onSave({ ...userObject, FIRST_NAME: valueEmployee.FIRST_NAME,
                                MIDDLE_NAME: valueEmployee.MIDDLE_NAME,
                                LAST_NAME: valueEmployee.LAST_NAME, TIMECARD_ID: result.data.ID })


                                    setShow(false)
                                    setData({})

                                })
                                .catch(error => console.error('ddTimeCardThunk', error))
                                .finally(() => { });

                        },
                        isLoading: false,
                        disabled: !data?.START_DATE?.length || !data?.END_DATE?.length|| !valueEmployee?.PERSON_ID?.length|| !data?.STATUS?.length,
                        color:  !data?.START_DATE?.length || !data?.END_DATE?.length|| !valueEmployee?.PERSON_ID?.length|| !data?.STATUS?.length ? null : 'info'
                    }]}

                >
                    <JPGrid minHeight={200} >
                        <JPGrid container direction="row" alignItems="center" spacing={1} padding={8} >
                            <JPGrid item xs={12} sm={12}>
                                <Autocomplete
                                    id="Employees"
                                    getOptionLabel={(option) => `${option.FIRST_NAME} ${option.MIDDLE_NAME} ${option.LAST_NAME}`
                                    }
                                    filterOptions={(x) => x}
                                    options={optionsEmployee}
                                    autoComplete
                                    includeInputInList
                                    filterSelectedOptions
                                    value={valueEmployee}
                                    noOptionsText="No Employees"
                                    onChange={(event, newValue) => {
                                        setOptionsEmployee(newValue ? [newValue, ...optionsEmployee] : optionsEmployee);
                                        setValueEmployee(newValue);
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueEmployee(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Employee Name" fullWidth variant="outlined" required />
                                    )}

                                />
                            </JPGrid>

                            <JPGrid item xs={ 12 } sm={ 12 }>
                                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
      id="demo-simple-select"
                                        value={ STATUS_ID[ data.STATUS ] }
                                        defaultValue={STATUS_ID['O']}
    label="Status"
      onChange={(e) => setData({ ...data, STATUS: STATUS_NAME[e.target.value] })}

  >
    <MenuItem value={"Open"}>Open</MenuItem>
    <MenuItem value={ "Approved" }>Approved</MenuItem>
    <MenuItem value={"Close"}>Close</MenuItem>

  </Select>
</FormControl>
                                
                            </JPGrid>
                            <JPGrid item xs={ 12 } sm={ 12 }>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    format="yyy/MM/dd"
                    value={ data?.START_DATE }
                    style={{width:'100% !important'}}
                    onChange={(e) => setData({ ...data, START_DATE:moment(e).format('YYYY/MM/DD') })}

                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
            
                                
                            </JPGrid>
                            <JPGrid item xs={ 12 } sm={ 12 }>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="End Date"
                    format="yyy/MM/dd"
                    style={{width:'100% !important'}}
                    value={data?.END_DATE}
                    onChange={(e) => setData({ ...data, END_DATE: moment(e).format('YYYY/MM/DD')})}

                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
            
                                
                            </JPGrid>
                        </JPGrid>
                    </JPGrid>
                </JPModal>

            </>
        ),
        [show, data, optionsEmployee]
    );
    return (
        <>
            {customersOptions}
            <JPGrid container direction="row" alignItems="center" justify="flex-end"  >
                <JPGrid>
                    <Button color={'info'} onClick={() => setShow(true)} >
                        Add Time Card
                    </Button>
                </JPGrid>
            </JPGrid>
        </>
    );
}
