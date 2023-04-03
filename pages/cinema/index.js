import React from "react";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { useContext } from "react";
import { CinemaContext, DataContext } from "../_app";
import MovieGrid from "../../components/MovieGrid";
import styled from "styled-components";
import { useState } from "react";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 10px;
`;

const StyledSection = styled.section`
  padding-left: 15px;
  padding-right: 15px;
`;

const StyledSectionButtonsFlex = styled.section`
  width: 100%;
`;

const StyledSectionButtons = styled.section`
  display: flex;
  justify-content: flex-end;
`;

const StyledButtonList = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

const StyledButtonGrid = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

export default function CinemaPage() {
  const { currentlyInCinemas } = useContext(CinemaContext);
  const { theme } = useContext(DataContext);
  const [showPlayingInCinema, setShowPlayingInCinema] = useState(true);

  if (!currentlyInCinemas) return <h1>Loading...</h1>;

  return (
    <main>
      <StyledSection>
        <h2>Currently in cinemas:</h2>
        <StyledSectionButtonsFlex>
          <StyledSectionButtons>
            <StyledButtonList
              color={theme}
              onClick={() => {
                setLayoutType(true);
              }}
              disabled={showPlayingInCinema ? true : false}
            >
              Playing
            </StyledButtonList>
            <StyledButtonGrid
              color={theme}
              onClick={() => {
                setLayoutType(false);
              }}
              disabled={showPlayingInCinema ? false : true}
            >
              Upcoming
            </StyledButtonGrid>
          </StyledSectionButtons>
        </StyledSectionButtonsFlex>
        <StyledDiv>
          {currentlyInCinemas.map((movie) => (
            <StyledLink key={movie.id} href={`cinema/${movie.id}`}>
              <MovieGrid movie={movie} />
            </StyledLink>
          ))}
        </StyledDiv>
      </StyledSection>
      <Navigation />
    </main>
  );
}
