import Navbar from "@/components/Navbar";
import { setShowOpen } from "@/features/menu/menuSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const handleScroll = () => {
    setShow(true);
    if (window.scrollY > 10) {
      setShow(false);
      dispatch(setShowOpen(false));
    } else {
      setShow(true);
      dispatch(setShowOpen(true));
    }
  };

  useEffect(() => {
    console.log("Mounted");
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
