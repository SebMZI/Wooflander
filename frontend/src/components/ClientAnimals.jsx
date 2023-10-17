import React from "react";
import CardAnimals from "./CardAnimals";

const ClientAnimals = () => {
  return (
    <div className="client-animals">
      <button className="btn btn-solid">+ Add Animals</button>
      <div className="animals-container">
        <CardAnimals />
        <CardAnimals />
        <CardAnimals />
        <CardAnimals />
        <CardAnimals />
      </div>
    </div>
  );
};

export default ClientAnimals;
