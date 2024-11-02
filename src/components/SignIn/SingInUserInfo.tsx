import { UserI } from '@interfaces/ProductI';
import React from 'react';

const SingInUserInfo = ({ user }: { user: UserI }) => {
  const { email, password, role } = user;
  return (
    <div>
      <div>Email- {email}</div>
      <div>Password- {password}</div>
      <div>Role- {role}</div>
    </div>
  );
};

export default SingInUserInfo;
