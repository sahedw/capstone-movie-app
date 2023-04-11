export default function simulateLoading(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 300);
}
