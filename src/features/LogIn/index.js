import React, { useContext } from 'react';
import * as T from 'prop-types';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthContext } from 'context';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: `${theme.spacing.unit * 3}px 0`
  },
  submit: {
    marginTop: theme.spacing.unit * 5
  },
  btnIcon: {
    marginLeft: theme.spacing.unit * 3
  },
  authError: {
    marginTop: theme.spacing.unit * 2
  }
});

const propTypes = {
  classes: T.object.isRequired
};

const LogIn = ({ classes }) => {
  const [{ authInProgress, authError }, logIn] = useContext(AuthContext);
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Вход в приложение
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            logIn('email', {
              email: e.target.email.value,
              password: e.target.password.value
            });
          }}
        >
          <TextField
            disabled={authInProgress}
            fullWidth
            id="email"
            label="Логин"
            margin="normal"
            name="email"
          />
          <TextField
            autoComplete="current-password"
            disabled={authInProgress}
            fullWidth
            id="password"
            label="Пароль"
            margin="normal"
            name="password"
            type="password"
          />
          <Button
            disabled={authInProgress}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
        </form>
        <Button
          disabled={authInProgress}
          fullWidth
          color="primary"
          onClick={() => logIn('google')}
        >
          Войти c помощью Google
          <AccountIcon className={classes.btnIcon} />
        </Button>
        {authError && (
          <Typography
            color="error"
            component="p"
            className={classes.authError}
            variant="caption"
          >
            { authError }
          </Typography>
        )}

      </Paper>
    </main>
  );
};

LogIn.propTypes = propTypes;

export default withStyles(styles)(LogIn);
