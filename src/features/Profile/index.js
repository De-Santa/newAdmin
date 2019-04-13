import React, { memo, useContext } from 'react';
import { UserCard } from 'molecules';
import { AuthContext } from 'context';

const Profile = () => {
  const [{ userData }] = useContext(AuthContext);
  return <UserCard userData={userData} />;
};

export default memo(Profile);
