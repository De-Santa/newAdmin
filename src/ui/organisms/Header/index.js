import React, { useContext } from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import QuitIcon from '@material-ui/icons/ExitToApp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AuthContext } from 'context';
import { useFirebaseCollection } from 'hooks';

const styles = () => ({
  header: {
    minHeight: '60px',
    padding: '6px 9px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quitIcon: {
    marginRight: '6px'
  }
});


const propTypes = {
  classes: T.object.isRequired,
  location: T.object.isRequired
};

const Header = ({ classes, location }) => {
  const routes = useFirebaseCollection('routes');
  const logOut = useContext(AuthContext)[2];

  return (
    <AppBar
      classes={{ root: classes.header }}
      color="inherit"
      position="relative"
    >
      <Tabs
        component="nav"
        value={location.pathname}
      >
        { routes.map(({ path, id, label }) => (
          <Tab
            key={id}
            component={Link}
            label={label}
            to={path}
            value={path}
          />
        )) }
      </Tabs>
      <Button onClick={() => { logOut(); }}>
        <QuitIcon className={classes.quitIcon} />
        Выход
      </Button>
    </AppBar>
  );
};

Header.propTypes = propTypes;

export default withRouter(withStyles(styles)(Header));
