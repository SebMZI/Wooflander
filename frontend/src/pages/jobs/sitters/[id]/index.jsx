import { getProfile, selectCurrentProfile } from "@/features/jobs/jobsSlice";
import { useGetUserProfileQuery } from "@/features/user/userApiSlice";
import Layout from "@/pages/Layout";
import Image from "next/image";
import badge from "../../../../assets/new.png";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Commentaries from "@/components/Commentaries";
import Contact from "@/components/Contact";
import {
  logout,
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentId,
} from "@/features/auth/authSlice";
import { useGetSitterPdfsQuery } from "@/features/jobs/jobsApiSlice";
import arrow from "../../../../assets/back.svg";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const userId = useSelector(selectCurrentId);
  const { id } = router.query;
  const { data: userInfo } = useGetUserProfileQuery(id);
  const dispatch = useDispatch();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);

  const role = roles ? Object?.values(roles)[0] : null;
  useEffect(() => {
    if (!role || role !== 2503 || !token) {
      dispatch(logout());
      router.replace("/");
    }
  }, [role, router, token]);

  useEffect(() => {
    if (!userId) {
      dispatch(logout());
      router.replace("/");
    }
  }, [userId]);

  useEffect(() => {
    dispatch(getProfile(userInfo));
  }, [userInfo, dispatch]);
  const userProfile = useSelector(selectCurrentProfile);
  const profileRole = userProfile?.roles
    ? Object.values(userProfile?.roles)[0]
    : null;
  console.log(profileRole);

  console.log(userProfile?._id);
  const { data: sitterPdf } = useGetSitterPdfsQuery(userProfile?._id);
  console.log(sitterPdf);

  return (
    <Layout>
      <Head>
        <title>
          Wooflander - {userProfile?.name} {userProfile?.lastname}
        </title>
        <script
          src="https://kit.fontawesome.com/2a4ae6f608.js"
          crossorigin="anonymous"
          async
        ></script>
      </Head>
      <main className="main-id-jobs">
        <section className="main-id-jobs-section">
          <div className="overlay"></div>
          <div className="container">
            <h2 className="jobs-title">
              <Link href="/jobs/sitters">
                <Image
                  src={arrow}
                  alt="arrow back return"
                  className="arrow-return"
                />
              </Link>
              {userProfile?.name} {userProfile?.lastname}{" "}
              {userProfile?.new === true ? (
                <Image src={badge} className="new" alt="new" />
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
                    {profileRole === 4592 && (
                      <a href={sitterPdf?.pdfLink} target="_blank">
                        <i className="fa-solid fa-download"></i>
                        Download Certificate
                      </a>
                    )}
                  </div>
                </div>
                <Contact user={userProfile} />
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

export default Index;
