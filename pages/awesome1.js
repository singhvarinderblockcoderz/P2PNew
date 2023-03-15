import React from "react";
import Awesome1 from "../Component/Awesome1";
// import {getSession} from 'next-auth/react'
import Head from "next/head";

const awesome1 = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <Awesome1 />
    </div>
  );
};
export default awesome1;

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
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
