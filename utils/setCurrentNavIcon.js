/* export default function setCurrentNavIcon(router, whenCurrent, whenIdle, icon) {
  if (router.asPath.match(whenCurrent)) {
    return require(`/icons/${icon}-current.png`);
  } else if (router.asPath.toString().length === 1) {
    return require(`/icons/${icon}-current.png`);
  } else if (router.asPath.match(whenIdle)) {
    return require(`/icons/${icon}.png`);
  } else {
    return null;
  }
} */

export default function setCurrentNavIcon(router, whenCurrent, whenIdle, icon) {
  if (router.asPath.toString().length === 1 && icon === "search") {
    return require(`/icons/${icon}-current.png`);
  } else if (router.asPath.includes(`${whenCurrent}`)) {
    return require(`/icons/${icon}-current.png`);
  } else if (router.asPath.match(whenIdle)) {
    return require(`/icons/${icon}.png`);
  } else {
    return null;
  }
}
