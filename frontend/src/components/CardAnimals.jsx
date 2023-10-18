import { useGetAnimalImageQuery } from "@/features/animals/animalsApiSlice";
import React from "react";
import Image from "next/image";

const CardAnimals = ({ anim }) => {
  const { data: animalImage } = useGetAnimalImageQuery(anim._id);
  console.log(animalImage);
  return (
    <article className="animal-card">
      <Image
        src={animalImage?.imageUrl}
        layout="fill"
        objectFit="cover"
        className="img"
        alt={anim.name}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
        priority={true}
      />

      <div className="animal-title">
        <h4>{anim.name}</h4>
        <p>{anim.age} yo</p>
      </div>k
    </article>
  );
};

export default CardAnimals;
