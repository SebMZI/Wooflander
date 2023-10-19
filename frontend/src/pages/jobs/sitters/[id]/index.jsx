import { useGetUserProfileQuery } from "@/features/user/userApiSlice";
import Layout from "@/pages/dashboard/Layout";
import { useRouter } from "next/router";

import React from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: userInfo } = useGetUserProfileQuery(id);
  console.log(userInfo);
  console.log(id);
  return (
    <Layout>
      <main>index</main>;
    </Layout>
  );
};

export default index;
