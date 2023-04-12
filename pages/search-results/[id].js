import React from "react";
import MovieDetail from "../../components/MovieDetail";
import { useContext, useState, useEffect } from "react";
import { DataContext, MediaContext } from "../_app";
import { useRouter } from "next/router";
import BackButton from "../../components/PushButton";
import MovieDetailFooter from "../../components/MovieDetailFooter";
import Navigation from "../../components/Navigation";
import TVDetail from "../../components/TVDetail";
import TVDetailFooter from "../../components/TVDetailFooter";
import { EmptyContentContainer } from "../../components/Styled Components/ListPage";
import simulateLoading from "../../utils/simulateLoading";
import Clipperboard from "../../animations/Clipperboard/Clipperboard";

export default function MovieDetailPage() {
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const { movies } = useContext(DataContext);
  const { mediaTypeMovies } = useContext(MediaContext);

  const router = useRouter();

  const currentMovie = movies?.find(
    (movie) => movie.id.toString() === router.query.id
  );

  useEffect(() => {
    simulateLoading(setIsLoadingResults, 1000);
  }, []);

  if (!currentMovie)
    return (
      <main>
        <BackButton />
        <EmptyContentContainer>
          <h1>{`We're quite sorry about this!`}</h1>
          <p>{`The movie id ${router.query.id} seems to be not in our database.`}</p>
          <Navigation />
        </EmptyContentContainer>
      </main>
    );

  return (
    <main>
      {isLoadingResults ? (
        <EmptyContentContainer>
          <div>
            <Clipperboard />
          </div>
        </EmptyContentContainer>
      ) : (
        <>
          {mediaTypeMovies === "movie" ? (
            <>
              <MovieDetail movie={currentMovie} />
              <MovieDetailFooter movie={currentMovie} />
            </>
          ) : (
            <>
              <TVDetail movie={currentMovie} />
              <TVDetailFooter movie={currentMovie} />
            </>
          )}
        </>
      )}
    </main>
  );
}
