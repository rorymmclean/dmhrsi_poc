import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import 'date-fns';

import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThunkDispatch } from 'thunk-dispatch';
import { getContactDetailsPrimaryThunk } from './api/contact-thunk-api';

const Accordion = styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
);

const AccordionSummary = styled(props => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function GetContactDetailsPrimary(props) {
  const { ENTITITY_TYPE } = props;

  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [select, setSelect] = React.useState({});
  const TYPE_NAME = { Work: 1, Home: 2 };
  const [expanded, setExpanded] = React.useState('panel1');
  const [data, setData] = React.useState([]);
  useEffect(() => {
    ThunkDispatch(getContactDetailsPrimaryThunk({ id: location.pathname.split('/')[3] }))
      .then(result => {
        if (result?.length) {
          setData(result);
        }
      })
      .catch(error => console.error('getContactDetailsPrimaryThunk', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return !isLoading ? (
    <GridItem xs={12} sm={12}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{fontFamily: 'Trattatello' }}>Primary Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer>
            <GridItem xs={12} sm={3} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'Trattatello' }}>Location</InputLabel>
                <Select InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                    style={{fontFamily: 'Trattatello'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select}
                  label="Location"
                  onChange={e => {
                    setSelect(e.target.value);
                  }}
                >
                  {data.map(item => {
                    let s = '';
                    if (item?.EMAIL_TYPE?.length) {
                      s = item?.EMAIL_ADDRESS;
                    }
                    if (item?.PHONE_TYPE?.length) {
                      s = item?.PHONE_NBR;
                    }
                    if (item?.ADDRESS_TYPE?.length) {
                      const addr = [
                        item?.ADDRESS_1,
                        item?.ADDRESS_2,
                        item?.ADDRESS_3,
                        item?.COUNTRY,
                        item?.STATE,
                        item?.CITY,
                        item?.POSTAL_CODE
                      ].filter(item => item);
                      s = addr.join(' ,');
                    }

                    return <MenuItem value={item}>{s}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <JPGrid container direction={'row'} justify={'flex-end'}>
                <JPGrid item marginRight={3} marginLeft={3}>
                  <Button
                    style={{
                      fontFamily: 'Trattatello',
                      fontWeight: 'bold'
                    }}
                    onClick={() => {
                      history.push({
                        pathname:
                          ENTITITY_TYPE == 'ORG'
                            ? `/admin/contact/${location.pathname.split('/')[3]}`
                            : `/admin/contactPerson/${location.pathname.split('/')[3]}`
                      });
                    }}
                    variant={'outlined'}
                    color={'info'}
                  >
                    Contacts
                  </Button>
                </JPGrid>
              </JPGrid>
            </GridItem>
            {select?.CONTACT_TYPE == 'ADDRESS' ? (
              <>
                {' '}
                <GridItem xs={12} sm={12} md={3} style={{ marginTop: '16px' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{fontFamily: 'Trattatello'}}>Type</InputLabel>
                    <Select  style={{fontFamily: 'Trattatello'}}
                    InputLabelProps={{
                      style: { color: '#000',
                      fontFamily: 'Trattatello',
                      
                      }
                    }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      disabled
                      value={
                        select.ADDRESS_TYPE?.length
                          ? TYPE_NAME[select.ADDRESS_TYPE]
                          : TYPE_NAME[select?.ADDRESS_TYPE]
                      }
                      label="Type"
                    >
                      <MenuItem value={1} style={{fontFamily: 'Trattatello'}}>Work</MenuItem>
                      <MenuItem value={2} style={{fontFamily: 'Trattatello'}}>Home</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                {select?.ADDRESS_1 ? (
                  <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                      fullWidth
                      id={select?.ADDRESS_1}
                      label="Address 1"
                      disabled
                      name="ADDRESS_1"
                      autoComplete="ADDRESS_1"
                      value={select?.ADDRESS_1}
                    />
                  </GridItem>
                ) : null}
                {select?.ADDRESS_2 ? (
                  <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                      fullWidth
                      label="Address 2"
                      disabled
                      name={select?.ADDRESS_2}
                      value={select?.ADDRESS_2}
                    />
                  </GridItem>
                ) : null}
                {select?.ADDRESS_3 ? (
                  <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                      fullWidth
                      id={select?.ADDRESS_3}
                      label="Address 3"
                      disabled
                      name="ADDRESS_3"
                      autoComplete="ADDRESS_3"
                      value={select?.ADDRESS_3}
                    />
                  </GridItem>
                ) : null}
                <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                    fullWidth
                    id="COUNTRY"
                    disabled
                    label="Country"
                    name="COUNTRY"
                    autoComplete="COUNTRY"
                    value={select?.COUNTRY}
                  />
                </GridItem>
                <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                    fullWidth
                    id="CITY"
                    label="City"
                    disabled
                    name="CITY"
                    autoComplete="CITY"
                    value={select?.CITY}
                  />
                </GridItem>
                <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                    fullWidth
                    id="POSTAL_CODE"
                    label="Postal Code"
                    name="POSTAL_CODE"
                    disabled
                    autoComplete="POSTAL_CODE"
                    value={select?.POSTAL_CODE}
                  />
                </GridItem>
                <GridItem xs={12} sm={3} md={3} style={{ marginTop: '16px' }}>
                  <JPGrid  >
                    <JPGrid item>
                      <TextField
                        variant="outlined"
                        InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                        fullWidth
                        id="STATE"
                        label="State"
                        name="STATE"
                        disabled
                        autoComplete="STATE"
                        value={select?.STATE}
                      />
                    </JPGrid>
                  </JPGrid>
                </GridItem>
              </>
            ) : null}
            {select?.CONTACT_TYPE == 'EMAIL' ? (
              <>
                {' '}
                <GridItem xs={12} sm={12} md={6} style={{ marginTop: '16px' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      disabled
                      value={
                        select.EMAIL_TYPE?.length
                          ? TYPE_NAME[select.EMAIL_TYPE]
                          : TYPE_NAME[select?.EMAIL_TYPE]
                      }
                      label="Type"
                    >
                      <MenuItem value={1}>Work</MenuItem>
                      <MenuItem value={2}>Home</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                  <TextField
                    variant="outlined"
                    InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                    fullWidth
                    disabled
                    id="EMAIL_ADDRESS"
                    label="Email"
                    name="EMAIL_ADDRESS"
                    autoComplete="EMAIL_ADDRESS"
                    value={select?.EMAIL_ADDRESS}
                  />
                </GridItem>
              </>
            ) : null}
            {select?.CONTACT_TYPE == 'PHONE' ? (
              <>
                {' '}
                <GridItem xs={12} sm={12} md={6} style={{ marginTop: '16px' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{fontFamily: 'Trattatello'}}>Type</InputLabel>
                    <Select style={{fontFamily: 'Trattatello'}}
                    InputLabelProps={{
                      style: { color: '#000',
                      fontFamily: 'Trattatello',
                      
                      }
                    }}
                    
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      disabled
                      value={
                        select.PHONE_TYPE?.length
                          ? TYPE_NAME[select.PHONE_TYPE]
                          : TYPE_NAME[select?.PHONE_TYPE]
                      }
                      label="Type"
                    >
                      <MenuItem value={1} style={{fontFamily: 'Trattatello'}}>Work</MenuItem>
                      <MenuItem value={2} style={{fontFamily: 'Trattatello'}}>Home</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                  <TextField 
                  
                    variant="outlined"
                    InputLabelProps={{
                      style: { fontFamily: 'Trattatello' }
                    }}
                    fullWidth
                    id="PHONE_NBR"
                    label="Phone"
                    disabled
                    name="PHONE_NBR"
                    autoComplete="PHONE_NBR"
                    value={select?.PHONE_NBR}
                  />
                </GridItem>
              </>
            ) : null}
          </GridContainer>
        </AccordionDetails>
      </Accordion>
    </GridItem>
  ) : (
    <Grid container justify="center" alignItems="center" style={{ minHeight: 400 }}>
      <CircularProgress size={35}></CircularProgress>
    </Grid>
  );
}
