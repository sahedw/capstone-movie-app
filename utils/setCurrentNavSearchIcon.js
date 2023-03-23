export default function setCurrentNavSearchIcon(
  router,
  whenCurrent,
  whenIdle,
  icon
) {
  if (router.asPath.includes(whenCurrent)) {
    return require(`/icons/${icon}-current.png`);
  } else if (router.asPath.includes(whenIdle)) {
    return require(`/icons/${icon}.png`);
  } else {
    return null;
  }
}
