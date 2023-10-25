import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import dog from "../assets/dog.webp";
import dog1 from "../assets/cristian-castillo-73pyV0JJOmE-unsplash.webp";
import dog2 from "../assets/photo-1575859431352-39e2735a0aab.webp";
import Link from "next/link";

const Carrousel = () => {
  const [counter, setCounter] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [index, setIndex] = useState(0);
  const classImg = useRef(null);
  const images = [dog, dog1, dog2];
  const nextCard = () => {
    // Ajout d'une verification
    if (images !== undefined) {
      setTimeout(
        // Ajout d'un -1 à la methode byDateDesc.length
        () => setIndex(index < images.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {images?.map((event, idx) => (
        <Link href={"#"}>
          <div key={idx}>
            <div
              className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"
              }`}
            >
              <img src={event.src} alt="forum" />
            </div>
            {/* <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Modification key par _.title
                  key={`${_.title}`}
                  type="radio"
                  name="radio-button"
                  // remplace idx par index
                  checked={index === radioIdx}
                  // Ajout readOnly
                  readOnly
                />
              ))}
            </div>
          </div> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Carrousel;
