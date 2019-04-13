import React, { Fragment, useContext } from 'react';
import * as T from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthContext } from 'context';
import { UserCard } from 'molecules';
import { UserForm } from 'organisms';
import { useFirebaseDoc } from 'hooks';
import { PENDING, COMPLETE, ERROR } from 'constants/fetchStatus';

const styles = () => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const propTypes = {
  classes: T.object.isRequired
};

const Profile = ({ classes }) => {
  const [{ userData }] = useContext(AuthContext);
  const [userFetchStatus, user] = useFirebaseDoc(`/users/${userData.uid}`);

  console.log('user', user);

  return (
    <Fragment>
      {userFetchStatus === PENDING && (<Fragment>Загрузка...</Fragment>)}
      {userFetchStatus === COMPLETE && (
        <Fragment>
          <UserCard userData={user} />
          <UserForm userData={user} />
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = propTypes;

export default withStyles(styles)(Profile);
