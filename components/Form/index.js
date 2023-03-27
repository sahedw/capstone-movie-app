import React from "react";
import { useRouter } from "next/router";

export default function Form({ onSubmit }) {
  const router = useRouter();

  function handleOnSubmit(event) {
    onSubmit(event);
    router.push("/search-results");
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="search">Search a movie:</label>
      <input type="text" name="search" id="search" required />
      <button>Submit</button>
    </form>
  );
}
