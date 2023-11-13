import React from "react";
import Image from "next/image";
import image from "../assets/dog-min.webp";
import badge from "../assets/new.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetProfilePicQuery } from "@/features/user/userApiSlice";

const CardJobs = ({ data }) => {
  const pathname = usePathname();

  const { data: profilePicture } = useGetProfilePicQuery(data._id);

  return (
    <Link href={`${pathname}/${data._id}`} className="card-link">
      <article className="card-jobs">
        <Image
          src={profilePicture?.img ?? image}
          layout="fill"
          objectFit="cover"
          className="img"
          alt="Dog"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
          priority={true}
        />
        {data?.new === true ? <Image src={badge} className="new" /> : null}
        <div className="card-content">
          <h4 className="card-title">{data.name}</h4>
          {data.animals[0] && (
            <p className="card-subtitle">Nb Animals: {data.animals.length}</p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default CardJobs;
