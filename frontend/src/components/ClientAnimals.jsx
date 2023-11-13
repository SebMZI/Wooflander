import React, { useEffect, useState } from "react";
import CardAnimals from "./CardAnimals";
import { useGetAnimalsQuery } from "@/features/animals/animalsApiSlice";
import { selectCurrentId } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentAnimals,
  setAnimals,
} from "@/features/animals/animalsSlice";
import AnimalModal from "./AnimalModal";

const ClientAnimals = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentId);
  const { data: animals } = useGetAnimalsQuery(userId);
  console.log(animals);
  useEffect(() => {
    dispatch(setAnimals(animals));
  }, [animals, dispatch]);

  const clientAnimals = useSelector(selectCurrentAnimals);
  const animalsArray = Object.entries(clientAnimals);

  const [isOpen, setOpen] = useState(false);
  return (
    <div className="client-animals">
      {isOpen ? <AnimalModal setOpen={setOpen} /> : null}
      <button className="btn btn-solid" onClick={() => setOpen(!isOpen)}>
        + Add Animals
      </button>
      <div className="animals-container">
        {clientAnimals?.map((animal, index) => (
          <CardAnimals anim={animal} key={index} />
        ))}
        {!clientAnimals ? <p>No animals registered!</p> : null}
      </div>
    </div>
  );
};

export default ClientAnimals;
