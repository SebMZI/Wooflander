import CardJobs from "@/components/CardJobs";
import {
  selectCurrectRole,
  selectCurrectToken,
} from "@/features/auth/authSlice";
import {
  useGetAllOwnersQuery,
  useGetAllSittersQuery,
} from "@/features/jobs/jobsApiSlice";
import {
  getOwners,
  getSitters,
  selectCurrentSitters,
} from "@/features/jobs/jobsSlice";
import Layout from "@/pages/dashboard/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const { data: sitters } = useGetAllSittersQuery();
  const router = useRouter();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const sittersInfo = useSelector(selectCurrentSitters);
  const sitterFiltered = sittersInfo.filter(
    (sitter) => sitter.isSubActive === true
  );

  useEffect(() => {
    const role = roles ? Object?.values(roles)[0] : null;
    if (!role || role !== 4592 || !token) {
      router.replace("/jobs/sitters");
    }
  }, [roles]);

  useEffect(() => {
    if (sitters) {
      dispatch(getSitters(sitters));
    }
  }, [sitters]);

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
              {sitterFiltered?.map((sitter, index) => (
                <CardJobs key={index} data={sitter} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default index;
