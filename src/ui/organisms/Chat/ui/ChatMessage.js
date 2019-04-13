import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useFirebaseDoc } from 'hooks';

const styles = () => ({
  messageLayout: {
    position: 'relative',
    paddingLeft: '39px',
    marginBottom: '9px'
  },
  avatar: {
    position: 'absolute',
    top: '3px',
    left: '0',
    width: '30px',
    height: '30px'
  },
  message: {
    padding: '6px 9px'
  }
});

const propTypes = {
  classes: T.object.isRequired,
  firstUserMessage: T.bool.isRequired,
  text: T.string.isRequired,
  userDocPath: T.string.isRequired
};

const ChatMessage = ({ classes, firstUserMessage, text, userDocPath }) => {
  const author = useFirebaseDoc(userDocPath);

  return (
    <div className={classes.messageLayout}>
      {firstUserMessage && (
        <Avatar
          alt={author.displayName}
          className={classes.avatar}
          src={author.photoURL}
          title={author.displayName}
        />
      )}
      <Paper className={classes.message}>
        {firstUserMessage && (
          <Typography component="p" variant="subtitle2">
            {author.displayName}
          </Typography>
        )}
        <Typography component="p">
          {text}
        </Typography>
      </Paper>
    </div>
  );
};

ChatMessage.propTypes = propTypes;

export default withStyles(styles)(ChatMessage);
