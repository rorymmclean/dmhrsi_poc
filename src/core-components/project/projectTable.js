import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import Edit from "@material-ui/icons/Edit";
import { useHistory } from 'react-router-dom';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import _ from 'lodash';
import { getProjectListThunk } from './api/project-thunk-api';
import AddProject from './addProject';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function ProjectTable ( props )
{
  const { ID, NAME } = props;

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onClickStory = (item) => {
    history.push({
      pathname: `/admin/editProject/${item?.PROJECT_ID}`,
      state: { id: item?.PROJECT_ID }
    });
  }

  const [state, setState] = React.useState({
      columns: [
      { title: 'Project Name', field: 'PROJECT_NAME' },
            { title: 'Service', field: 'PROJECT_NBR' },
      { title: 'Organization Name', field: 'ORGANIZATION_NAME' },
                  { title: 'Manager Name', field: 'FIRST_NAME', render: rowData =>   <Typography type={'h3'}>{`${rowData?.FIRST_NAME} ${rowData?.MIDDLE_NAME} ${rowData?.LAST_NAME}`}</Typography> },

    !ID?.length?{
      field: 'view',
      editable: 'never',
      title: 'Edit',
      render: rowData => <Button color={'info'} onClick={() => onClickStory(rowData)} style={{
        padding: "8px 4px 6px 8px",
        borderRadius: "20px"
      }}>
        <Edit onClick={() => onClickStory(rowData)} />
      </Button>
    }:null
    ].filter(item=>item),
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
    if(ID?.length)
      searchProjects( ID )
    else
    {
 searchProjects( "Project - 00499" )
    }
  }, [ID]); 


  const searchProjects = ( value ) =>
  {
       
       ThunkDispatch(getProjectListThunk({search_string:value}))
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
      .catch(error => console.error('getProjectListThunk', error))
      .finally(() => { setIsLoading(false) });
  };

 const inputDebounce = React.useRef(_.debounce(searchProjects, 100)).current;

  
  
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
  
  return (
    <div className="m-sm-30">
         
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              
               <JPGrid container direction="row" alignItems="flex-end" justify="space-between" >
                <JPGrid item xs={6}  >
                   <CardIcon color="primary">
                <AssignmentIcon />
              </CardIcon>
              <h4 style={{color:"#000"}}>Projects</h4>
                 </JPGrid>
                <JPGrid item xs={6} container alignItems="flex-end" justify="flex-end">
                    <AddProject onSave={(result) => {
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
                      placeholder="Search"
      onBlur={handleInputChange}
defaultValue={NAME?.length?NAME:"Project - 00499"}
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
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
