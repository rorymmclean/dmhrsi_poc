import React from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import { useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Edit from '@material-ui/icons/Edit';
import { editContactThunk } from 'core-components/contact/api/contact-thunk-api';

export default function EditContact(props) {
  const { rowData, onSave, ENTITITY_TYPE } = props;
  const location = useLocation();

  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({ ...rowData });
  const CONTACT_TYPE = { 1: 'ADDRESS', 2: 'EMAIL', 3: 'PHONE' };
  const CONTACT_TYPE_NAME = { ADDRESS: 1, EMAIL: 2, PHONE: 3 };

  const TYPE = { 1: 'Work', 2: 'Home' };
  const TYPE_NAME = { Work: 1, Home: 2 };

  const customersOptions = useMemo(
    () => (
      <>
        <JPModal
          defaultTitle="Contact"
          title={`Add Contact`}
          onClose={_ => {
            setShow(false);
            setData({});
          }}
          closeButton={true}
          fullWidth
          maxWidth="sm"
          open={show}
          dialogActions={[
            {
              name: 'Save',
              onClick: _ => {
                const userObject = {
                  CONTACT_ID: rowData.CONTACT_ID,
                  ENTITITY_ID: location.pathname.split('/')[3],
                  ENTITITY_TYPE: ENTITITY_TYPE,
                  CONTACT_TYPE: data?.CONTACT_TYPE?.toString() || '',
                  EMAIL_TYPE: data?.EMAIL_TYPE?.toString() || '',
                  EMAIL_ADDRESS: data?.EMAIL_ADDRESS?.toString() || '',
                  PHONE_TYPE: data?.PHONE_TYPE?.toString() || '',
                  PHONE_NBR: data?.PHONE_NBR?.toString() || '',
                  ADDRESS_TYPE: data?.ADDRESS_TYPE?.toString() || '',
                  ADDRESS_1: data?.ADDRESS_1?.toString() || '',
                  ADDRESS_2: data?.ADDRESS_2?.toString() || '',
                  ADDRESS_3: data?.ADDRESS_3?.toString() || '',
                  POSTAL_CODE: data?.POSTAL_CODE?.toString() || '',
                  COUNTRY: data?.COUNTRY?.toString() || '',
                  STATE: data?.STATE?.toString() || '',
                  CITY: data?.CITY?.toString() || '',
                  PRIMARY_FLAG: data?.PRIMARY_FLAG == true ? 'Y' : 'N'
                };

                ThunkDispatch(editContactThunk({ ...userObject }))
                  .then(result => {
                    onSave({ ...userObject });

                    setShow(false);
                    setData({});
                  })
                  .catch(error => console.error('editContactThunk', error))
                  .finally(() => { });
              },
              isLoading: false,
              disabled:
                !data?.CONTACT_TYPE?.length ||
                !(
                  data?.ADDRESS_TYPE?.length ||
                  data?.EMAIL_TYPE?.length ||
                  data?.PHONE_TYPE?.length
                ),
              color:
                !data?.CONTACT_TYPE?.length ||
                  !(
                    data?.ADDRESS_TYPE?.length ||
                    data?.EMAIL_TYPE?.length ||
                    data?.PHONE_TYPE?.length
                  )
                  ? null
                  : 'info'
            }
          ]}
        >
          <JPGrid minHeight={300}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} style={{ marginBottom: '16px' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Contact Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled
                    value={CONTACT_TYPE_NAME[rowData?.CONTACT_TYPE]}
                    label="Contact Type"
                    onChange={e =>
                      setData({
                        ...data,
                        CONTACT_TYPE: CONTACT_TYPE[e.target.value],
                        ENTITITY_ID: e.target.value?.toString()
                      })
                    }
                  >

                    <MenuItem value={1} >Mailing Address</MenuItem>
                    <MenuItem value={2} >Email address</MenuItem>
                    <MenuItem value={3} >Phone Number</MenuItem>
                  </Select>
                </FormControl>
              </GridItem>

              {rowData?.CONTACT_TYPE == 'ADDRESS' ? (
                <>
                  {' '}
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" >Service</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          data.ADDRESS_TYPE?.length
                            ? TYPE_NAME[data.ADDRESS_TYPE]
                            : TYPE_NAME[rowData?.ADDRESS_TYPE]
                        }
                        label="Type"
                        onChange={e => setData({ ...data, ADDRESS_TYPE: TYPE[e.target.value] })}
                      >
                        <MenuItem value={1} >Work</MenuItem>
                        <MenuItem value={2} >Home</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <JPGrid container direction={'row'} justify={'flex-end'}>
                      <JPGrid item marginRight={3} marginLeft={3}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                checked={data?.PRIMARY_FLAG == 'Y'}
                                onChange={e => setData({ ...data, PRIMARY_FLAG: e.target.checked })}
                              />
                            }
                            label="Primary"
                          />
                        </FormGroup>
                      </JPGrid>
                    </JPGrid>
                  </GridItem>
                  <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="ADDRESS_1"
                      label="Address 1"

                      name="ADDRESS_1"
                      autoComplete="ADDRESS_1"
                      value={data?.ADDRESS_1}
                      onChange={e => setData({ ...data, ADDRESS_1: e.target.value })}

                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="ADDRESS_2"
                      label="Address 2"
                      name="ADDRESS_2"
                      autoComplete="ADDRESS_2"
                      value={data?.ADDRESS_2}
                      onChange={e => setData({ ...data, ADDRESS_2: e.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"



                      fullWidth
                      id="ADDRESS_3"
                      label="Address 3"
                      name="ADDRESS_3"
                      autoComplete="ADDRESS_3"
                      value={data?.ADDRESS_3}
                      onChange={e => setData({ ...data, ADDRESS_3: e.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"

                      fullWidth
                      id="COUNTRY"
                      label="Country"
                      name="COUNTRY"
                      autoComplete="COUNTRY"
                      value={data?.COUNTRY}
                      onChange={e => setData({ ...data, COUNTRY: e.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="CITY"
                      label="City"
                      name="CITY"
                      autoComplete="CITY"
                      value={data?.CITY}
                      onChange={e => setData({ ...data, CITY: e.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="POSTAL_CODE"
                      label="Postal Code"
                      name="POSTAL_CODE"
                      autoComplete="POSTAL_CODE"
                      value={data?.POSTAL_CODE}
                      onChange={e => setData({ ...data, POSTAL_CODE: e.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} style={{ marginTop: '16px' }}>
                    <JPGrid container direction={'row'} justify={'flex-end'}>
                      <JPGrid item>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="STATE"
                          label="State"
                          name="STATE"
                          autoComplete="STATE"
                          value={data?.STATE}
                          onChange={e => setData({ ...data, STATE: e.target.value })}
                        />
                      </JPGrid>
                    </JPGrid>
                  </GridItem>
                </>
              ) : null}
              {rowData?.CONTACT_TYPE == 'EMAIL' ? (
                <>
                  {' '}
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" >Type</InputLabel>
                      <Select

                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          data.EMAIL_TYPE?.length
                            ? TYPE_NAME[data.EMAIL_TYPE]
                            : TYPE_NAME[rowData?.EMAIL_TYPE]
                        }
                        label="Type"
                        onChange={e => setData({ ...data, EMAIL_TYPE: TYPE[e.target.value] })}
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
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                checked={data?.PRIMARY_FLAG == 'Y'}
                                onChange={e => setData({ ...data, PRIMARY_FLAG: e.target.checked })}
                              />
                            }
                            label="Primary"
                          />
                        </FormGroup>
                      </JPGrid>
                    </JPGrid>
                  </GridItem>
                  <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="EMAIL_ADDRESS"
                      label="Email"
                      name="EMAIL_ADDRESS"
                      autoComplete="EMAIL_ADDRESS"
                      value={data?.EMAIL_ADDRESS}
                      onChange={e => setData({ ...data, EMAIL_ADDRESS: e.target.value })}
                    />
                  </GridItem>
                </>
              ) : null}
              {rowData?.CONTACT_TYPE == 'PHONE' ? (
                <>
                  {' '}
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" >Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          data.PHONE_TYPE?.length
                            ? TYPE_NAME[data.PHONE_TYPE]
                            : TYPE_NAME[rowData?.PHONE_TYPE]
                        }
                        label="Type"
                        onChange={e => setData({ ...data, PHONE_TYPE: TYPE[e.target.value] })}
                      >
                        <MenuItem value={1} >Work</MenuItem>
                        <MenuItem value={2} >Home</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <JPGrid container direction={'row'} justify={'flex-end'}>
                      <JPGrid item marginRight={3} marginLeft={3}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                checked={data?.PRIMARY_FLAG == 'Y'}
                                onChange={e => setData({ ...data, PRIMARY_FLAG: e.target.checked })}
                              />
                            }
                            label="Primary"
                          />
                        </FormGroup>
                      </JPGrid>
                    </JPGrid>
                  </GridItem>
                  <GridItem xs={12} sm={12} style={{ marginTop: '16px' }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="PHONE_NBR"
                      label="Phone"
                      name="PHONE_NBR"
                      autoComplete="PHONE_NBR"
                      value={data?.PHONE_NBR}
                      onChange={e => setData({ ...data, PHONE_NBR: e.target.value })}
                    />
                  </GridItem>
                </>
              ) : null}
            </GridContainer>
          </JPGrid>
        </JPModal>
      </>
    ),
    [show, data, rowData]
  );
  return (
    <>
      {customersOptions}
      <Button

        color={'info'}
        onClick={() => setShow(true)}
        style={{
          padding: '8px 4px 6px 8px',
          borderRadius: '20px',
          fontFamily: 'Papyrus'
        }}
      >
        <Edit onClick={() => setShow(true)} />
      </Button>
    </>
  );
}
