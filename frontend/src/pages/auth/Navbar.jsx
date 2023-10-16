import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="header">
      <h1 className="header-title">WoofLander</h1>
      <nav className="header-nav">
        <ul className="container">
          <li className="item">
            <Link href="/">Home</Link>
          </li>
          <li className="item">
            <Link href="/auth/login">Login</Link>
          </li>
          <li className="item">
            <Link href="/auth/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
