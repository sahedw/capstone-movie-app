import React from "react";
import styled from "styled-components";

export default function Form() {
  return (
    <>
      <form>
        <label htmlFor="search">Search a movie:</label>
        <input type="text" name="search" id="search" required />
      </form>
    </>
  );
}
