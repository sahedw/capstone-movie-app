export default function getPopularityDecimal(number) {
  const finalNumber = Math.round(number * 10) / 10;
  return finalNumber;
}
