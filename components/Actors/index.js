import React from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  padding-inline-start: 0;
  gap: 10px;
`;

const StyledName = styled.p`
  font-size: 1rem;
`;

export default function Actors({ actors }) {
  if (!actors) return <p>Loading cast...</p>;

  console.log();

  return (
    <StyledList>
      {actors.map((actor) => {
        return (
          <li key={actor.cast_id}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
              alt={actor.name}
              width={70}
              height={100}
            />
            <StyledName>{actor.name}</StyledName>
          </li>
        );
      })}
    </StyledList>
  );
}
