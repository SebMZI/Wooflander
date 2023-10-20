import { getProfile, selectCurrentProfile } from "@/features/jobs/jobsSlice";
import { useGetUserProfileQuery } from "@/features/user/userApiSlice";
import Layout from "@/pages/dashboard/Layout";
import Image from "next/image";
import badge from "../../../../assets/new.png";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Commentaries from "@/components/Commentaries";
import Contact from "@/components/Contact";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: userInfo } = useGetUserProfileQuery(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(userInfo));
  }, [userInfo]);
  const userProfile = useSelector(selectCurrentProfile);

  return (
    <Layout>
      <Head>
        <title>
          Wooflander - {userProfile?.name} {userProfile?.lastname}
        </title>
      </Head>
      <main className="main-id-jobs">
        <section className="main-id-jobs-section">
          <div className="overlay"></div>
          <div className="container">
            <h2 className="jobs-title">
              {userProfile?.name} {userProfile?.lastname}{" "}
              {userProfile?.new === true ? (
                <Image src={badge} className="new" />
              ) : null}
            </h2>
            <div className="content">
              <div className="userinfo-content">
                <div className="userinfo">
                  <h3>User Info</h3>
                  <div className="info">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      disabled
                      value={userProfile?.name}
                    />
                    <label htmlFor="lastname">Lastname</label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      disabled
                      value={userProfile?.lastname}
                    />
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      disabled
                      value={userProfile?.username}
                    />
                  </div>
                </div>
                <Contact />
              </div>

              <div className="commentaries">
                <h3>Commentaries</h3>
                <Commentaries />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default index;
