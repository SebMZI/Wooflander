import React, { useEffect } from "react";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentId,
  selectCurrentStripeId,
  setCredentials,
} from "@/features/auth/authSlice";
import { useCheckoutQuery } from "@/features/stripe/stripeApiSlice";
import {
  selectCurrentSessionId,
  setSessionId,
  setSessionUrl,
} from "@/features/stripe/stripeSlice";
import PaymentModal from "@/components/PaymentModal";
import { useParams } from "next/navigation";
import { usePutUserProfileMutation } from "@/features/user/userApiSlice";
import Head from "next/head";
import UserProfile from "@/components/UserProfile";

const index = () => {
  const router = useRouter();
  const { success, session_id } = router.query;
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const userId = useSelector(selectCurrentId);
  const sessionId = useSelector(selectCurrentSessionId);
  const sessId = useSelector(selectCurrentStripeId);
  const dispatch = useDispatch();
  const [putUser] = usePutUserProfileMutation();

  const handleSessionId = async () => {
    const result = await putUser({ userId, sessionId });
    console.log(result);
  };

  useEffect(() => {
    dispatch(setSessionId(session_id));
    handleSessionId();
  }, [session_id]);

  useEffect(() => {
    const role = roles ? Object?.values(roles)[0] : null;
    if (!role || role !== 4592 || !token) {
      router.replace("/");
    }
  }, [roles]);

  return (
    <Layout>
      <Head>
        <title>Wooflander - Dashboard</title>
      </Head>
      <main className="sitter-main">
        <section className="hero">
          {!sessionId && !sessId ? <PaymentModal /> : null}
          <div className="container">
            <h2 className="dash-title">Dashboard</h2>
            <div className="content">
              <div className="nav">
                <button className="link">Profile</button>
              </div>
              <UserProfile />
            </div>
          </div>
          <div className="overlay"></div>
        </section>
      </main>
    </Layout>
  );
};

export default index;
