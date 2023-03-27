import Form from "../components/Form";
import { useContext } from "react";
import { DataContext } from "./_app";
import Navigation from "../components/Navigation";
import styled from "styled-components";

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);

  const StyledSection = styled.section``;

  return (
    <>
      <main>
        <p>Welcome back!</p>
        <p>Grab your 🍿 and lets watch a movie!</p>
        <StyledSection>
          <Form onSubmit={handleFormSubmit} movies={movies} />
        </StyledSection>
      </main>
      <Navigation />
    </>
  );
}
