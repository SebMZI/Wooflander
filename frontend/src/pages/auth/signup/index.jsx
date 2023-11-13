import { useSignupMutation } from "@/features/auth/authApiSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const Index = () => {
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
  const [certificate, setCertificate] = useState();
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

    console.log(
      name,
      lastname,
      email,
      tel,
      address,
      role,
      pwd,
      username,
      city,
      state
    );

    if (role === "Sitter" && !certificate) {
      return setMsg("Please upload your certificate");
    }

    let password;

    if (pwd === confPwd) {
      password = pwd;
    } else {
      return setMsg("Passwords not matching !");
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("adress", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("roles", role);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("image", certificate);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const result = await signup(formData);
      console.log(result);
      if (result?.error?.status === 400) {
        return setMsg(result?.error?.data?.message);
      }
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  }, [msg]);

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
                  <label htmlFor="name">
                    Name <span className="mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="username">
                    Username <span className="mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">
                    Email <span className="mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pwd">
                    Password <span className="mandatory">*</span>
                  </label>
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
                  <label htmlFor="lastname">
                    Lastname <span className="mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>

                <div className="item">
                  <label htmlFor="tel">
                    Tel <span className="mandatory">*</span>
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>
                <div className="item">
                  <label htmlFor="roles">
                    Role <span className="mandatory">*</span>
                  </label>
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
                  <label htmlFor="confPwd">
                    Confirm Password <span className="mandatory">*</span>
                  </label>
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
                <label htmlFor="address">
                  Address <span className="mandatory">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="item">
                <label htmlFor="city">
                  City <span className="mandatory">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="item">
                <label htmlFor="state">
                  State <span className="mandatory">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            {role === "Sitter" && (
              <div className="item">
                <label htmlFor="certificate" className="cert-label">
                  ACACED Certificate <span className="mandatory">*</span>
                </label>
                <input
                  type="file"
                  name="certificate"
                  id="certificate"
                  accept=".pdf, .docx, .doc"
                  className="cert-inp"
                  onChange={(e) => setCertificate(e.target.files[0])}
                />
              </div>
            )}
            <p className="msg">{msg}</p>
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

export default Index;
