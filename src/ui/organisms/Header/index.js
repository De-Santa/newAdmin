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

const MENU_LINKS = [
  { label: 'Администрирование', path: '/app/admin' },
  { label: 'Личный кабинет', path: '/app/profile' }
];

const styles = () => ({
  header: {
    minHeight: '60px',
    padding: '6px 30px',
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
  const [, , logOut] = useContext(AuthContext);

  return (
    <AppBar
      classes={{ root: classes.header }}
      color="inherit"
      position="relative"
    >
      <Tabs
        component="nav"
        indicatorColor="primary"
        value={location.pathname}
      >
        { MENU_LINKS.map(({ path, label }) => (
          <Tab
            key={path}
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
