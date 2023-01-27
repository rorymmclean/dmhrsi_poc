import React, { useEffect, useMemo, useState } from 'react';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import Edit from "@material-ui/icons/Edit";
import { useHistory } from 'react-router-dom';
import { getOrganizationListThunk } from './api/organization-thunk-api';
import AddOrganization from './addOrganization';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import _ from 'lodash';

export default function OrganizationTable() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const onClickStory = (item) => {
    history.push({
      pathname: `/admin/edit/${item?.ORGANIZATION_ID}`,
      state: { id: item?.ORGANIZATION_ID }
    });
  }
  const [state, setState] = React.useState({
      columns: [
          { title: 'Organization Name', field: 'ORGANIZATION_NAME' },
          { title: 'Type', field: 'SERVICE' },
          { title: 'Location', field: 'contacts' },
    {
      field: 'view',
      editable: 'never',
      title: 'Edit',
      render: rowData => <Button color={'info'} onClick={() => onClickStory(rowData)} style={{
        padding: "8px 4px 6px 8px",
        borderRadius: "20px"
      }}>
        <Edit onClick={() => onClickStory(rowData)} />
      </Button>
    }
    ],
    data: []
  });

  const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        name: data.name,
        id: data.id
      };
    });

   useEffect( () =>
  {
    setIsLoading(true)
   searchOrganizations("TNMOFY")
  }, [] );

    const searchOrganizations = (value) => {
       ThunkDispatch(getOrganizationListThunk({search_string:value}))
      .then(result => {
        if (result?.data?.body) {
            
        
        setState(prevState => {
            const data = [];
          for (let index = 0; index < JSON.parse(result.data.body).length; index++) {
            data.push(JSON.parse(result.data.body)[index]);
          }
          return { ...prevState, data };
        });
        } else {
           setState(prevState => {
             let data = [];
          return { ...prevState, data };
        });
      }
      })
      .catch(error => console.error('getOrganizationListThunk', error))
      .finally(() => { setIsLoading(false) });
  };

 const inputDebounce = React.useRef(_.debounce(searchOrganizations, 100)).current;

  
  
  const handleInputChange = ({ target }) => {
    const { value } = target;
    inputDebounce(value);
  };

     const style = {
    overrides: {
      MuiTableCell: {
        root: {
          padding: '6px',
        }
      }
    }
  };
  const theme = createMuiTheme( style );
   const customersOptions = useMemo(
        () => (
            <>
               
<MuiThemeProvider theme={theme}>
              <MaterialTable
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
                  toolbar: false,
                }}
              />
           </MuiThemeProvider>
           
            </>
        ),
        [state.data, state.columns, isLoading]
     );

  return (
    <div className="m-sm-30">
          
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
             

              <JPGrid container direction="row" alignItems="flex-end" justify="space-between" >
                <JPGrid item xs={6}  >
                   <CardIcon color="primary">
                    <SensorOccupiedIcon />

              </CardIcon>
              <h4 style={{color:"#000"}}>Organizations</h4>
                 </JPGrid>
                <JPGrid item xs={6} container alignItems="flex-end" justify="flex-end">
                   <AddOrganization onSave={(result) => {
        setState(prevState => {
          const data = [...prevState.data];
          data.unshift(result);

          return { ...prevState, data };
        });

      }} />
                </JPGrid>
            </JPGrid>
              
            </CardHeader>
            <CardBody>
               <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
 <TextField
        type="search"
        variant="outlined"
                    margin="normal"
                    fullWidth
                    defaultValue={"TNMOFY"}
                      placeholder="Search"
      onBlur={handleInputChange}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
                </GridItem>
                      </GridContainer>

{customersOptions}
 
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
