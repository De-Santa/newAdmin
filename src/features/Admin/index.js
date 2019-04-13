import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useFirebaseCollection } from 'hooks';

const propTypes = {
  classes: T.object.isRequired,
};

const styles = () => ({

});

const Admin = ({ classes }) => {
  const users = useFirebaseCollection('users');
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Имя пользователя</TableCell>
          <TableCell>Идентификатор</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Аватар</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.displayName}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Admin.propTypes = propTypes;

export default withStyles(styles)(Admin);
