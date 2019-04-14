import React, { useContext } from 'react';
import * as T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { AuthContext } from 'context';

const propTypes = {
  classes: T.object.isRequired,
  children: T.node.isRequired
};

const styles = () => ({
  wrapper: {
    height: '100vh',
  },
  progress: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%'
  }
});

const AuthLayout = ({ classes, children }) => {
  const [{ authorized, authInProgress }] = useContext(AuthContext);
  return (
    authorized
      ? <Redirect to="/app/profile" />
      : (
        <Grid
          className={classes.wrapper}
          component="main"
          container
          direction="column"
          justify="center"
        >
          {authInProgress && (
            <div className={classes.progress}>
              <LinearProgress />
            </div>
          )}
          {authorized
            ? <Redirect to="/app/profile" />
            : children
          }
        </Grid>
      )
  );
};

AuthLayout.propTypes = propTypes;

export default withStyles(styles)(AuthLayout);
