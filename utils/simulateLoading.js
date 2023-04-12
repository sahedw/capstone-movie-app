export default function simulateLoading(stateOfSimulation, time) {
  stateOfSimulation(true);
  setTimeout(() => {
    stateOfSimulation(false);
  }, time);
}
