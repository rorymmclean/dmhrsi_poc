import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { TextField } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import PersonIcon from '@mui/icons-material/Person';
import Card from 'components/Card/Card.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Button from 'components/CustomButtons/Button';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ThunkDispatch } from 'thunk-dispatch';
import { editContactThunk } from './api/organization-thunk-api';
import { getContactDetailsThunk } from 'core-components/contact/api/contact-thunk-api';
import { addContactThunk } from 'core-components/contact/api/contact-thunk-api';



export default function Contact() {
  const history = useHistory();
  const location = useLocation();

 const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  const [data, setData] = React.useState({
    "ENTITITY_ID": location.pathname.split('/')[3],
"ENTITITY_TYPE":"",
"CONTACT_TYPE":"organization",
"EMIAL_TYPE":"",
"EMIAL_ADDRESS":"",
"PHONE_TYPE":"",
"PHONE_NBR":"",
"ADDRESS_TYPE":"",
"ADDRESS_1":"",
"ADDRESS_2":"",
"ADDRESS_3":"",
"POSTAL_CODE":"",
"COUNTRY":"",
"STATE":"",
"CITY":""});
  const CONTACT_TYPE = { 1: "ADDRESS", 2: "EMAIL", 3: "PHONE" }
      const TYPE = { 1: "Work", 2: "Home"}

  console.log(data);
      useEffect(() => {
    ThunkDispatch(getContactDetailsThunk({id:location.pathname.split('/')[3]}))
      .then( result =>
      {
          console.log(result);

        if (result?.data?.body) {
          setData({ ...JSON.parse(result.data.body).reduce((a, b) => ({
           "ENTITITY_ID":  a.ENTITITY_ID + b.ENTITITY_ID ,
"ENTITITY_TYPE":a.ENTITITY_TYPE  + b.ENTITITY_TYPE ,
"CONTACT_TYPE":a.CONTACT_TYPE  + b.CONTACT_TYPE ,
"EMIAL_TYPE":a.EMIAL_TYPE?a.EMIAL_TYPE:undefined  + b.EMIAL_TYPE?b.EMIAL_TYPE:undefined,
"EMIAL_ADDRESS":a.EMIAL_ADDRESS?a.EMIAL_ADDRESS:undefined  + b.EMIAL_ADDRESS?b.EMIAL_ADDRESS:undefined ,
"PHONE_TYPE":a.PHONE_TYPE?a.PHONE_TYPE:undefined  + b.PHONE_TYPE?b.PHONE_TYPE:undefined ,
"PHONE_NBR":a.PHONE_NBR?a.PHONE_NBR:undefined  + b.PHONE_NBR?b.PHONE_NBR:undefined ,
"ADDRESS_TYPE":a.ADDRESS_TYPE?a.ADDRESS_TYPE:undefined  + b.ADDRESS_TYPE?b.ADDRESS_TYPE:undefined ,
"ADDRESS_1":a.ADDRESS_1?a.ADDRESS_1: undefined + b.ADDRESS_1?  b.ADDRESS_1:undefined,
"ADDRESS_2":a.ADDRESS_2?a.ADDRESS_2:undefined  + b.ADDRESS_2?b.ADDRESS_2:undefined ,
"ADDRESS_3":a.ADDRESS_3?a.ADDRESS_3:undefined  + b.ADDRESS_3?b.ADDRESS_3:undefined,
"POSTAL_CODE":a.POSTAL_CODE?a.POSTAL_CODE:undefined  + b.POSTAL_CODE?b.POSTAL_CODE:undefined,
"COUNTRY":a.COUNTRY?a.COUNTRY: undefined + b.COUNTRY?  b.COUNTRY:undefined,
"STATE":a.STATE?a.STATE: undefined + b.STATE?  b.STATE:undefined,
"CITY":a.CITY?a.CITY: undefined + b.CITY?  b.CITY:undefined,
          } ) )
            
          } )
      
      }
      })
      .catch(error => console.error('getContactDetailsThunk', error))
      .finally(() => { });
  }, []);

  return (
           <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <PersonIcon />
              </CardIcon>
              <h4 style={{color:"#000"}}>Contact</h4>
            </CardHeader>
            <CardBody>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Contact Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
                                      value={data.CONTACT_ID}
    label="Contact Type"
      onChange={(e) => setData({ ...data, CONTACT_TYPE: CONTACT_TYPE[e.target.value],  ENTITITY_ID: e.target.value?.toString()})}

  >
    <MenuItem value={1} >Mailing Address</MenuItem>
    <MenuItem value={2}>Email address</MenuItem>
    <MenuItem value={3}>Phone Number</MenuItem>
  </Select>
</FormControl>
                          </GridItem>
                            <GridItem xs={12} sm={12} md={6}>

                          <JPGrid container direction={'row'} justify={'flex-end'}>
              <JPGrid item marginRight={3} marginLeft={3}>
                <Button
                  onClick={()=>{history.push({
      pathname: `/admin/edit/${1}`,
                    state: {
                      id: 1
                    }
    });}}
                  variant={'outlined'}
                >
                  Cancel
                </Button>
                                  </JPGrid>
                                  <JPGrid item marginRight={3} marginLeft={3}>
                <Button
                      onClick={ () =>
                      {
                        if ( data?.CONTACT_ID )
                        {
                           ThunkDispatch( editContactThunk( data ) )
                                .then(result => {
                                  setOpen(true)
                                })
                                .catch(error => console.error('editContactThunk', error))
                            .finally( () => { } );
                          
                        } else
                        {
                           const userObject = {
                                 "ENTITITY_ID": location.pathname.split('/')[3],
"ENTITITY_TYPE":"ORG",
"CONTACT_TYPE":data?.CONTACT_TYPE?.toString()||"",
"EMIAL_TYPE":data?.EMIAL_TYPE?.toString()||"",
"EMIAL_ADDRESS":data?.EMIAL_ADDRESS?.toString()||"",
"PHONE_TYPE":data?.PHONE_TYPE?.toString()||"",
"PHONE_NBR":data?.PHONE_NBR?.toString()||"",
"ADDRESS_TYPE":data?.ADDRESS_TYPE?.toString()||"",
"ADDRESS_1":data?.ADDRESS_1?.toString()||"",
"ADDRESS_2":data?.ADDRESS_2?.toString()||"",
"ADDRESS_3":data?.ADDRESS_3?.toString()||"",
"POSTAL_CODE":data?.POSTAL_CODE?.toString()||"",
"COUNTRY":data?.COUNTRY?.toString()||"",
"STATE":data?.STATE?.toString()||"",
"CITY":data?.CITY?.toString()||""

                            };

  console.log(userObject);


                            ThunkDispatch(addContactThunk({ ...userObject }))
                                .then(result => {

                                    onSave({ ...userObject ,CONTACT_ID:result.data.ID})


                                    setShow(false)
                                    setData({})

                                })
                                .catch(error => console.error('addOrganizationThunk', error))
                                .finally(() => { });

                        }
                       
                      
                      } }
                  variant={'outlined'}
                  color={'info'}
                >
                  Save
                </Button>
                </JPGrid>
                </JPGrid>
                </GridItem>
<GridItem xs={12} sm={6} style={{ marginBottom: '20px' }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="From"
          format="MM/dd/yyyy"
          value={data?.SERVICE}
          onChange={(e) => setData({ ...data, ORGANIZATION_NAME: e })}

          inputVariant="outlined"
        />
                </MuiPickersUtilsProvider>
            
              </GridItem>
                  <GridItem xs={12} sm={6} >

                   <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="To"
          format="MM/dd/yyyy"
          value={data?.SERVICE}
          onChange={(e) => setData({ ...data, ORGANIZATION_NAME: e })}

          inputVariant="outlined"
        />
                </MuiPickersUtilsProvider>
              </GridItem>
 {data?.ENTITITY_ID=='1'?<> <GridItem xs={12} sm={12} md={6}>
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={data.ADDRESS_TYPE}
    label="Type"
      onChange={(e) => setData({ ...data, ADDRESS_TYPE:  TYPE[e.target.value] })}

  >
    <MenuItem value={1}>Work</MenuItem>
    <MenuItem value={2}>Home</MenuItem>
  </Select>
</FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                         <JPGrid container direction={'row'} justify={'flex-end'}>
                          <JPGrid item marginRight={3} marginLeft={3}>
                            <FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Primary" />
</FormGroup>
                          </JPGrid>
                                        </JPGrid>

                        
                      </GridItem>
                       <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="ADDRESS_1"
                    label="Address 1"
                    name="ADDRESS_1"
                    autoComplete="ADDRESS_1"
                    value={data?.ADDRESS_1}
                    onChange={(e) => setData({ ...data, ADDRESS_1: e.target.value })}
                                />
              </GridItem>
<GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="ADDRESS_2"
                    label="Address 2"
                    name="ADDRESS_2"
                    autoComplete="ADDRESS_2"
                    value={data?.ADDRESS_2}
                    onChange={(e) => setData({ ...data, ADDRESS_2: e.target.value })}
                                />
              </GridItem>

<GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="ADDRESS_3"
                    label="Address 3"
                    name="ADDRESS_3"
                    autoComplete="ADDRESS_3"
                    value={data?.ADDRESS_3}
                    onChange={(e) => setData({ ...data, ADDRESS_3: e.target.value })}
                                />
              </GridItem>
<GridItem xs={12} sm={6} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="COUNTRY"
                    label="Country"
                    name="COUNTRY"
                    autoComplete="COUNTRY"
                    value={data?.COUNTRY}
                    onChange={(e) => setData({ ...data, COUNTRY: e.target.value })}
                                />
              </GridItem>
<GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="CITY"
                    label="City"
                    name="CITY"
                    autoComplete="CITY"
                    value={data?.CITY}
                    onChange={(e) => setData({ ...data, CITY: e.target.value })}
                                />
                      </GridItem>
                      <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="POSTAL_CODE"
                    label="Postal Code"
                    name="POSTAL_CODE"
                    autoComplete="POSTAL_CODE"
                    value={data?.POSTAL_CODE}
                    onChange={(e) => setData({ ...data, POSTAL_CODE: e.target.value })}
                                />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={10}  style={{ marginTop: '16px' }}>
                         <JPGrid container direction={'row'} justify={'flex-end'}>
                          <JPGrid item >
                           <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="STATE"
                    label="State"
                    name="STATE"
                    autoComplete="STATE"
                    value={data?.STATE}
                    onChange={(e) => setData({ ...data, STATE: e.target.value })}
                                />
                          </JPGrid>
                                        </JPGrid>

                        
                      </GridItem></>:null}
                {data?.ENTITITY_ID=='2'?<> <GridItem xs={12} sm={12} md={6}>
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={data.EMIAL_TYPE}
    label="Type"
      onChange={(e) => setData({ ...data, EMIAL_TYPE:  TYPE[e.target.value] })}

  >
    <MenuItem value={1}>Work</MenuItem>
    <MenuItem value={2}>Home</MenuItem>
  </Select>
</FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                         <JPGrid container direction={'row'} justify={'flex-end'}>
                          <JPGrid item marginRight={3} marginLeft={3}>
                            <FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Primary" />
</FormGroup>
                          </JPGrid>
                                        </JPGrid>

                        
                      </GridItem>
                       <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="EMIAL_ADDRESS"
                    label="Email"
                    name="EMIAL_ADDRESS"
                    autoComplete="EMIAL_ADDRESS"
                    value={data?.EMIAL_ADDRESS}
                    onChange={(e) => setData({ ...data, EMIAL_ADDRESS: e.target.value })}
                                />
              </GridItem>
                          </> : null}
                           {data?.ENTITITY_ID=='3'?<> <GridItem xs={12} sm={12} md={6}>
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={data.PHONE_TYPE}
    label="Type"
      onChange={(e) => setData({ ...data, PHONE_TYPE: TYPE[e.target.value] })}

  >
    <MenuItem value={1}>Work</MenuItem>
    <MenuItem value={2}>Home</MenuItem>
  </Select>
</FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                         <JPGrid container direction={'row'} justify={'flex-end'}>
                          <JPGrid item marginRight={3} marginLeft={3}>
                           <FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Primary" />
</FormGroup>
                          </JPGrid>
                                        </JPGrid>

                        
                      </GridItem>
                       <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>

                  <TextField
                    variant="outlined"
                    style={{ fontSize: "25px" }}
                    fullWidth
                    id="PHONE_NBR"
                    label="Phone"
                    name="PHONE_NBR"
                    autoComplete="PHONE_NBR"
                    value={data?.PHONE_NBR}
                    onChange={(e) => setData({ ...data, PHONE_NBR: e.target.value })}
                                />
              </GridItem>
</>:null}
               </GridContainer>

      

               

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
        

      
  );
}
