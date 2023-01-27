import React, { useState } from 'react';
import Button from 'components/CustomButtons/Button.jsx';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import {  Grid,  Typography } from '@material-ui/core';
import Select from '@mui/material/Select';
import TextField from "@material-ui/core/TextField";
import _ from 'lodash';
import TaskIcon from '@material-ui/icons/AssignmentLate';;
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import "date-fns";
import moment from 'moment';

export default function Allocations() {
  const [data, setData] = useState({});

  const handleSave = () => {
    const userObject =     {
      START_DATE:moment(data?.START_DATE).format('MM/DD/YYYY'),
      END_DATE: moment(data?.END_DATE).format('MM/DD/YYYY') ,
      NAME: data?.NAME,
      BASIS:data?.BASIS
    };

  };
  return (
    <div className="m-sm-30">
      <JPGrid container direction={'row'} justify={'flex-end'} >
        <JPGrid item marginRight={3} marginLeft={3}>
          <Button
            variant={'outlined'}
            color={'info'} 
            onClick={handleSave}
          >
            Save
          </Button>
        </JPGrid>
      </JPGrid>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <TaskIcon />
              </CardIcon>
              <h4 style={{ color: "#000" }}>Allocations</h4>
            </CardHeader>
            <CardBody>
              <Grid container>
                <JPGrid xs={12} sm={12} >
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
                <JPGrid xs={12} sm={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="start-date-picker"
                      label="Start Date"
                      format="MM/dd/yyyy"
                       shouldDisableDate={date => {
        const day = moment(date).day();
        return day !== 1;
    }}
                      value={data?.START_DATE}
                      onChange={(date) => setData({ ...data, START_DATE: date })}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </JPGrid>
                <JPGrid xs={12} sm={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="end-date-picker"
                      label="End Date"
                          shouldDisableDate={date => {
        const day = moment(date).day();
        return day !== 5;
    }}
                      format="MM/dd/yyyy"
                      value={data?.END_DATE}
                      onChange={(date) => setData({ ...data, END_DATE: date })}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  </JPGrid>
                <JPGrid xs={12} sm={4} marginTop={16}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="basis-select-label">Basis</InputLabel>
                    <Select
                      labelId="basis-select-label"
                      id="basis-select"
                      value={data?.BASIS}
                      onChange={(e) => setData({ ...data, BASIS: e.target.value })}
                      label="Basis"
                    >
                      <MenuItem value={'daily'}>Daily</MenuItem>
                      <MenuItem value={'weekly'}>Weekly</MenuItem>
                      <MenuItem value={'monthly'}>Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </JPGrid>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
