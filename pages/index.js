import Form from "../components/Form";
import { useContext } from "react";
import { DataContext } from "./_app";
import Navigation from "../components/Navigation";

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);

  return (
    <>
      <main>
        <Form onSubmit={handleFormSubmit} movies={movies} />
      </main>
      <Navigation />
    </>
  );
}
