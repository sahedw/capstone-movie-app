export default function calculateRuntimeFrom(runtime) {
  if (runtime >= 180) {
    const remaining = runtime % 180;
    return `3h ${remaining}m`;
  } else if (runtime <= 170 && runtime >= 121) {
    const remaining = runtime % 120;
    return `2h ${remaining}m`;
  } else {
    if (runtime <= 120 && runtime >= 61) {
      const remaining = runtime % 60;
      return `1h ${remaining}m`;
    } else if (runtime <= 60 && runtime > 0) {
      return `${runtime}m`;
    } else {
      return "no data";
    }
  }
}
