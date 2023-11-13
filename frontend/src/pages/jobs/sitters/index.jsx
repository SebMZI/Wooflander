import CardJobs from "@/components/CardJobs";
import {
  logout,
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentId,
} from "@/features/auth/authSlice";
import { useGetAllSittersQuery } from "@/features/jobs/jobsApiSlice";
import { getSitters, selectCurrentSitters } from "@/features/jobs/jobsSlice";
import Layout from "@/pages/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "@/components/FilterBar";

const Index = () => {
  const dispatch = useDispatch();
  const { data: sitters } = useGetAllSittersQuery();
  const userId = useSelector(selectCurrentId);
  const router = useRouter();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const sittersInfo = useSelector(selectCurrentSitters);
  const sitterFiltered = sittersInfo.filter(
    (sitter) => sitter.isSubActive === true
  );
  let sittersToFilter = sitterFiltered;
  console.log(sitterFiltered);

  const [city, setCity] = useState();
  const [state, setState] = useState();

  console.log("State: ", state, "City: ", city);

  if (state) {
    sittersToFilter = sittersToFilter.filter(
      (sitter) => sitter.state === state
    );
  }

  if (city) {
    sittersToFilter = sittersToFilter.filter((sitter) => sitter.city === city);
  }

  if (state && city) {
    sittersToFilter = sittersToFilter.filter(
      (sitter) => sitter.state === state
    );
    sittersToFilter = sittersToFilter.filter((sitter) => sitter.city === city);
  }

  useEffect(() => {
    const role = roles ? Object?.values(roles)[0] : null;
    if (!role || role !== 2503 || !token) {
      dispatch(logout());
      router.replace("/");
    }
  }, [roles, router, token]);

  useEffect(() => {
    if (!userId) {
      dispatch(logout());
      router.replace("/");
    }
  }, [userId]);

  useEffect(() => {
    if (sitters) {
      dispatch(getSitters(sitters));
    }
  }, [sitters, dispatch]);

  return (
    <Layout>
      <Head>
        <title>Wooflander - Jobs</title>
      </Head>
      <main className="jobs">
        <section className="jobs-section">
          <div className="overlay"></div>
          <div className="container">
            <h4 className="jobs-title">Sitters</h4>
            <div className="content">
              <FilterBar
                setCity={setCity}
                setState={setState}
                users={sitterFiltered}
              />
              <div className="jobs-content">
                {sittersToFilter.length <= 0 && <p>No Sitter to show!</p>}
                {sittersToFilter?.map((sitter, index) => (
                  <CardJobs key={index} data={sitter} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Index;
