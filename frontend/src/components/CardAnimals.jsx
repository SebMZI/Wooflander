import { useGetAnimalImageQuery } from "@/features/animals/animalsApiSlice";
import React from "react";

const CardAnimals = ({ anim }) => {
  const { data: animalImage } = useGetAnimalImageQuery(anim._id);
  console.log(animalImage);
  return (
    <article className="animal-card">
      <img src={animalImage?.imageUrl} alt="image" className="img" />
      <div className="animal-title">
        <h4>{anim.name}</h4>
        <p>{anim.age}</p>
      </div>
    </article>
  );
};

export default CardAnimals;
