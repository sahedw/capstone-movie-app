import Form from "../components/Form";
import { useContext } from "react";
import { DataContext } from "./_app";
import Navigation from "../components/Navigation";
import styled from "styled-components";

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);

  const StyledSectionHeader = styled.section`
    padding-left: 30px;
  `;

  const StyledSectionForm = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  `;

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
      </main>
      <Navigation />
    </>
  );
}
