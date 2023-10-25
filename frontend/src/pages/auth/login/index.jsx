import { useLoginMutation } from "@/features/auth/authApiSlice";
import Head from "next/head";
import {
  selectCurrectRole,
  selectCurrectToken,
  setCredentials,
} from "@/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError }] = useLoginMutation();
  const currentRole = useSelector(selectCurrectRole);
  const token = useSelector(selectCurrectToken);
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    if (!username || !password) {
      return setMsg("All fields are required");
    }

    try {
      const result = await login({ username: username, password: password });
      console.log(result);
      dispatch(setCredentials({ result }));
      if (token) {
        if (currentRole === 2503) {
          router.replace("/dashboard/Client");
        } else if (currentRole === 4592) {
          router.replace("/dashboard/Sitter ");
        }
      }
    } catch (err) {
      console.log(err);
      return setMsg(err.message);
    }
  };

  useEffect(() => {
    console.log("token: ", token, "Roles: ", currentRole);
    const roleValue = currentRole ? Object.values(currentRole)[0] : null;
    if (token) {
      if (roleValue === 2503) {
        router.push("/dashboard/Client");
      } else if (roleValue === 4592) {
        router.push("/dashboard/Sitter ");
      }
    }
  }, [token, currentRole]);

  return (
    <>
      <Head>
        <title>Wooflander - Login</title>
        <meta name="description" content="WoofLander - Login" />
      </Head>
      <main className="auth-main">
        <div className="auth-bg"></div>
        <div className="auth-content login-content">
          <h2>LOGIN</h2>
          <form onSubmit={(e) => handleLogin(e)} className="form form-login">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {msg && <p>{msg}</p>}
            <button type="submit" className="btn btn-solid">
              Submit
            </button>
          </form>
          <div className="auth-nav">
            <Link href="/">Home</Link>
            <Link href="/auth/signup">Signup</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default index;
