import React from "react";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
import Image from "next/image";

export default function Movie() {
  const { movies } = useContext(DataContext);
  return (
    <>
      <section>
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                width={130}
                height={180}
              />
            </div>
          );
        })}
      </section>
    </>
  );
}
