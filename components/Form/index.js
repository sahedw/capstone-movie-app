import React from "react";
import { useRouter } from "next/router";

const router = useRouter();

export default function Form({ onSubmit }) {
  function handleChangePage() {}
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="search">Search a movie:</label>
        <input type="text" name="search" id="search" required />
        <button type="submit" onClick={handleChangePage}>
          Submit
        </button>
      </form>
    </>
  );
}
