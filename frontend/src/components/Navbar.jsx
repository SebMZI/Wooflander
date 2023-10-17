import { selectCurrectRole } from "@/features/auth/authSlice";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const roles = useSelector(selectCurrectRole);
  console.log(roles);
  const role = Object.values(roles)[0];
  console.log(role);
  return (
    <header className="header">
      <h1 className="header-title">WoofLander</h1>
      <nav className="header-nav">
        <ul className="container">
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
                <button className="logout-btn" href="#">
                  LogOut
                </button>
              </li>
            </>
          ) : (
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
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
