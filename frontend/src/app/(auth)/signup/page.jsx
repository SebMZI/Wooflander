"use client";
import { useState } from "react";
import styles from "../../page.module.css";
const page = () => {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState();
  const [adress, setAdress] = useState();
  const [roles, setRoles] = useState();

  const handleSub = async (e) => {
    e.preventDefault();

    let pwd;
    let role;
    if (password === confPassword) {
      pwd = password;
    }
    if (roles === "Sitter") {
      role = { Sitter: 4592 };
    } else if (roles === "Client") {
      role = { Client: 2503 };
    }
    console.log(
      "Name: ",
      name,
      "Lastname: ",
      lastname,
      "Username: ",
      username,
      "Email: ",
      email,
      "Tel: ",
      tel,
      "Adress: ",
      adress,
      "Password: ",
      pwd,
      "Roles: ",
      role
    );

    const data = {
      name: name,
      lastname: lastname,
      email: email,
      password: pwd,
      username: username,
      tel: tel,
      adress: adress,
      roles: role,
    };

    const result = await fetch("http://localhost:3500/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(result.json());
  };

  return (
    <div className={styles.main}>
      <form onSubmit={(e) => handleSub(e)} className={styles.container}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          id="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confpassword">Confirm Password</label>
        <input
          type="password"
          id="confpassword"
          onChange={(e) => setConfPassword(e.target.value)}
        />
        <label htmlFor="tel">Tel</label>
        <input
          type="tel"
          name="tel"
          id="tel"
          onChange={(e) => setTel(e.target.value)}
        />
        <label htmlFor="adress">Adress</label>
        <input
          type="text"
          name="adress"
          id="adress"
          onChange={(e) => setAdress(e.target.value)}
        />
        <label htmlFor="roles">Role</label>
        <select id="roles" onChange={(e) => setRoles(e.target.value)}>
          <option value=""></option>
          <option value="Client">Client</option>
          <option value="Sitter">Sitter</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default page;
