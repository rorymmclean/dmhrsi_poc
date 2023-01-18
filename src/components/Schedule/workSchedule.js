import React from 'react';
import JPGrid from 'components/jp-grid/jp-grid';
import { TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getTaskSearchThunk } from './api/workSchedule-thunk-api';
import { ThunkDispatch } from 'thunk-dispatch';
export default function WorkSchedule() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const Type = ['Regular', 'Irregular'];
    const Task = ['ECBX-01D1', 'FABC-999F']
    const [data, setData] = React.useState({});
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [TaskOnevalue, setTaskOneValue] = React.useState('');

    const [TaskThreevalue, setTaskThreeValue] = React.useState('');
    const [TaskFourvalue, setTaskFourValue] = React.useState('');



    const [TypeOnevalue, setTypeOneValue] = React.useState('');
    const [TypeTowvalue, setTypeTowValue] = React.useState('');
    const [TypeThreevalue, setTypeThreeValue] = React.useState('');
    const [TypeFourvalue, setTypeFourValue] = React.useState('');

    const [optionsTask, setOptionsTask] = React.useState([]);
    const [valueTask, setValueTask] = React.useState(null);

    const [InputValueTask, setInputValueTask] = React.useState('');












    React.useEffect(() => {

        ThunkDispatch(getTaskSearchThunk())
            .then(result => {
                if (result?.data?.body) {
                    setOptionsTask(JSON.parse(result.data.body));
                } else {
                    setOptionsTask([]);

                }
            })
            .catch(error => console.error('getTaskSearchThunk', error))
            .finally(() => { });
    }, [inputValue]);










    return (



        <JPGrid container direction="row" alignContent={'center'} alignItems={'center'} justify={'center'}

        >
            <JPGrid item xs={12} sm={2}>

                <Typography style={{ textAlign: 'center' }}>Task</Typography>
            </JPGrid>


            <JPGrid item xs={12} sm={2}>

                <Typography style={{ textAlign: 'center' }}>Type</Typography>

            </JPGrid>


            {days.map((day) => (
                <JPGrid item xs={12} sm={1} key={day} marginLeft={'6.2px'}     >
                    <Typography style={{ textAlign: 'center' }}>{day}</Typography>
                </JPGrid>
            ))}



            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'} >

                <Autocomplete
                    id="Task"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Task}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={TaskOnevalue}
                    noOptionsText="No Task"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTaskOneValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task" fullWidth variant="outlined" required />

                    )}


                />
            </JPGrid>


            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'}>

                <Autocomplete
                    id="Type"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Type}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={TypeOnevalue}
                    noOptionsText="No Type"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTypeOneValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Type" fullWidth variant="outlined" required />
                    )}
                />

            </JPGrid>

            {days.map((day) => (
                <JPGrid item xs={12} sm={1} key={day} marginLeft={'6.2px'} marginBottom={'6.2px'}  >
                    <TextField

                        variant="outlined"
                        style={{ fontSize: "25px" }}
                        fullWidth
                        id={day}




                        onChange={(e) => setData({ ...data, [day]: e.target.value })}
                    />
                </JPGrid>

            ))}
            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'} >
                <Autocomplete
                    id="Task"
                    getOptionLabel={(option) => option

                    }
                    filterOptions={(x) => x}
                    options={optionsTask}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueTask}
                    noOptionsText="No Task"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTaskOneValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task" fullWidth variant="outlined" required />

                    )}
                />



            </JPGrid>




            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'}>
                <Autocomplete
                    id="Type"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Type}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={TypeTowvalue}
                    noOptionsText="No Type"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTypeTowValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Type" fullWidth variant="outlined" required />
                    )}
                />

            </JPGrid>

            {days.map((day) => (
                <JPGrid item xs={12} sm={1} key={day} marginLeft={'6.2px'} marginBottom={'6.2px'}>
                    <TextField
                        variant="outlined"
                        style={{ fontSize: "25px" }}
                        fullWidth
                        id={day}


                        name={day}

                        onChange={(e) => setData({ ...data, [day]: e.target.value })}
                    />
                </JPGrid>



            ))}












            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'} >
                <Autocomplete
                    id="Task"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Task}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={TaskThreevalue}
                    noOptionsText="No Task"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTaskThreeValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task" fullWidth variant="outlined" required />

                    )}


                />




            </JPGrid>

            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'}>
                <Autocomplete
                    id="Type"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Type}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={TypeThreevalue}
                    noOptionsText="No Type"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTypeThreeValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Type" fullWidth variant="outlined" required />
                    )}
                />

            </JPGrid>
            {days.map((day) => (
                <JPGrid item xs={12} sm={1} key={day} marginLeft={'6.2px'}>
                    <TextField
                        variant="outlined"
                        style={{ fontSize: "25px " }}
                        fullWidth
                        id={day}


                        name={day}

                        onChange={(e) => setData({ ...data, [day]: e.target.value })}
                    />
                </JPGrid>
            ))}

            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'} >
                <Autocomplete
                    id="Task"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Task}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={TaskFourvalue}
                    noOptionsText="No Task"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTaskFourValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task" fullWidth variant="outlined" required />

                    )}


                />




            </JPGrid>


            <JPGrid item xs={12} sm={2} marginRight={'6.2px'} marginBottom={'6.2px'}>
                <Autocomplete
                    id="Type"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Type}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={TypeFourvalue}
                    noOptionsText="No Type"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setTypeFourValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Type" fullWidth variant="outlined" required />
                    )}
                />

            </JPGrid>
            {days.map((day) => (
                <JPGrid item xs={12} sm={1} key={day} marginLeft={'6.2px'}>
                    <TextField
                        variant="outlined"
                        style={{ fontSize: "25px" }}
                        fullWidth
                        id={day}


                        name={day}

                        onChange={(e) => setData({ ...data, [day]: e.target.value })}
                    />


                </JPGrid>

            ))}





        </JPGrid>













    )
}

