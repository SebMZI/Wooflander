import React, { useEffect } from "react";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentId,
} from "@/features/auth/authSlice";
import { useCheckoutQuery } from "@/features/stripe/stripeApiSlice";
import {
  selectCurrentSessionId,
  setSessionId,
  setSessionUrl,
} from "@/features/stripe/stripeSlice";
import PaymentModal from "@/components/PaymentModal";
import { useParams } from "next/navigation";

const index = () => {
  const router = useRouter();
  const { success, session_id } = router.query;
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const userId = useSelector(selectCurrentId);
  const sessionID = useSelector(selectCurrentSessionId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSessionId(session_id));
  }, [session_id]);

  useEffect(() => {
    const role = roles ? Object?.values(roles)[0] : null;
    if (!role || role !== 4592 || !token) {
      router.replace("/");
    }
  }, [roles]);

  return (
    <Layout>
      <main>{!sessionID && <PaymentModal />}</main>
    </Layout>
  );
};

export default index;
