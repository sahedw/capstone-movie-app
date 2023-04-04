import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export function useLocalStorageFetch(url, key, initialValue, dependency) {
  const [data, setData] = useLocalStorageState(key, {
    defaultValue: initialValue,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setData(data);
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
