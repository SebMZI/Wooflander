"use client";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import {
  selectCurrectRole,
  selectCurrectToken,
} from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import ClientAnimals from "@/components/ClientAnimals";

const index = () => {
  const router = useRouter();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const [onPage, setOnPage] = useState();

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
            <h2>Dashboard</h2>
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
            </div>
          </div>
          <div className="overlay"></div>
        </section>
      </main>
    </Layout>
  );
};

export default index;
