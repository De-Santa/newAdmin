import React, { useRef, useCallback } from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { storage, db } from '../../../firebase.db';

const styles = () => ({
  card: {
    display: 'flex',
    boxShadow: 'none'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  avatar: {
    width: 100,
  },
  hidden: {
    display: 'none'
  }

});

const propTypes = {
  classes: T.object.isRequired,
  fetchUser: T.func.isRequired,
  userData: T.shape({
    displayName: T.string.isRequired,
    email: T.string.isRequired,
    photoURL: T.string.isRequired
  }).isRequired
};

const UserCard = ({ classes, fetchUser, userData }) => {
  const { displayName, email, photoURL, uid } = userData;
  const inputUploadRef = useRef();

  const handleFileUpload = useCallback(
    (event, file) => {
      if (file) {
        const storageRef = storage.ref();
        const uploadTask = storageRef.child(file.name);

        uploadTask
          .put(file)
          .on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {},
          () => {
            uploadTask.getDownloadURL().then((downloadURL) => {
              db.collection('users').doc(uid).update({ photoURL: downloadURL })
                .then(() => {
                  fetchUser();
                });
            });
          });
      }
    },
    [photoURL, uid]
  );

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {displayName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {email}
          </Typography>
        </CardContent>
        <div className={classes.content} />
      </div>
      <CardMedia
        onClick={() => inputUploadRef.current.click()}
        className={classes.avatar}
        image={photoURL}
        title={displayName}
      />
      <input
        className={classes.hidden}
        ref={inputUploadRef}
        type="file"
        accept=".png,.jpg,.webp"
        onChange={() => handleFileUpload(event, inputUploadRef.current.files[0])}
      />
    </Card>
  );
};

UserCard.propTypes = propTypes;

export default withStyles(styles)(UserCard);
