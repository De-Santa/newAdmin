import React, { Fragment, useContext, useEffect } from 'react';
// import * as T from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthContext } from 'context';
import { UserCard } from 'molecules';
import { UserForm } from 'organisms';
import { useFirebaseDoc } from 'hooks';
import { PENDING, COMPLETE } from 'constants/fetchStatus';

const styles = () => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const propTypes = {
  // classes: T.object.isRequired
};

const Profile = () => {
  const [{ userData }] = useContext(AuthContext);
  const [userFetchStatus, fetchUser, user] = useFirebaseDoc(`/users/${userData.uid}`);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  return (
    <Fragment>
      {userFetchStatus === PENDING && (<Fragment>Загрузка...</Fragment>)}
      {userFetchStatus === COMPLETE && (
        <Fragment>
          <UserCard
            userData={user}
            fetchUser={fetchUser}
          />
          <UserForm
            onSubmitComplete={() => { fetchUser(); }}
            userData={user}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = propTypes;

export default withStyles(styles)(Profile);
