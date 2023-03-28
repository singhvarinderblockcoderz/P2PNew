import React from "react";
// import {getSession} from 'next-auth/react'
import Head from "next/head";
import Incentive from "../Component/Incentive";

const ewallet = () => {
  return (
    <div>
      <Head>
        <title>Get Started</title>
      </Head>

      <Incentive />
    </div>
  );
};
export default ewallet;

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
