import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export function useLocalStorageFetch(url, key, defaultValue, dependency) {
  const [data, setData] = useLocalStorageState(key, {
    defaultValue: defaultValue,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setData(data.results);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    fetchData();
  }, [dependency]);

  return data;
}
