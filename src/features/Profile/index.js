import React, { Fragment, useContext, useEffect } from 'react';
import * as T from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthContext } from 'context';
import { UserCard } from 'molecules';
import { UserForm } from 'organisms';
import { useFirebaseDoc } from 'hooks';
import { PENDING, COMPLETE } from 'constants/fetchStatus';

const styles = () => ({
  profileLayout: {
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit'
  }
});

const propTypes = {
  classes: T.object.isRequired
};

const Profile = ({ classes }) => {
  const [{ userData }] = useContext(AuthContext);
  const [userFetchStatus, fetchUser, user] = useFirebaseDoc(`/users/${userData.uid}`);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  return (
    <Fragment>
      {userFetchStatus === PENDING && (<Fragment>Загрузка...</Fragment>)}
      {userFetchStatus === COMPLETE && (
        <div className={classes.profileLayout}>
          <UserCard
            style={{ flex: '0 0 auto' }}
            fetchUser={fetchUser}
            userData={user}
          />
          <UserForm
            onSubmitComplete={() => { fetchUser(); }}
            style={{ flex: '1 1 0' }}
            userData={user}
          />
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = propTypes;

export default withStyles(styles)(Profile);
