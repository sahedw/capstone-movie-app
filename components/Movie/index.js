import React from "react";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
import Image from "next/image";
import styled from "styled-components";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Abenteuer",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Komödie",
  },
  {
    id: 80,
    name: "Krimi",
  },
  {
    id: 99,
    name: "Dokumentarfilm",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Familie",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "Historie",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Musik",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Liebesfilm",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV-Film",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "Kriegsfilm",
  },
  {
    id: 37,
    name: "Western",
  },
];

const StyledDiv = styled.div`
  height: 180px;
  width: 130px;
`;

/* The lightgray background is temporarily used for display purposes.
Will be changed in the future. */

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export default function Movie() {
  const { movies } = useContext(DataContext);

  function findGenre(id) {
    const targetGenre = genres.find((genre) => genre.id === id);
    return targetGenre;
  }

  return (
    <>
      {movies.map((movie) => {
        return (
          <StyledSection key={movie.id}>
            <StyledDiv>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                width={130}
                height={180}
              />
            </StyledDiv>

            <section>
              <h3>{movie.title}</h3>
              {movie.genre_ids[1] ? (
                <>
                  <p>
                    {findGenre(movie.genre_ids[0]).name},{" "}
                    {findGenre(movie.genre_ids[1]).name}
                  </p>
                </>
              ) : (
                <p>{findGenre(movie.genre_ids[0]).name}</p>
              )}
            </section>
          </StyledSection>
        );
      })}
    </>
  );
}
