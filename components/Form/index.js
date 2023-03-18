import React from "react";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
import Image from "next/image";

export default function Form() {
  const { handleFormSubmit, movies } = useContext(DataContext);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search a movie:</label>
        <input type="text" name="search" id="search" required />
        <button type="submit">Submit</button>
      </form>
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
