import Form from "../components/Form";
import { useContext, useState, useEffect } from "react";
import { DataContext, WatchlistContext } from "./_app";
import Navigation from "../components/Navigation";
import styled from "styled-components";
import Movie from "../components/Movie";
import getRandomWatchlistPick from "../utils/getRandomWatchlistPick";

const StyledSectionHeader = styled.section`
  padding-left: 30px;
`;

const StyledSectionForm = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const StyledLine = styled.hr`
  width: 140px;
  border-top: 1px solid lightgrey;
`;

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);
  const { watchlist } = useContext(WatchlistContext);
  const [runtime, setRuntime] = useState(0);

  const randomIndexFromWatchlist = getRandomWatchlistPick(watchlist);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=eng-US`
        );
        if (response.ok) {
          const data = await response.json();
          setRuntime(data.runtime);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <main>
        <StyledSectionHeader>
          <h3>Welcome back!</h3>
          <p>
            Grab your 🍿 and lets watch a <strong>movie!</strong>{" "}
          </p>
        </StyledSectionHeader>
        <StyledSectionForm>
          <Form onSubmit={handleFormSubmit} movies={movies} />
        </StyledSectionForm>
        <StyledLine />
        <Movie movie={watchlist[randomIndexFromWatchlist]} />
      </main>
      <Navigation />
    </>
  );
}
