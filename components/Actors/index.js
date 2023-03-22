import React from "react";
import Image from "next/image";

export default function Actors({ actors }) {
  if (!actors) return <p>Loading cast...</p>;

  console.log();

  return (
    <ul>
      {actors.map((actor) => {
        return (
          <li key={actor.cast_id}>
            <Image />
            <p>{actor.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
