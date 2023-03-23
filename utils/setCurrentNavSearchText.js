export default function setCurrentNavSearchText(router, whenCurrent, whenIdle) {
  if (router.asPath.includes(`${whenCurrent}`)) {
    return "current";
  } else if (router.asPath.includes(`${whenIdle}`)) {
    return "idle";
  } else {
    return null;
  }
}
