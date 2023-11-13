import CardJobs from "@/components/CardJobs";
import {
  logout,
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentId,
} from "@/features/auth/authSlice";
import { useGetAllOwnersQuery } from "@/features/jobs/jobsApiSlice";
import { getOwners, selectCurrentOwners } from "@/features/jobs/jobsSlice";
import Layout from "@/pages/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "@/components/FilterBar";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: owners } = useGetAllOwnersQuery();
  const userId = useSelector(selectCurrentId);
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const ownersInfo = useSelector(selectCurrentOwners);
  const ownersFiltered = ownersInfo.filter((owner) => owner.animals.length > 0);
  let ownersToFilter = ownersFiltered;
  console.log(ownersFiltered);

  const [city, setCity] = useState();
  const [state, setState] = useState();

  console.log("State: ", state, "City: ", city);

  if (state) {
    ownersToFilter = ownersToFilter.filter((owner) => owner.state === state);
  }

  if (city) {
    ownersToFilter = ownersToFilter.filter((owner) => owner.city === city);
  }

  if (state && city) {
    ownersToFilter = ownersToFilter.filter((owner) => owner.state === state);
    ownersToFilter = ownersToFilter.filter((owner) => owner.city === city);
  }

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

  useEffect(() => {
    if (owners) {
      dispatch(getOwners(owners));
    }
  }, [owners, dispatch]);

  return (
    <Layout>
      <Head>
        <title>Wooflander - Jobs</title>
      </Head>
      <main className="jobs">
        <section className="jobs-section">
          <div className="overlay"></div>
          <div className="container">
            <h4 className="jobs-title">Owners</h4>
            <div className="content">
              <FilterBar
                setCity={setCity}
                setState={setState}
                users={ownersFiltered}
              />
              <div className="jobs-content">
                {ownersToFilter.length <= 0 && (
                  <p className="no-show">No Owner to show!</p>
                )}
                {ownersToFilter?.map((owner, index) => (
                  <CardJobs key={index} data={owner} />
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
