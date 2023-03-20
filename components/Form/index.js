import React from "react";
import { useRouter } from "next/router";

export default function Form({ onSubmit }) {
  const router = useRouter();

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="search">Search a movie:</label>
        <input type="text" name="search" id="search" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
