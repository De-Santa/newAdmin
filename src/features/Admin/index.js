import React from 'react';
// import * as T from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useFirebaseCollection } from 'hooks';

const Admin = () => {
  const users = useFirebaseCollection('users');
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Аватар</TableCell>
          <TableCell>Имя пользователя</TableCell>
          <TableCell>Идентификатор</TableCell>
          <TableCell>Пол</TableCell>
          <TableCell>Возраст</TableCell>
          <TableCell>Страна</TableCell>
          <TableCell>Валюта</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Увлечения</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </TableCell>
            <TableCell>{user.displayName}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.sex}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.currency}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.hobbies}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Admin.propTypes = propTypes;

export default Admin;
