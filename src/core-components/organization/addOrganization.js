import React from 'react';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';

import { useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import JPModal from 'components/jp-modal/jp-modal';
import { useMemo } from 'react';
import { TextField } from '@material-ui/core';
import { addOrganizationThunk } from './api/organization-thunk-api';

export default function AddOrganization(props) {
  const { onSave } = props;

  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({});
  const customersOptions = useMemo(
    () => (
      <>
        <JPModal
          defaultTitle="Organization"
          title={`Add Organization`}
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
                  ORGANIZATION_NAME: data.ORGANIZATION_NAME,
                  SERVICE: data.SERVICE,
                  UIC: data?.UIC,
                  PARENT_DMIS: data?.PARENT_DMIS,
                  DMIS: data?.DMIS,
                  FCC: data?.FCC,
                  PEC: data?.PEC
                };

                ThunkDispatch(addOrganizationThunk({ ...userObject }))
                  .then(result => {
                    onSave({ ...userObject, ORGANIZATION_ID: result.data.ID });

                    setShow(false);
                    setData({});
                  })
                  .catch(error => console.error('addOrganizationThunk', error))
                  .finally(() => {});
              },
              isLoading: false,
              disabled: !data?.SERVICE?.length || !data?.ORGANIZATION_NAME?.length,
              color: !data?.SERVICE?.length || !data?.ORGANIZATION_NAME?.length ? null : 'info'
            }
          ]}
        >
          <JPGrid minHeight={300}>
            <JPGrid container direction="row" alignItems="center" spacing={2} padding={8}>
              <JPGrid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                   InputLabelProps={{
                    style: { fontFamily: 'Trattatello' }
                 }}
                  style={{ fontSize: '25px',  fontFamily: 'Trattatello' }}
                  fullWidth
                  id="Name"
                  label="Organization Name"
                  name="Name"
                  autoComplete="Name"
                  value={data?.ORGANIZATION_NAME}
                  onChange={e => setData({ ...data, ORGANIZATION_NAME: e.target.value })}
                />
              </JPGrid>
              <JPGrid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                   InputLabelProps={{
                    style: { fontFamily: 'Trattatello' }
                 }}
                  style={{ fontSize: '25px',  fontFamily: 'Trattatello' }}
                  fullWidth
                  id="Type"
                  label="Type"
                  name="Type"
                  autoComplete="Type"
                  value={data?.SERVICE}
                  onChange={e => setData({ ...data, SERVICE: e.target.value })}
                />
              </JPGrid>
              <JPGrid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                   InputLabelProps={{
                    style: { fontFamily: 'Trattatello' }
                 }}
                  style={{ fontSize: '25px',  fontFamily: 'Trattatello' }}
                  fullWidth
                  id="UIC"
                  label="UIC"
                  name="UIC"
                  autoComplete="UIC"
                  value={data?.UIC}
                  onChange={e => setData({ ...data, UIC: e.target.value })}
                />
              </JPGrid>
              <JPGrid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                   InputLabelProps={{
                    style: { fontFamily: 'Trattatello' }
                 }}
                  style={{ fontSize: '25px',  fontFamily: 'Trattatello' }}
                  fullWidth
                  id="DMIS"
                  label="DMIS"
                  name="DMIS"
                  autoComplete="DMIS"
                  value={data?.DMIS}
                  onChange={e => setData({ ...data, DMIS: e.target.value })}
                />
              </JPGrid>
              <JPGrid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                   InputLabelProps={{
                    style: { fontFamily: 'Trattatello' }
                 }}
                  style={{ fontSize: '25px',  fontFamily: 'Trattatello' }}
                  fullWidth
                  id="PARENT_DMIS"
                  label="PARENT DMIS"
                  name="PARENT_DMIS"
                  autoComplete="PARENT_DMIS"
                  value={data?.PARENT_DMIS}
                  onChange={e => setData({ ...data, PARENT_DMIS: e.target.value })}
                />
              </JPGrid>
              <JPGrid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                   InputLabelProps={{
                    style: { fontFamily: 'Trattatello' }
                 }}
                  style={{ fontSize: '25px',  fontFamily: 'Trattatello' }}
                  fullWidth
                  id="FCC"
                  label="FCC"
                  name="FCC"
                  autoComplete="FCC"
                  value={data?.FCC}
                  onChange={e => setData({ ...data, FCC: e.target.value })}
                />
              </JPGrid>
              <JPGrid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                   InputLabelProps={{
                    style: { fontFamily: 'Trattatello' }
                 }}
                  style={{ fontSize: '25px',  fontFamily: 'Trattatello' }}
                  fullWidth
                  id="PEC"
                  label="PEC"
                  name="PEC"
                  autoComplete="PEC"
                  value={data?.PEC}
                  onChange={e => setData({ ...data, PEC: e.target.value })}
                />
              </JPGrid>
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
      <JPGrid container direction="row" alignItems="center" justify="flex-end">
        <JPGrid>
          <Button
            color={'info'}
            onClick={() => setShow(true)}
            style={{ fontFamily: 'Trattatello', fontWeight: 'bold' }}
          >
            Add Organization
          </Button>
        </JPGrid>
      </JPGrid>
    </>
  );
}
