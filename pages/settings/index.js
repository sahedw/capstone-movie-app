import React, { useContext } from "react";
import Movie from "../../components/Movie";
import PushButton from "../../components/PushButton";
import { DataContext } from "../_app";
import Link from "next/link";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import useLocalStorageState from "use-local-storage-state";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export default function SettingsPage() {
  const { getAvailabilitySeletion, availabilityOption } =
    useContext(DataContext);

  return (
    <main>
      <PushButton />
      <h2>Settings:</h2>
      <section>
        <section>
          <h4>Dark Mode:</h4>
          <button>Turn On</button>
        </section>
        <section>
          <h4>Availability:</h4>
          <select
            onChange={getAvailabilitySeletion}
            defaultValue={availabilityOption}
          >
            <option value="all">All</option>
            <option value="flatrate">Flatrate</option>
            <option value="rent">Rent</option>
            <option value="purchase">Purchase</option>
          </select>
        </section>
      </section>
    </main>
  );
}
