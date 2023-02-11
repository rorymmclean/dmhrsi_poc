import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// @material-ui/core components
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import Place from '@material-ui/icons/Place';
import ArtTrack from '@material-ui/icons/ArtTrack';
import Language from '@material-ui/icons/Language';
import ConfirmationNumber from '@material-ui/icons/ConfirmationNumber';
import Group from '@material-ui/icons/Group';
import AlignVerticalBottom from '@material-ui/icons/Store';
import WorkIcon from '@material-ui/icons/Work';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Danger from 'components/Typography/Danger.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import DateRangeIcon from '@material-ui/icons/DateRange';

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle';

import priceImage1 from 'assets/img/card-2.jpeg';
import postjobs from 'assets/img/faces/postjobs.JPG';

import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { ThunkDispatch } from 'thunk-dispatch';
import { useEffect } from 'react';

const useStyle = makeStyles(dashboardStyle);

function Dashboard() {
  const classes = useStyle();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    {/*ThunkDispatch(getCountThunk())
      .then(result => {
        setData(result.data)

      })
      .catch(error => console.error('getCountThunk', error))
    .finally(() => { setIsLoading(false) });*/}
  }, []);

  return (
    <div>
      {!isLoading ? <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Group />
              </CardIcon>
              <p className={classes.cardCategory}>Number Of Users</p>
              <h3 className={classes.cardTitle}>
                {data.users || 0} <small>Users</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <LocalOffer />
                </Danger>
                <Link to={`/admin/users`}>More details</Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <WorkIcon></WorkIcon>

              </CardIcon>
              <p className={classes.cardCategory}>Number Of Album</p>
              <h3 className={classes.cardTitle}>
                {' '}
                {data.album || 0} <small>Albums</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <LocalOffer />
                </Danger>
                <Link to={`/admin/album`}>More details</Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Language />
              </CardIcon>
              <p className={classes.cardCategory}>Number Of Story</p>
              <h3 className={classes.cardTitle}>
                {data.story || 0} <small>Storys</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <LocalOffer />
                </Danger>
                <Link to={`/admin/album`}>More details</Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> : <Grid
        container
        justify="center"
        alignItems="center"
        style={{
          minHeight: 400
        }}      >
        <CircularProgress size={35}></CircularProgress>
      </Grid>}
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
