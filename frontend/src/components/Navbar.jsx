import { logout, selectCurrectRole } from "@/features/auth/authSlice";
import {
  delSession,
  selectCurrentSessionId,
} from "@/features/stripe/stripeSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const roles = useSelector(selectCurrectRole);
  const sessionID = useSelector(selectCurrentSessionId);
  const router = useRouter();
  console.log(roles);
  if (!roles) {
    router.replace("/");
  }
  const role = roles ? Object.values(roles)[0] : null;
  console.log(role);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <h1 className="header-title">WoofLander</h1>
      <nav className="header-nav">
        <ul className="container">
          {!role && (
            <>
              <li>
                <Link className="item" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="item" href="/auth/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="item" href="/auth/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
          {role === 2503 ? (
            <>
              <li>
                <Link className="item" href="/dashboard/client">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="item" href="/jobs/sitters">
                  Sitters
                </Link>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(delSession());
                  }}
                >
                  LogOut
                </button>
              </li>
            </>
          ) : null}

          {role === 4592 && sessionID && (
            <>
              <li>
                <Link className="item" href="/dashboard/Sitter">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="item" href="/jobs/owners">
                  Owners
                </Link>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(delSession());
                  }}
                >
                  LogOut
                </button>
              </li>
            </>
          )}
          {!sessionID && <></>}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
