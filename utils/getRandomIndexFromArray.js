export default function getRandomIndexFromArray(dataSet) {
  const randomIndex = Math.floor(Math.random() * dataSet?.length);
  return randomIndex;
}
