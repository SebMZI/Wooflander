"use client";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import {
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentId,
} from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import ClientAnimals from "@/components/ClientAnimals";
import UserProfile from "@/components/userProfile";

const index = () => {
  const router = useRouter();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const userId = useSelector(selectCurrentId);
  const [onPage, setOnPage] = useState("Profile");

  console.log(userId);

  useEffect(() => {
    const role = Object?.values(roles)[0];
    if (!role || role !== 2503 || !token) {
      router.replace("/");
    }
  }, [roles]);

  return (
    <Layout>
      <main className="client">
        <section className="client-section">
          <div className="container">
            <h2 className="dash-title">Dashboard</h2>
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

export default index;
