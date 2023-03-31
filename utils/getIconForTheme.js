export default function getIconForTheme(theme) {
  if (theme === "dark") {
    return `-${theme}`;
  } else {
    return "";
  }
}
