export default function showWatchProviders(streamingProvider) {
  if (streamingProvider?.length === 1) {
    return `${streamingProvider[0].provider_name}`;
  } else if (streamingProvider?.length > 1) {
    return `${streamingProvider[0].provider_name}, ${streamingProvider[1].provider_name}`;
  } else {
    return "Not available";
  }
}
