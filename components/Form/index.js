import React from "react";
import Image from "next/image";

export default function Form({ onSubmit }) {
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
