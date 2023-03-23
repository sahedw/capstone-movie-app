export default function handlePushButtonRoute(router) {
  if (router.asPath.includes("search-results")) {
    return "/search-results";
  } else if (router.asPath.includes("my-watchlist")) {
    return "/my-watchlist";
  } else {
    return null;
  }
}
