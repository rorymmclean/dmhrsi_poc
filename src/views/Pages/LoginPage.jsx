import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Face from '@material-ui/icons/Face';
import Email from '@material-ui/icons/Email';
// import LockOutline from "@material-ui/icons/LockOutline";
import { CircularProgress, Grid } from '@material-ui/core';
// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import loginPageStyle from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered

    this.state = {
      email: '',
      password: '',
      agreement: '',
      isLoad: false,
      cardAnimaton: 'cardHidden'
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: '' });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  handleChange = (event, name) => {
    event.preventDefault();
    event.persist();
    this.setState({
      [name]: event.target.value
    });
  };
  handleFormSubmit = event => {



    this.setState({
      isLoad: true
    });
    axios
      .post('http://localhost:3005/loginAdmin', {
        email: this.state.email,
        password: this.state.password
      })
      .then(
        response => {
          console.log(response);
          localStorage.setItem(
            'login',
            JSON.stringify({
              login: true,
              store: response.data.accessToken,
              response: response.data
            })
          );

          let store = JSON.parse(localStorage.getItem('login'));
          if (store.login) {
            this.props.history.push('/admin/timeCard');

            this.setState({
              isLoad: false
            });
          }
        },
        error => {
          if (error?.response?.status === 401) {
            this.setState({
              isLoad: false
            });
          }
        }
      );

    // this.props.loginWithEmailAndPassword({ ...this.state });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <Card login className={classes[this.state.cardAnimaton]}>
              <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="primary">
                <h4 className={classes.cardTitle}>Log in</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  value={this.state.email}
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.handleChange(event, 'email'),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  name="password"
                  value={this.state.password}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => this.handleChange(event, 'password'),

                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                      </InputAdornment>
                    ),
                    type: 'password',
                    autoComplete: 'off'
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '20px' }}
                  disabled={this.state.isLoad}
                  onClick={() => {
                    this.handleFormSubmit();
                  }}
                >
                  &nbsp;&nbsp; Log in
                </Button>

              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
