import Image from "next/image";
import React, { useEffect, useState } from "react";
import dog from "../assets/dog.webp";
import dog1 from "../assets/cristian-castillo-73pyV0JJOmE-unsplash.webp";
import dog2 from "../assets/photo-1575859431352-39e2735a0aab.webp";
import Link from "next/link";

const Carrousel = () => {
  const [counter, setCounter] = useState(0);
  const images = [dog, dog1, dog2];
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  console.log(images[1], "ffff");
  return (
    <div className={`carrousel-component`}>
      <Link href={"#"} className="link">
        <Image src={images[counter]} alt="chien" className={`img`} />

        <div className="animal-info">
          <h3 className="animal-name">Name, Age</h3>
        </div>
      </Link>
    </div>
  );
};

export default Carrousel;
