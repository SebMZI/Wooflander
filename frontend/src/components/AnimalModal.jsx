import { useAddAnimalMutation } from "@/features/animals/animalsApiSlice";
import { selectCurrentId } from "@/features/auth/authSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AnimalModal = ({ setOpen }) => {
  const [addAnimal] = useAddAnimalMutation();
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [veto, setVeto] = useState();
  const [proprio, setPropio] = useState();
  const [getAlong, setGetAlong] = useState(false);
  const [breed, setBreed] = useState();
  const [character, setCharacter] = useState();
  const [image, setImage] = useState();
  const id = useSelector(selectCurrentId);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (
      !id ||
      !name ||
      !proprio ||
      !veto ||
      !age ||
      !getAlong ||
      !breed ||
      !character
    ) {
      return;
    }

    const ageInt = parseInt(age);

    const formData = new FormData();

    formData.append("userId", id);
    formData.append("name", name);
    formData.append("numProprio", proprio);
    formData.append("numVeto", veto);
    formData.append("age", ageInt);
    formData.append("entente", getAlong);
    formData.append("race", breed);
    formData.append("caractere", character);
    formData.append("image", image);

    // Affichage des paires clefs/valeurs
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const result = await addAnimal(formData);
      console.log(result);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="animal-modal">
      <div className="overlay" onClick={() => setOpen(false)}></div>
      <div className="modal-content">
        <h2 className="modal-title">Add Animal</h2>
        <form onSubmit={(e) => handleCreate(e)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="Veto">Num Veterinarian</label>
          <input
            type="tel"
            id="Veto"
            onChange={(e) => setVeto(e.target.value)}
          />
          <label htmlFor="Proprio">Num Owner</label>
          <input
            type="tel"
            id="Proprio"
            onChange={(e) => setPropio(e.target.value)}
          />
          <div className="inp-check">
            <label htmlFor="entente">Get along with dogs</label>
            <input
              type="checkbox"
              name="entente"
              id="entente"
              onChange={(e) => setGetAlong(e.target.checked)}
            />
          </div>
          <label htmlFor="race">Dog breed</label>
          <input
            type="text"
            id="race"
            onChange={(e) => setBreed(e.target.value)}
          />
          <label htmlFor="caractere">Character</label>
          <input
            type="text"
            name="character"
            id="caractere"
            placeholder="Separated by coma"
            onChange={(e) => setCharacter(e.target.value)}
          />
          <label htmlFor="image">Dog image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="btn btn-solid">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AnimalModal;
