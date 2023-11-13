import Image from "next/image";
import React from "react";
import message from "../assets/message-text.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";
import Link from "next/link";

const Contact = ({ user }) => {
  console.log("User Contact", user);
  return (
    <div className="buttons-container">
      <Link href={`mailto:${user?.email}`} className="item">
        <Image src={mail} className="img" alt="To Mail icon" />
      </Link>
      <Link href={`tel:${user?.tel}`} className="item">
        <Image src={phone} className="img" alt="To Phone icon" />
      </Link>
      <Link href={"#"} className="item">
        <Image src={message} className="img" alt="To Message Icon" />
      </Link>
    </div>
  );
};

export default Contact;
