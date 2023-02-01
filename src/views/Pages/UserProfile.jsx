import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';

// @material-ui/icons
import PermIdentity from '@material-ui/icons/PermIdentity';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Clearfix from 'components/Clearfix/Clearfix.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';

import userProfileStyles from 'assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx';

import avatar from 'assets/img/faces/account.png';

function UserProfile(props) {
  const uploadInputRef = React.useRef(null);

  const { classes } = props;
  const user = JSON.parse(localStorage.getItem('login'))?.response;

  const handleFileInput = e => {
    const file = e.target.files[0];

    if (file.size > 1024) {
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      axios
        .post('http://localhost:3005/upload', formData, config)
        .then(response => { })
        .catch(error => { });
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <PermIdentity />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Profile</h4>
            </CardHeader>
            <CardBody>
              <CardAvatar profile>
                <input
                  ref={uploadInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileInput}
                />
                <span
                /*onClick={e => {
                    e.preventDefault();
                    uploadInputRef.current && uploadInputRef.current.click();
                  }}*/
                >
                  <img src={avatar} alt="..." style={{ background: "#26c6da" }} />
                </span>
              </CardAvatar>
              <CardBody profile>
                <h3 className={classes.cardCategory}>{user.username}</h3>
              </CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email (disabled)"
                    id="username"
                    defaultValue={user.email}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone Number (disabled)"
                    id="first-name"
                    defaultValue={user.phone}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
              </GridContainer>

              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(userProfileStyles)(UserProfile);
