import {
  logout,
  selectCurrectRole,
  selectCurrectToken,
  selectCurrentActiveSub,
  selectCurrentStripeId,
} from "@/features/auth/authSlice";
import {
  delSession,
  selectCurrentSessionId,
} from "@/features/stripe/stripeSlice";
import { selectCurrentActive } from "@/features/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import menu from "@/assets/menu.svg";
import Image from "next/image";
import { selectShowOpen, setShowOpen } from "@/features/menu/menuSlice";

const Navbar = () => {
  const roles = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const sessionID = useSelector(selectCurrentSessionId);
  const sessId = useSelector(selectCurrentStripeId);
  const router = useRouter();
  const menuShow = useSelector(selectShowOpen);
  const subActive = useSelector(selectCurrentActive);
  const activeSub = useSelector(selectCurrentActiveSub);

  const isSubActive = activeSub ? activeSub : subActive;
  const tcu = router.asPath === "/tcu";

  useEffect(() => {
    if (tcu) {
      return;
    }
    if (!roles) {
      router.replace("/");
    }
  }, [roles, router]);

  const role = roles ? Object.values(roles)[0] : null;

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
    dispatch(setShowOpen(true));
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <header
        className={`header header-${
          menuOpen ? "" : isHomePage ? "" : menuShow ? "up" : "down"
        }`}
      >
        <h1 className="header-title">
          <Link href={"/"}>WoofLander</Link>
        </h1>
        <nav className={`header-nav ${menuOpen ? "visible" : "hidden"}`}>
          <ul className="container">
            {!role && (
              <ul className="container">
                <li>
                  <Link className="item" href="/" onClick={() => handleMenu()}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="item"
                    href="/auth/login"
                    onClick={() => handleMenu()}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="item"
                    href="/auth/signup"
                    onClick={() => handleMenu()}
                  >
                    Signup
                  </Link>
                </li>
              </ul>
            )}

            {role === 2503 && token && (
              <>
                <li>
                  <Link
                    className="item"
                    href="/dashboard/Client"
                    onClick={() => handleMenu()}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="item"
                    href="/jobs/sitters"
                    onClick={() => handleMenu()}
                  >
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
            )}

            {role === 4592 && isSubActive && token ? (
              <>
                <li>
                  <Link
                    className="item"
                    href="/dashboard/Sitter"
                    onClick={() => handleMenu()}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="item"
                    href="/jobs/owners"
                    onClick={() => handleMenu()}
                  >
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
            ) : null}
            {role === 4592 && !isSubActive && token ? (
              <>
                <li>
                  <button
                    className="logout-btn"
                    onClick={() => {
                      dispatch(logout());
                      dispatch(delSession());
                      () => handleMenu()();
                    }}
                  >
                    LogOut
                  </button>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
        <Image
          src={menu}
          className={`logoMenu`}
          alt="menu logo"
          onClick={() => handleMenu()}
        />
      </header>
    </>
  );
};

export default Navbar;
