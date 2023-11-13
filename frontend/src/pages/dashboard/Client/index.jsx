"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilePicQuery } from "../../../features/user/userApiSlice.js";
import {
  logout,
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentId,
} from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import ClientAnimals from "@/components/ClientAnimals";
import UserProfile from "@/components/UserProfile";
import {
  selectCurrentProfilePicture,
  setUserPicture,
} from "@/features/user/userSlice";
import Image from "next/image";
import unknown from "../../../assets/unknown.png";

const Index = () => {
  const router = useRouter();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const userId = useSelector(selectCurrentId);
  const [onPage, setOnPage] = useState("Profile");
  const dispatch = useDispatch();
  const { data: profilePic } = useGetProfilePicQuery(userId);

  if (profilePic) {
    dispatch(setUserPicture(profilePic));
  }

  const pic = useSelector(selectCurrentProfilePicture);

  useEffect(() => {
    const role = roles ? Object?.values(roles)[0] : null;
    if (!role || role !== 2503 || !token) {
      router.replace("/");
    }
  }, [roles, router, token]);

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
      <main className="client">
        <section className="client-section">
          <div className="container">
            <div className="client-header">
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
                <button className="link" onClick={() => setOnPage("Profile")}>
                  Profile
                </button>
                <button className="link" onClick={() => setOnPage("Animals")}>
                  Animals
                </button>
              </div>
              {onPage === "Animals" && <ClientAnimals />}
              {onPage === "Profile" && <UserProfile />}
            </div>
          </div>
          <div className="overlay"></div>
        </section>
      </main>
    </Layout>
  );
};

export default Index;
