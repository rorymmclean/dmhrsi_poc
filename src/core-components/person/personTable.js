import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Button from 'components/CustomButtons/Button.jsx';
import Edit from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import AddPerson from './addPerson';
import PersonIcon from '@mui/icons-material/Person';
import { getPersonListAPI } from './api/person-api';
import EditPerson from './editPerson';
import EditPersonOrg from './editPersonOrg';
import JPModal from 'components/jp-modal/jp-modal';

export default function PersonTable(props) {
  const { ID, NAME, MODE } = props;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = React.useState(false);
  const [id, setID] = React.useState('');

  const onClickStory = item => {
    history.push({
      pathname: `/admin/editPerson/${item?.PERSON_ID}`,
      state: { id: item?.PERSON_ID }
    });
  };
  const onClickStoryview = item => {
    history.push({
      pathname: `/admin/viewPerson/${item?.PERSON_ID}`,
      state: { id: item?.PERSON_ID }
    });
  };
  const [data, setData] = React.useState([]);

  const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        name: data.name,
        id: data.id
      };
    });

  useEffect(() => {
    if (ID?.length) searchPersons(ID);
    else {
      searchPersons('Deedra Courtney Robertson');
    }
  }, [ID]);

  const searchPersons = async value => {
    const response = await getPersonListAPI({ search_string: value });

    if (response?.data?.body) {
      setIsLoading(false);
      setData(JSON.parse(response.data.body));
    } else {
      setData([]);
    }
    setIsLoading(false);
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    searchPersons(value);
  };

  const style = {
    overrides: {
      MuiTableCell: {
        root: {
          padding: '6px'
        }
      }
    }
  };
  const theme = createMuiTheme({ style });

  return (
    <div className="m-sm-30">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <JPGrid container direction="row" alignItems="flex-end" justify="space-between">
                <JPGrid item xs={2}>
                  <CardIcon color="primary">
                    <PersonIcon />
                  </CardIcon>
                  <GridItem xs={12} sm={12} md={12}>
                    <Typography
                      style={{
                        color: '#000',
                        fontFamily: 'Papyrus',
                        fontWeight: 'bold',
                        fontSize: '23px'
                      }}
                    >
                      Persons
                    </Typography>
                  </GridItem>
                </JPGrid>
                <JPGrid item xs={8}>
                  {' '}
                  {!ID?.length ? (
                    <TextField
                      type="search"
                      variant="outlined"
                      style={{ paddingTop: 4 }}
                      fullWidth
                      placeholder="Search"
                      onChange={handleInputChange}
                      defaultValue={NAME?.length ? NAME : 'Deedra Courtney Robertson'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  ) : null}
                </JPGrid>
                <JPGrid item xs={2} container alignItems="flex-end" justify="flex-end">
                  <AddPerson
                    onSave={result => {
                      setData(prevState => {
                        const data = [...prevState];
                        data.unshift(result);

                        return data;
                      });
                    }}
                  />
                </JPGrid>
              </JPGrid>
            </CardHeader>
            <CardBody>
              <MuiThemeProvider theme={theme}>
                <MaterialTable
                  isLoading={isLoading}
                  columns={[
                    {
                      title: 'Person Name',
                      field: 'FIRST_NAME',
                      render: rowData => (
                        <Typography type={'h3'}>
                          {`${rowData.FIRST_NAME} ${rowData.MIDDLE_NAME} ${rowData.LAST_NAME}`}
                        </Typography>
                      )
                    },
                    {
                      title: ' Edipn',
                      field: 'EDIPN',
                      render: rowData => <Typography type={'h3'}>{`${rowData.EDIPN}`}</Typography>
                    },
                    {
                      title: ' Person Type',
                      field: 'PERSON_TYPE,',
                      render: rowData => (
                        <Typography type={'h3'}>{`${rowData.PERSON_TYPE}`}</Typography>
                      )
                    },

                    {
                      title: ' Personnel Cat',
                      field: 'PERSONNEL_CAT',
                      render: rowData => (
                        <Typography type={'h3'}>{`${rowData.PERSONNEL_CAT}`}</Typography>
                      )
                    },
                    {
                      title: ' Civillian Title',
                      field: 'CIVILLIAN_TITLE',
                      render: rowData => (
                        <Typography type={'h3'}>{`${rowData.CIVILLIAN_TITLE}`}</Typography>
                      )
                    },
                    { title: 'Type', field: 'SERVICE' },
                    { title: 'Rank', field: 'GRADE' },

                    !ID?.length
                      ? {
                          field: 'view',
                          editable: 'never',
                          title: 'Edit',
                          render: rowData => (
                            <Button
                              color={'info'}
                              onClick={() => {
                                setID(rowData?.PERSON_ID);
                                MODE === 'Model' ? setShow(true) : onClickStory(rowData);
                              }}
                              style={{
                                padding: '8px 4px 6px 8px',
                                borderRadius: '20px'
                              }}
                            >
                              <Edit />
                            </Button>
                          )
                        }
                      : null,
                    ID?.length
                      ? {
                          field: 'view',
                          editable: 'never',
                          title: 'view',
                          render: rowData => (
                            <Button
                              color={'info'}
                              onClick={() => onClickStoryview(rowData)}
                              style={{
                                padding: '8px 4px 6px 8px',
                                borderRadius: '20px'
                              }}
                            >
                              <Search onClick={() => onClickStoryview(rowData)} />
                            </Button>
                          )
                        }
                      : null
                  ].filter(item => item)}
                  components={{
                    Container: props => (
                      <JPGrid container>
                        <JPGrid item xs={12}>
                          <Paper {...props} sx elevation={0} />
                        </JPGrid>
                      </JPGrid>
                    )
                  }}
                  data={renderList(data)}
                  options={{
                    search: false,
                    showTitle: false,
                    toolbar: false
                  }}
                />
              </MuiThemeProvider>
            </CardBody>
          </Card>
        </GridItem>
        <JPModal
          onClose={_ => {
            setShow(false);
          }}
          closeButton={true}
          fullWidth
          maxWidth="lg"
          open={show}
        >
          <EditPersonOrg personId={id} />
        </JPModal>
      </GridContainer>
    </div>
  );
}
