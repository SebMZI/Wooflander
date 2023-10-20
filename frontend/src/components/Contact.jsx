import Image from "next/image";
import React from "react";
import message from "../assets/message-text.svg";
import mail from "../assets/mail.svg";
import phone from "../assets/phone.svg";

const Contact = () => {
  return (
    <div className="buttons-container">
      <div className="item">
        <Image src={mail} className="img" alt="To Mail icon" />
      </div>
      <div className="item">
        <Image src={phone} className="img" alt="To Phone icon" />
      </div>
      <div className="item">
        <Image src={message} className="img" alt="To Message Icon" />
      </div>
    </div>
  );
};

export default Contact;
