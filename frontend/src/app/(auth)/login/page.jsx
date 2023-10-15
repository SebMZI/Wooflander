"use client"
import { useState } from "react";
import styles from "../../page.module.css";
const page = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();


  const handleLog = async (e)=>{
    e.preventDefault()


    const data = {
      username: username,
      password : password
    }
    console.log(data);
    const result = await fetch("http://localhost:3500/user/login", {
      method: 'POST',
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const response = await result.json()
    console.log(response);
  }

  return (
    <div className={styles.main}>
      <form className={styles.container} onSubmit={(e) => handleLog(e)}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e)=> setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default page;
