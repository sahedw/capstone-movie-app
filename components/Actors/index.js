import React from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding-inline-start: 0;
  gap: 10px;
`;

const StyledName = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 0;
  color: gray;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

export default function Actors({ actors }) {
  if (!actors) return <p>Loading cast...</p>;

  return (
    <StyledList>
      {actors?.map((actor) => {
        return (
          <StyledListItem key={actor.cast_id}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
              alt={actor.name}
              width={70}
              height={100}
            />
            <StyledName key={actor.name}>{actor.name}</StyledName>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}
