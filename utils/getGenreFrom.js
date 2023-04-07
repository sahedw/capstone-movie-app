import findGenre from "./findGenre";

export default function getGenreFrom(movie) {
  if (movie?.genre_ids[1]) {
    return (
      findGenre(movie?.genre_ids[0])?.name +
      ", " +
      findGenre(movie?.genre_ids[1])?.name
    );
  } else if (movie?.genre_ids[0]) {
    return findGenre(movie?.genre_ids[0])?.name;
  } else {
    return "Missing, Genre";
  }
}
