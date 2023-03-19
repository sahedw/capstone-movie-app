import Form from "../components/Form";
import { useContext } from "react";
import { DataContext } from "./_app";
import Image from "next/image";

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);
  return (
    <main>
      <Form onSubmit={handleFormSubmit} />
      {/* Temporary solution to show movies under the form. 
      Will be placed elsewhere in upcoming user stories. */}
      <section>
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                width={130}
                height={180}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}
