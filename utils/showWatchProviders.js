export default function showWatchProviders(streamingProvider) {
  if (streamingProvider?.length === 1) {
    return `Available on ${streamingProvider[0].provider_name}`;
  } else if (streamingProvider?.length === 2) {
    return `Available on ${streamingProvider[0].provider_name}, ${streamingProvider[1].provider_name}`;
  } else {
    return "Currently not available for streaming";
  }
}
