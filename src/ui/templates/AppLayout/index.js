import React, { useContext } from 'react';
import * as T from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Chat, Header } from 'organisms';
import { AuthContext } from 'context';

const propTypes = {
  classes: T.object.isRequired,
  children: T.node.isRequired
};

const styles = (theme) => ({
  layoutGrid: {
    minHeight: '100vh',
    padding: '15px 30px 30px',
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 500px)',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    gridTemplateAreas: `
      'hdr hdr'
      'cnt cht'
    `,
    gridGap: '12px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'minmax(320px, 1fr)',
      gridTemplateRows: 'auto minmax(300px, 1fr) 250px',
      gridTemplateAreas: `
      'hdr'
      'cht'
      'cnt'
    `
    }
  },
  headerArea: {
    gridArea: 'hdr',
    [theme.breakpoints.down('sm')]: {
      // alignSelf: 'start'
    }
  },
  contentArea: {
    gridArea: 'cnt',
    position: 'relative'
  },
  chatArea: {
    gridArea: 'cht'
  },
  paper: {
    height: '100%',
    overflow: 'auto',
    padding: '15px 30px'
  }
});

const AppLayout = ({ classes, children }) => {
  const [{ authorized }] = useContext(AuthContext);

  return (
    authorized
      ? (
        <main className={classes.layoutGrid}>
          <div className={classes.headerArea}>
            <Header />
          </div>
          <div className={classes.contentArea}>
            <Paper className={classes.paper}>
              {children}
            </Paper>
          </div>
          <aside className={classes.chatArea}>
            <Paper className={classes.paper}>
              <Chat />
            </Paper>
          </aside>
        </main>
      )
      : <Redirect to="/auth/login" />
  );
};

AppLayout.propTypes = propTypes;

export default withStyles(styles)(AppLayout);
