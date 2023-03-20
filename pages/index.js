import Form from "../components/Form";
import { useContext } from "react";
import { DataContext } from "./_app";
import Image from "next/image";

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);

  return (
    <main>
      <Form onSubmit={handleFormSubmit} movies={movies} />
    </main>
  );
}
