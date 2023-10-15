import { useLoginMutation } from "@/features/auth/authApiSlice";
import { setCredentials } from "@/features/auth/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, {isError}] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const result = await login({username: username, password: password}); 
    console.log(result);
    dispatch(setCredentials({result}));
  };
  return (
    <main>
      <form onSubmit={(e) => handleLogin(e)}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e)=> setPassword(e.target.value)} />
        {isError ? <p>Failed to login!</p> : null}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default index;
