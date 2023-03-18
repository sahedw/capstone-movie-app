import React from "react";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
import Image from "next/image";

export default function Form() {
  const { handleFormSubmit, movies } = useContext(DataContext);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search a movie:</label>
        <input type="text" name="search" id="search" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
