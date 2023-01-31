import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import JPGrid from 'components/jp-grid/jp-grid';
import { Paper, Typography } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import PersonIcon from '@material-ui/icons/Group';
import Card from 'components/Card/Card.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import 'date-fns';
import { ThunkDispatch } from 'thunk-dispatch';
import { getContactDetailsThunk } from 'core-components/contact/api/contact-thunk-api';
import MaterialTable from 'material-table';
import AddContact from '../contact/addContact';
import EditContact from '../contact/editContact';
import Button from 'components/CustomButtons/Button';

import { Checkbox } from '@mui/material';

export default function ContactPerson() {
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = React.useState(true);
  const [state, setState] = React.useState({
    columns: [
      { title: 'CONTACT TYPE', field: 'CONTACT_TYPE' },
      {
        title: 'TYPE',
        field: '',
        render: rowData => {
          let s = '';

          if (rowData?.EMAIL_TYPE?.length) {
            s = rowData?.EMAIL_TYPE;
          }
          if (rowData?.PHONE_TYPE?.length) {
            s = rowData?.PHONE_TYPE;
          }
          if (rowData?.ADDRESS_TYPE?.length) {
            s = rowData?.ADDRESS_TYPE;
          }
          return <Typography type={'h3'}>{`${s}`}</Typography>;
        }
      },
      { title: 'EMAIL ADDRESS', field: 'EMAIL_ADDRESS' },
      { title: 'PHONE', field: 'PHONE_NBR' },
      {
        title: 'ADDRESS',
        field: '',
        render: rowData => {
          const addr = [
            rowData?.ADDRESS_1,
            rowData?.ADDRESS_2,
            rowData?.ADDRESS_3,
            rowData?.COUNTRY,
            rowData?.STATE,
            rowData?.CITY,
            rowData?.POSTAL_CODE
          ].filter(item => item);

          return <Typography type={'h3'}>{`${addr.join(' ,')}`}</Typography>;
        }
      },
      {
        title: 'Primary',
        field: '',
        render: rowData => {
          return <Checkbox defaultChecked disabled checked={rowData?.PRIMARY_FLAG === 'Y'} />;
        }
      },
      {
        field: 'view',
        editable: 'never',
        title: 'Edit',
        render: rowData => (
          <EditContact
            ENTITITY_TYPE={'PERSON'}
            rowData={rowData}
            onSave={result => {
              setState(prevState => {
                const data = [...prevState.data];
                return {
                  ...prevState,
                  data: data.map(item => {
                    return item.CONTACT_ID === result.CONTACT_ID ? result : item;
                  })
                };
              });
            }}
          />
        )
      }
    ],
    data: []
  });

  useEffect(() => {
    ThunkDispatch(getContactDetailsThunk({ id: location.pathname.split('/')[3] }))
      .then(result => {
        if (result?.data?.body) {
          setState(prevState => {
            const data = [...prevState.data];
            for (let index = 0; index < JSON.parse(result.data.body).length; index++) {
              data.push(JSON.parse(result.data.body)[index]);
            }
            return { ...prevState, data };
          });
        }
      })
      .catch(error => console.error('getContactDetailsThunk', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        name: data.name,
        id: data.id
      };
    });
  return (
    <div className="m-sm-30">
      <JPGrid container direction={'row'} justify={'flex-end'}>
        <JPGrid item marginRight={3} marginLeft={3}>
          <Button
            style={{
              fontFamily: 'Trattatello',
              fontWeight: 'bold'
            }}
            onClick={() => {
              history.push({
                pathname: `/admin/editPerson/${location.pathname.split('/')[3]}`
              });
            }}
            variant={'outlined'}
          >
            Cancel
          </Button>
        </JPGrid>
        <JPGrid item marginRight={3} marginLeft={3}>
          <AddContact
            ENTITITY_TYPE={'PERSON'}
            onSave={result => {
              setState(prevState => {
                const data = [...prevState.data];
                data.unshift(result);

                return { ...prevState, data };
              });
            }}
          />
        </JPGrid>
      </JPGrid>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <PersonIcon />
              </CardIcon>
              <h4
                style={{
                  color: '#000',
                  fontFamily: 'Trattatello',
                  fontWeight: 'bold',
                  fontSize: '23px'
                }}
              >
                Contact
              </h4>
            </CardHeader>
            <CardBody>
              <MaterialTable  style={{fontFamily: 'Trattatello'}}
                isLoading={isLoading}
                columns={state.columns}
                components={{
                  Container: props => (
                    <JPGrid container>
                      <JPGrid item xs={12}>
                        <Paper {...props} sx elevation={0} />
                      </JPGrid>
                    </JPGrid>
                  )
                }}
                data={renderList(state.data)}
                options={{
                  search: false,
                  showTitle: false,
                  toolbar: false
                }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
