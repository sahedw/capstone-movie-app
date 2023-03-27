export default function getRandomPick(dataSet) {
  const randomIndex = Math.floor(Math.random() * dataSet?.length);
  return randomIndex;
}
