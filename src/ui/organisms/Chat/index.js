import React, { useContext } from 'react';
import * as T from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { db } from 'src/firebase.db';
import { useFirebaseCollection } from 'hooks';
import { AuthContext } from 'context';
import { ChatMessage } from './ui';

const styles = () => ({
  layout: {
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    flex: '0 0 auto',
    marginBottom: '12px'
  },
  messages: {
    flex: '1 1 0',
    paddingRight: '9px',
    overflowY: 'auto'
  },
  sendMessage: {
    marginTop: 'auto',
    flex: '0 0 auto',
  }
});

const propTypes = {
  classes: T.object.isRequired,
};

const Chat = ({ classes }) => {
  const [{ userData }] = useContext(AuthContext);
  const messageHistory = useFirebaseCollection('chat/messages/history', 'createdAt');

  return (
    <div className={classes.layout}>
      <Typography
        className={classes.title}
        component="h1"
        variant="h5"
      >
        Чат
      </Typography>
      <div className={classes.messages}>
        {messageHistory.map(({ text, id, user }, index) => {
          const prevMessage = messageHistory[index - 1];
          const firstUserMessage = !prevMessage || user.id !== prevMessage.user.id;
          return (
            <ChatMessage
              key={id}
              firstUserMessage={firstUserMessage}
              text={text}
              userDocPath={user.path}
            />
          );
        })}
      </div>
      <form
        className={classes.sendMessage}
        onSubmit={(e) => {
          e.preventDefault();
          db.collection('chat/messages/history').add({
            text: e.target.elements[0].value,
            createdAt: new Date(),
            user: db.collection('users').doc(userData.uid)
          });
          e.target.reset();
        }}
      >
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="userMessage">Сообщение</InputLabel>
          <Input
            id="userMessage"
            name="userMessage"
            autoComplete="text"
          />
        </FormControl>
      </form>
    </div>
  );
};

Chat.propTypes = propTypes;

export default withStyles(styles)(Chat);
