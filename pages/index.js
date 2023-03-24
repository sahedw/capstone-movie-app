import Form from "../components/Form";
import { useContext } from "react";
import { DataContext } from "./_app";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);
  const router = useRouter();
  console.log(router.asPath.toString().length);
  return (
    <>
      <main>
        <Form onSubmit={handleFormSubmit} movies={movies} />
      </main>
      <Navigation />
    </>
  );
}
