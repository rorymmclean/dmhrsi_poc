import React from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import { useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField, Typography } from '@material-ui/core';
import { addTimeCardThunk } from './api/timeCard-thunk-api';
import WorkSchedule from 'components/Schedule/workSchedule';
import Autocomplete from '@mui/material/Autocomplete';




export default function AddTimeCard(props) {
    const { onSave } = props;
    const location = useLocation();
    const [value, setValue] = React.useState('Open');
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const status = ['Open', 'Close']

    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState({});

    const customersOptions = useMemo(
        () => (
            <>


                <JPModal

                    defaultTitle="TimeCard"
                    title={`Add TimeCard`}

                    onClose={_ => {
                        setShow(false)
                        setData({})

                    }}
                    closeButton={true}
                    fullWidth
                    maxWidth="md"
                    open={show}
                    dialogActions={[{
                        name: 'Save', onClick: _ => {

                            const userObject = {
                                EMPLOYEE: data?.EMPLOYEE,
                                START_DATE: data?.START_DATE,
                                STATUS: data?.STATUS,
                                HOURS: data?.HOURS,
                                END_DATE: data?.END_DATE,

                            };



                            ThunkDispatch(addTimeCardThunk({ ...userObject }))
                                .then(result => {

                                    onSave({ ...userObject, TIMECARD_ID: result.data.ID })


                                    setShow(false)
                                    setData({})

                                })
                                .catch(error => console.error('ddTimeCardThunk', error))
                                .finally(() => { });

                        },
                        isLoading: false,
                        disabled: !data?.SERVICE?.length || !data?.EMPLOYEE?.length,
                        color: !data?.SERVICE?.length || !data?.EMPLOYEE?.length ? null : 'info'
                    }]}


                >
                    <JPGrid minHeight={200} >
                        <JPGrid container direction="row" alignItems="center" spacing={1} padding={8} >
                            <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="Employee"
                                    label="Employee"
                                    name="Employee"
                                    autoComplete="Employee"
                                    value={data?.EMPLOYEE}
                                    onChange={(e) => setData({ ...data, Employee: e.target.value })}
                                />
                            </JPGrid>

                            <JPGrid item xs={12} sm={6}>
                                <Autocomplete
                                    id="Statous"
                                    getOptionLabel={(option) => option
                                    }
                                    filterOptions={(x) => x}
                                    options={status}
                                    autoComplete
                                    includeInputInList
                                    filterSelectedOptions
                                    value={value}
                                    noOptionsText="No Status"

                                    onChange={(event, newValue) => {
                                        setOptions(newValue ? [newValue, ...options] : options);
                                        setValue(newValue);
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Status" fullWidth variant="outlined" required />
                                    )}

                                />
                            </JPGrid>
                            <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="Start Date"
                                    label="Start Date"
                                    name="Start Date"
                                    autoComplete="Start Date"
                                    value={data?.START_DATE}
                                    onChange={(e) => setData({ ...data, START_DATE: e.target.value })}
                                />
                            </JPGrid>
                            <JPGrid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ fontSize: "25px" }}
                                    fullWidth
                                    id="End Date"
                                    label="End Date"
                                    name="End Date"
                                    autoComplete="End Date"
                                    value={data?.END_DATE}
                                    onChange={(e) => setData({ ...data, END_DATE: e.target.value })}
                                />
                            </JPGrid>

                            <WorkSchedule />

                        </JPGrid>
                    </JPGrid>
                </JPModal>

            </>
        ),
        [show, data]
    );
    return (
        <>
            {customersOptions}
            <JPGrid container direction="row" alignItems="center" justify="flex-end"  >
                <JPGrid>
                    <Button color={'info'} onClick={() => setShow(true)} >
                        Add TimeCard
                    </Button>
                </JPGrid>
            </JPGrid>

        </>


    );
}
