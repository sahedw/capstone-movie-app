import Form from "../components/Form";
import { useContext } from "react";
import { DataContext } from "./_app";

export default function Home() {
  const { handleFormSubmit, movies } = useContext(DataContext);

  return (
    <main>
      <Form onSubmit={handleFormSubmit} movies={movies} />
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
