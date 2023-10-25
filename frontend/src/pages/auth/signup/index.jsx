import { useSignupMutation } from "@/features/auth/authApiSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";

const index = () => {
  const [signup, { isError }] = useSignupMutation();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [role, setRole] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const router = useRouter();

  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !lastname ||
      !email ||
      !tel ||
      !address ||
      !role ||
      !pwd ||
      !username ||
      !confPwd ||
      !city ||
      !state
    ) {
      return setMsg("All fields are required");
    }

    let roles;
    let password;
    if (role === "Client") {
      roles = {
        Client: 2503,
      };
    } else if (role === "Sitter") {
      roles = {
        Sitter: 4592,
      };
    }
    if (pwd === confPwd) {
      password = pwd;
    } else {
      return setMsg("Passwords not matching !");
    }
    try {
      const result = await signup({
        name,
        lastname,
        email,
        tel,
        adress: address,
        city: city,
        state: state,
        roles,
        password,
        username,
      });
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Wooflander - Signup</title>
      </Head>

      <main className="auth-main">
        <div className="signup-bg"></div>
        <div className="auth-content signup-content">
          <h2>Signup</h2>
          <form onSubmit={(e) => handleSignup(e)} className="form form-signup">
            <div className="inp-content">
              <div className="items">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pwd">Password</label>
                  <input
                    type="password"
                    name="pwd"
                    id="pwd"
                    onChange={(e) => setPwd(e.target.value)}
                  />
                </div>
              </div>
              <div className="items">
                <div>
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    type="text"
                    id="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>

                <div className="item">
                  <label htmlFor="tel">Tel</label>
                  <input
                    type="tel"
                    id="tel"
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>
                <div className="item">
                  <label htmlFor="roles">Role</label>
                  <select
                    name="roles"
                    id="roles"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="Client">Client</option>
                    <option value="Sitter">Sitter</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="confPwd">Confirm Password</label>
                  <input
                    type="password"
                    name="confPwd"
                    id="confPwd"
                    onChange={(e) => setConfPwd(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="inp-content-2">
              <div className="item">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="item">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="item">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <p>{msg}</p>
            <button type="submit" className="btn btn-solid">
              Signup
            </button>
          </form>
          <div className="auth-nav">
            <Link href="/">Home</Link>
            <Link href="/auth/login">Login</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default index;
