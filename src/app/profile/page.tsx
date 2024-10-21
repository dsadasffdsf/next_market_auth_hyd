
import ProfileMain from '@components/Profile/ProfileMain';
import { authConfig } from '@configs/auth';

import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default async function Page() {
  const session = await getServerSession(authConfig);

  
  console.log(session);
  // картинка не появляется при первом рендере
  return (
    <>
      
      <ProfileMain session={session}/>
    </>
  );
}
