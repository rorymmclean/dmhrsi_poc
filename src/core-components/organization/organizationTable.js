import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Button from 'components/CustomButtons/Button.jsx';
import Edit from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import AddOrganization from './addOrganization';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import { getOrganizationListAPI } from './api/organization-api';

export default function OrganizationTable() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const onClickStory = item => {
    history.push({
      pathname: `/admin/editOrganization/${item?.ORGANIZATION_ID}`,
      state: { id: item?.ORGANIZATION_ID }
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
    searchOrganizations('TNMOFY');
  }, []);

  const searchOrganizations = async value => {
    const response = await getOrganizationListAPI({ search_string: value });

    if (response?.data?.body) {
      setIsLoading(false);
      setData(JSON.parse(response.data.body));
    } else {
      setData([]);
    }
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    searchOrganizations(value);
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
                <JPGrid item xs={3}>
                  <CardIcon color="primary">
                    <SensorOccupiedIcon />
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
                      Organizations
                    </Typography>
                  </GridItem>
                </JPGrid>
                <JPGrid item xs={6}  >
                  {' '}
                  <TextField

                    type="search"
                    variant="outlined"
                    style={{ paddingTop: 4 }}
                    fullWidth
                    defaultValue={'TNMOFY'}
                    placeholder="Search"
                    onChange={handleInputChange}
                    InputProps={{

                      startAdornment: (
                        <InputAdornment position="start" >
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </JPGrid>
                <JPGrid item xs={2} container alignItems="flex-end" justify="flex-end">
                  <AddOrganization
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
                    { title: 'Organization Name', field: 'ORGANIZATION_NAME' },
                    { title: 'Type', field: 'SERVICE' },
                    { title: 'DMIS', field: 'DMIS' },
                    { title: 'PARENT DMIS', field: 'PARENT_DMIS' },

                    { title: 'Location', field: 'contacts' },
                    {
                      field: 'view',
                      editable: 'never',
                      title: 'Edit',
                      render: rowData => (
                        <Button
                          color={'info'}
                          onClick={() => onClickStory(rowData)}
                          style={{
                            padding: '8px 4px 6px 8px',
                            borderRadius: '20px'
                          }}
                        >
                          <Edit onClick={() => onClickStory(rowData)} />
                        </Button>
                      )
                    }
                  ]}
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
      </GridContainer>
    </div>
  );
}
