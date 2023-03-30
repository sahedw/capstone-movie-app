import { useEffect, useState } from "react";

export function useFetch(url, defaultOfState, dependency) {
  const [data, setData] = useState(defaultOfState);

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
