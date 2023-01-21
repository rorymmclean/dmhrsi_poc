import React from 'react';
import JPGrid from 'components/jp-grid/jp-grid';
import { TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ThunkDispatch } from 'thunk-dispatch';
import { getTaskListThunk } from './api/workSchedule-thunk-api'

export default function WorkSchedule() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const Type = ['Regular', 'Irregular'];
    const Task = ['ECBX-01D1', 'FABC-999F']
    const [data, setData] = React.useState({});
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [TypeOnevalue, setTypeOneValue] = React.useState('');
    const [TypeTowvalue, setTypeTowValue] = React.useState('');
    const [TypeThreevalue, setTypeThreeValue] = React.useState('');
    const [TypeFourvalue, setTypeFourValue] = React.useState('');
    const [valueTaskOne, setValueTaskOne] = React.useState(null);
    const [inputValueTaskOne, setInputValueTaskOne] = React.useState('');
    const [optionsTaskOne, setOptionsTaskOne] = React.useState([]);
    const [valueTaskTow, setValueTaskTow] = React.useState(null);
    const [inputValueTaskTow, setInputValueTaskTow] = React.useState('');
    const [optionsTaskTow, setOptionsTaskTow] = React.useState([]);
    const [valueTaskFour, setValueTaskFour] = React.useState(null);
    const [inputValueTaskFour, setInputValueTaskFour] = React.useState('');
    const [optionsTaskFour, setOptionsTaskFour] = React.useState([]);
    const [valueTaskThree, setValueTaskThree] = React.useState(null);
    const [inputValueTaskThree, setInputValueTaskThree] = React.useState('');
    const [optionsTaskThree, setOptionsTaskThree] = React.useState([]);

    const searchTaskOne = (value) => {
        ThunkDispatch(getTaskListThunk({ search_string: value }))
            .then(result => {
                if (result?.data?.body) {
                    setOptionsTaskOne(JSON.parse(result.data.body));
                } else {
                    setOptionsTaskOne([]);

                }
            })
            .catch(error => console.error('getTaskListThunkOne', error))
            .finally(() => { });
    };
    React.useEffect(() => {
        let active = true;
        if (inputValueTaskOne === '') {
            setOptionsTaskOne([]);
            return undefined;
        }
        searchTaskOne(inputValueTaskOne)


        return () => {
            active = false;
        };
    }, [inputValueTaskOne]);

    const searchTaskTow = (value) => {
        ThunkDispatch(getTaskListThunk({ search_string: value }))
            .then(result => {
                if (result?.data?.body) {
                    setOptionsTaskTow(JSON.parse(result.data.body));
                } else {
                    setOptionsTaskTow([]);

                }
            })
            .catch(error => console.error('getTaskListThunkTow', error))
            .finally(() => { });
    };
    React.useEffect(() => {
        let active = true;
        if (inputValueTaskTow === '') {
            setOptionsTaskTow([]);
            return undefined;
        }
        searchTaskTow(inputValueTaskTow)


        return () => {
            active = false;
        };
    }, [inputValueTaskTow]);

    const searchTaskThree = (value) => {
        ThunkDispatch(getTaskListThunk({ search_string: value }))
            .then(result => {
                if (result?.data?.body) {
                    setOptionsTaskThree(JSON.parse(result.data.body));
                    console.log()
                } else {
                    setOptionsTaskThree([]);

                }
            })
            .catch(error => console.error('getTaskListThunkThree', error))
            .finally(() => { });
    };
    React.useEffect(() => {
        let active = true;
        if (inputValueTaskThree === '') {
            setOptionsTaskThree([]);
            return undefined;
        }
        searchTaskThree(inputValueTaskThree)


        return () => {
            active = false;
        };
    }, [inputValueTaskThree]);

    const searchTaskFour = (value) => {
        ThunkDispatch(getTaskListThunk({ search_string: value }))
            .then(result => {
                if (result?.data?.body) {
                    setOptionsTaskFour(JSON.parse(result.data.body));
                } else {
                    setOptionsTaskFour([]);
                }
            })
            .catch(error => console.error('getTaskListThunkFour', error))
            .finally(() => { });
    };
    React.useEffect(() => {
        let active = true;
        if (inputValueTaskFour === '') {
            setOptionsTaskFour([]);
            return undefined;
        }
        searchTaskFour(inputValueTaskFour)


        return () => {
            active = false;
        };
    }, [inputValueTaskFour]);

    return (

        <JPGrid container direction="row" alignContent={'center'} alignItems={'center'} justify={'center'}  >
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
                    id="Tasks"
                    getOptionLabel={(option) => `${option.TASK_NAME}  `
                    }
                    filterOptions={(x) => x}
                    options={optionsTaskOne}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueTaskOne}
                    noOptionsText="No Tasks"
                    onChange={(event, newValue) => {
                        setOptionsTaskOne(newValue ? [newValue, ...optionsTaskOne] : optionsTaskOne);
                        setValueTaskOne(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValueTaskOne(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task " fullWidth variant="outlined" required />
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
                    id="Tasks"
                    getOptionLabel={(option) => `${option.TASK_NAME}  `
                    }
                    filterOptions={(x) => x}
                    options={optionsTaskTow}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueTaskTow}
                    noOptionsText="No Tasks"
                    onChange={(event, newValue) => {
                        setOptionsTaskTow(newValue ? [newValue, ...optionsTaskTow] : optionsTaskTow);
                        setValueTaskTow(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValueTaskTow(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task " fullWidth variant="outlined" required />
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
                    id="Tasks"
                    getOptionLabel={(option) => `${option.TASK_NAME} `
                    }
                    filterOptions={(x) => x}
                    options={optionsTaskThree}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueTaskThree}
                    noOptionsText="No Tasks"
                    onChange={(event, newValue) => {
                        setOptionsTaskThree(newValue ? [newValue, ...optionsTaskThree] : optionsTaskThree);
                        setValueTaskThree(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValueTaskThree(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task " fullWidth variant="outlined" required />
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
                    id="Tasks"
                    getOptionLabel={(option) => `${option.TIMECARD_ID} ${option.START_DATE} ${option.END_DATE}
                    ${option.PERSON_ID}  ${option.STATUS}  ${option.PERSON_ID} `
                    }
                    filterOptions={(x) => x}
                    options={optionsTaskFour}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={valueTaskFour}
                    noOptionsText="No Tasks"
                    onChange={(event, newValue) => {
                        setOptionsTaskFour(newValue ? [newValue, ...optionsTaskFour] : optionsTaskFour);
                        setValueTaskFour(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValueTaskFour(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Task " fullWidth variant="outlined" required />
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
