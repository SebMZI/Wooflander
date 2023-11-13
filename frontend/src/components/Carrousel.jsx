import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import {
  useGetAnimalImageQuery,
  useGetAnimalsQuery,
} from "@/features/animals/animalsApiSlice";
import {
  selectCurrentAnimals,
  setAnimals,
} from "@/features/animals/animalsSlice";
import { useDispatch, useSelector } from "react-redux";

const Carrousel = ({ user }) => {
  const [index, setIndex] = useState(0);
  const [animalImages, setAnimalImages] = useState([]);
  const dispatch = useDispatch();
  const animalsArray = useSelector(selectCurrentAnimals);

  const [animIdx, setAnimIdx] = useState(0);

  console.log(user?._id);

  const { data: getAnimals } = useGetAnimalsQuery(user?._id);
  dispatch(setAnimals(getAnimals));
  const animals = useSelector(selectCurrentAnimals);

  const { data: getAnimalImage } = useGetAnimalImageQuery(animals[index]?._id);
  console.log(getAnimalImage);

  // Récupérer l'id de l'utilisateur qu'on regarde
  // Récupérer tous ses animaux
  // Récupérer les images des animaux
  // Display les animaux dans un carrousel

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % animals.length);
  };

  useEffect(() => {
    if (animals.length >= 1) {
      const interval = setInterval(nextCard, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className="SlideCardList">
      {animals.length < 1 ? (
        <Link href={"#"}>
          <Image
            src={getAnimalImage?.img}
            alt={`Dog image for ${animals?.name}`}
            layout="fill"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
            priority={true}
            className="img"
          />
        </Link>
      ) : (
        animals &&
        animals?.map((anim, idx) => {
          return (
            <Link href={"#"} key={idx}>
              <div
                className={`SlideCard SlideCard--${
                  index === idx ? "display" : "hide"
                }`}
              >
                {getAnimalImage ? (
                  <Image
                    src={getAnimalImage.img}
                    alt={`Dog image for ${animals?.name}`}
                    layout="fill"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
                    priority={true}
                    className="img"
                  />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Link>
          );
        })
      )}
      {!animals && <p>Loading...</p>}
    </div>
  );
};

export default Carrousel;
