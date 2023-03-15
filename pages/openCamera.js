import React from "react";
import OpenCamera from "../Component/OpenCamera";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const openCamera = () => {
  return (
    <div>
      <Head>
        <title>Open Camera</title>
      </Head>

      <OpenCamera />
    </div>
  );
};
export default openCamera;

// export async function getServerSideProps(context) {
//   conTabsession = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destiTabson: "/dashboard",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }
