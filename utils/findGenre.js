import genres from "../pages/api/genres";

export default function findGenre(id) {
  const targetGenre = genres.find((genre) => genre.id === id);
  return targetGenre;
}
