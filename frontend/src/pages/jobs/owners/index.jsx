import CardJobs from "@/components/CardJobs";
import {
  selectCurrectRole,
  selectCurrectToken,
} from "@/features/auth/authSlice";
import { useGetAllOwnersQuery } from "@/features/jobs/jobsApiSlice";
import {
  getOwners,
  getSitters,
  selectCurrentOwners,
  selectCurrentSitters,
} from "@/features/jobs/jobsSlice";
import Layout from "@/pages/dashboard/Layout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: owners } = useGetAllOwnersQuery();
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const ownersInfo = useSelector(selectCurrentOwners);

  useEffect(() => {
    const role = roles ? Object?.values(roles)[0] : null;
    if (!role || role !== 2503 || !token) {
      router.replace("/jobs/owners");
    }
  }, [roles]);

  useEffect(() => {
    if (owners) {
      dispatch(getOwners(owners));
    }
  }, [owners]);

  return (
    <Layout>
      <main className="jobs">
        <section className="jobs-section">
          <div className="overlay"></div>
          <div className="container">
            <h4 className="jobs-title">Owners</h4>
            <div className="content">
              {ownersInfo?.map((owner, index) => (
                <CardJobs key={index} data={owner} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default index;
