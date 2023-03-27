export default function getRandomWatchlistPick(watchlist) {
  const randomMovieNumber = Math.floor(Math.random() * watchlist.length);
  return randomMovieNumber;
}
