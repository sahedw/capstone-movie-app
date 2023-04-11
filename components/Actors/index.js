import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { keyframes } from "styled-components";

export const fadeInFromBottom = keyframes`
    0% {
    opacity: 0;
    transform: translateY(20px);
  }
    100% {
      opacity: 1;
      transform: translateY(0);
  }
`;
const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding-inline-start: 0;
  gap: 10px;
  animation: ${fadeInFromBottom} 3s ease-in-out;
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
          <StyledListItem key={actor?.character}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
              alt={actor.name}
              width={70}
              height={100}
              key={actor.profile_path}
            />
            <StyledName key={actor.name}>{actor.name}</StyledName>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
}
