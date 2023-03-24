export default function setCurrentNavText(router, whenCurrent, whenIdle, text) {
  if (router.asPath.toString().length === 1 && text === "search") {
    return "current";
  } else if (router.asPath.includes(`${whenCurrent}`)) {
    return "current";
  } else if (router.asPath.includes(`${whenIdle}`)) {
    return "idle";
  } else {
    return null;
  }
}
