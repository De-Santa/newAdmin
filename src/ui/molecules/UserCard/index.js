import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
  }
});

const propTypes = {
  classes: T.object.isRequired,
  userData: T.shape({
    displayName: T.string.isRequired,
    email: T.string.isRequired,
    emailVerified: T.bool.isRequired,
    photoURL: T.string.isRequired
  }).isRequired
};

const UserCard = ({ classes, userData }) => {
  const { displayName, email, photoURL } = userData;
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
        className={classes.avatar}
        image={photoURL}
        title={displayName}
      />
    </Card>
  );
};

UserCard.propTypes = propTypes;

export default withStyles(styles)(UserCard);
