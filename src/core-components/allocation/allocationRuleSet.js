import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { Grid, TextField, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import Button from 'components/CustomButtons/Button';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';;
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Alert, Autocomplete, Snackbar } from '@mui/material';
import WorkSchedule from 'core-components/timeEntry/workSchedule';
import { Padding } from '@mui/icons-material';




export default function allocationRuleSet() {
  const history = useHistory();
  const location = useLocation();
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S' , 'Total'];
  const [expanded, setExpanded] = React.useState('panel1');
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);


  const Basis = ['Weekly', 'By-Weekly']
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [BasisiValue, setBasisValue] = React.useState('');
 


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  

  return (
    <>
   
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  style={{ fontSize: "25px" }}
                  fullWidth
                  id="Name"
                  label="Name"
                  name="Name"
                  autoComplete="Name"
                  //value={data?.ORGANIZATION_NAME}
                 // onChange={(e) => setData({ ...data, ORGANIZATION_NAME: e.target.value })}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>

                <JPGrid container direction={'row'} justify={'flex-end'}>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                      onClick={() => {
                        history.push({
                          pathname: `/admin/allocation`
                   
                        })
                      }}
                      variant={'outlined'}
                    >
                      Cancel
                    </Button>
                  </JPGrid>
                  <JPGrid item marginRight={3} marginLeft={3}>
                    <Button
                   


                      variant={'outlined'}
                      color={'info'}
                    >
                      Save
                    </Button>


                  </JPGrid>

                </JPGrid>

              </GridItem>
              
              <GridItem xs={12} sm={6} container direction={'row'} justify={'flex-start'}
              style={{flexBasis:'25%'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start"
                    format="MM/dd/yyyy"
                    value={data?.START_DATE}
                    onChange={(e) => setData({ ...data, START_DATE: e })}

                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
            
              </GridItem>





             
              <GridItem xs={12} sm={3}  style={{marginTop:'17px'}}>
                

              <Autocomplete
                    id="Basis"
                    getOptionLabel={(option) => option
                    }
                    filterOptions={(x) => x}
                    options={Basis}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={BasisiValue}
                    noOptionsText="No Basis"

                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setBasisValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Basis" fullWidth variant="outlined" required 
                    
                        />

                    )}


                />

              </GridItem>
              
              
              <GridItem xs={12} sm={8}>


            
          
<GridItem container={false}  style={ {display: 'flex' , flexDirection:'row' ,alignItems:'baseline',

 margin:'50px 0'
}}  >

<Typography style={{ textAlign: 'start', whiteSpace:'nowrap' ,alignSelf:'center' }}>WorkSchedule :</Typography>
    {days.map((day) => (
                           

        <GridItem item xs={12} sm={2}   >
             <Typography style={{ textAlign: 'center' }}>{day}</Typography>
            <TextField 
                variant="outlined"
                style={{ fontSize: "25px" , display:'flex'}}
                fullWidth
                id={day}
                name={day}
                onChange={(e) => setData({ ...data, [day]: e.target.value })}
            />
        </GridItem>
    ))}
</GridItem>







              



             
              </GridItem>

        <WorkSchedule />



              






         












              
              
                
                
              
              



               
            </GridContainer>

          </>
 
  );
}
