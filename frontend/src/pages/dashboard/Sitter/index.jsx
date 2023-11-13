import React, { useEffect } from "react";
import Layout from "../../Layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentActiveSub,
  selectCurrentId,
} from "@/features/auth/authSlice";

import PaymentModal from "@/components/PaymentModal";

import Head from "next/head";
import UserProfile from "@/components/UserProfile";

import {
  selectCurrentActive,
  selectCurrentProfilePicture,
  setUserPicture,
} from "@/features/user/userSlice";
import Commentaries from "@/components/Commentaries";
import { useGetProfilePicQuery } from "@/features/user/userApiSlice";
import unknown from "../../../assets/unknown.png";
import Image from "next/image";

const Index = () => {
  const router = useRouter();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const userId = useSelector(selectCurrentId);
  const dispatch = useDispatch();
  const subActive = useSelector(selectCurrentActive);
  const activeSub = useSelector(selectCurrentActiveSub);

  const isActive = activeSub ? activeSub : subActive;

  const { data: profilePic } = useGetProfilePicQuery(userId);

  if (profilePic) {
    dispatch(setUserPicture(profilePic));
  }

  const pic = useSelector(selectCurrentProfilePicture);

  useEffect(() => {
    const role = roles ? Object?.values(roles)[0] : null;
    if (!role || role !== 4592 || !token) {
      dispatch(logout());
      router.replace("/");
    }
  }, [roles, token, router]);
  useEffect(() => {
    if (!userId) {
      dispatch(logout());
      router.replace("/");
    }
  }, [userId]);

  return (
    <Layout>
      <Head>
        <title>Wooflander - Dashboard</title>
      </Head>
      <main className="sitter-main">
        <section className="hero">
          {!isActive ? (
            <PaymentModal />
          ) : (
            <div className="container">
              <div className="sitter-header">
                <Image
                  className="profile-pic"
                  src={pic ?? unknown}
                  alt="picture profile"
                  width={60}
                  height={60}
                />

                <h2 className="dash-title">Dashboard</h2>
              </div>
              <div className="content">
                <div className="nav">
                  <button className="link">Profile</button>
                </div>
                <UserProfile />
                <h3>Commentaries</h3>
                <Commentaries sitter={true} />
              </div>
            </div>
          )}

          <div className="overlay"></div>
        </section>
      </main>
    </Layout>
  );
};

export default Index;
