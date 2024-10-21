// 'use client';

// import { signOut, useSession } from 'next-auth/react';
// import Link from 'next/link';
// import React from 'react';

// const Dashboard = () => {
//   const session = useSession();
//   // console.log("rerender");
  
//   const dto = session?.data?.user;
//   return (
//     <>
//       {session?.data ? (
//         <div>
//           <img src={dto?.image} alt="" />
//           <div>Имя пользователя - {dto?.name} </div>
//           <div>Почта - {dto?.email} </div>
//         </div>
//       ) : (
//         <div>
//           Сперва авторизуйтесь --- <Link href="/api/auth/signin">SignIn</Link>
//         </div>
//       )}
//       {/* {session?.data && <Link href="/profile">Profile</Link>} */}
//       {session?.data ? (
//         <Link href="#" onClick={() => signOut({ callbackUrl: '/' })}>
//           Sign Out
//         </Link>
//       ) : (
//         ''
//         // <Link href="/signin">SignIn</Link>
//       )}
//     </>
//   );
// };

// export default Dashboard;
