import React, { useContext } from "react";
import Movie from "../../components/Movie";
import PushButton from "../../components/PushButton";
import { DataContext } from "../_app";
import Link from "next/link";
import styled from "styled-components";
import Navigation from "../../components/Navigation";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function SettingsPage() {
  return (
    <main>
      <PushButton />
      <h2>Settings:</h2>
      <section>
        <h4>Dark-Mode</h4>
      </section>
    </main>
  );
}
