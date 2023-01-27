import React, { useEffect, useMemo, useState } from 'react';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'thunk-dispatch';
import Button from 'components/CustomButtons/Button.jsx';
import Edit from "@material-ui/icons/Edit";
import { useHistory } from 'react-router-dom';
import { getAlLocationRuleSetListThunk, getArsetListThunk } from './api/AlLocationRuleSet-thunk-api';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardIcon from 'components/Card/CardIcon';
import BusinessIcon from '@material-ui/icons/Apartment';;
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import JPGrid from 'components/jp-grid/jp-grid';
import { createMuiTheme, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import _ from 'lodash';
import AddAlLocationRuleSet from './addalLocationRuleSet';
import EditAlLocationRuleSet from './editalLocationRuleSet';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { getPersonListThunk } from 'core-components/person/api/person-thunk-api';
import Autocomplete from '@mui/material/Autocomplete';

export default function AlLocationRuleSetTable() {
  const [ isLoading, setIsLoading ] = useState( false );
    const [valueEmployee, setValueEmployee] = React.useState(null);
    const [inputValueEmployee, setInputValueEmployee] = React.useState('');
  const [ optionsEmployee, setOptionsEmployee ] = React.useState( [] );
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date', field: 'FIRST_NAME', render: rowData =>   <Typography type={'h3'}>{`${rowData?.START_DATE} - ${rowData?.END_DATE}`}</Typography> },
      { title: 'Name', field: 'NAME', render: rowData =>   <Typography type={'h3'}>{`${rowData?.NAME}`}</Typography> },
      { title: 'Person Name', field: 'FULLNAME', render: rowData => <Typography type={'h3'}>{`${rowData?.FULLNAME}`}</Typography>  },
      {
        field: 'view',
        editable: 'never',
        title: 'Edit',
        render: rowData => <EditAlLocationRuleSet rowData={ rowData } onSave={(result) => {
        setState(prevState => {
          const data = [ ...prevState.data ];
          return { ...prevState, data : data.map((item) => {
        return item.RULE_ID === result.RULE_ID?result:item;
         } )};
        });

      }}/>
      },
       {
        field: 'view',
        editable: 'never',
        title: 'View',
        render: rowData => <EditAlLocationRuleSet rowData={ rowData } disabled={true} />
      }
    ],
    data: []
  });


  
    const searchEmployees = (value) => {
        ThunkDispatch(getPersonListThunk({ search_string: value }))
            .then(result => {
                if (result?.data?.body) {
                    setOptionsEmployee(JSON.parse(result.data.body));
                } else {
                    setOptionsEmployee([]);

                }
            })
            .catch(error => console.error('getPersonListThunk', error))
            .finally(() => { });
    };
    React.useEffect(() => {
        let active = true;
        if (inputValueEmployee === '') {
            setOptionsEmployee([]);
            return undefined;
        }
        searchEmployees(inputValueEmployee)


        return () => {
            active = false;
        };
    }, [ inputValueEmployee ] );
  
  
  const renderList = (tableDataArr = []) =>
    tableDataArr.map(data => {
      return {
        ...data,
        name: data.name,
        id: data.id
      };
    });


  const searchAlLocationRuleSets = ( value ) =>
  {
    if ( value?.length )
    {
      ThunkDispatch( getArsetListThunk( { search_string: value } ) )
        .then( result =>
        {
          if ( result?.data?.body )
          {

            setState( prevState =>
            {
    
              return { ...prevState, data: JSON.parse( result.data.body ) };
            } );
          } else
          {
            setState( prevState =>
            {
              return { ...prevState, data:[] };
            } );
          }
        } )
        .catch( error => console.error( 'getTimeCardListThunk', error ) )
        .finally( () => { setIsLoading( false ) } );
    } else
    {
        setState( prevState =>
            {
              return { ...prevState, data:[] };
            } );
    }
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
                    <Diversity1Icon />

              </CardIcon>
              <h4 style={{color:"#000"}}>Allocation Rule Set</h4>
                 </JPGrid>
                <JPGrid item xs={6} container alignItems="flex-end" justify="flex-end">
                   <AddAlLocationRuleSet onSave={(result) => {
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
                 <Autocomplete
                                    id="Persons"
                                    getOptionLabel={(option) => `${option.FIRST_NAME} ${option.MIDDLE_NAME} ${option.LAST_NAME}`
                                    }
                                    filterOptions={(x) => x}
                                    options={optionsEmployee}
                                    autoComplete
                                    includeInputInList
                                    filterSelectedOptions
                                    value={valueEmployee}
                                    noOptionsText="No Persons"
                                    onChange={(event, newValue) => {
                                      setOptionsEmployee( newValue ? [ newValue, ...optionsEmployee ] : optionsEmployee );
                                      searchAlLocationRuleSets(newValue?`${newValue.FIRST_NAME} ${newValue.MIDDLE_NAME} ${newValue.LAST_NAME}`:null)
                                      setValueEmployee(newValue);
                                    }}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueEmployee(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Person Name" fullWidth variant="outlined" required />
                                    )}

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
/*Bud Jerrold Whitfield */