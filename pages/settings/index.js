import React, { useContext } from "react";
import Movie from "../../components/Movie";
import PushButton from "../../components/PushButton";
import { DataContext } from "../_app";
import Link from "next/link";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import useLocalStorageState from "use-local-storage-state";

const StyledSectionTopic = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledSectionSettings = styled.section`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const StyledSectionOverall = styled.section`
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.h2`
  margin-left: 15px;
`;

export default function SettingsPage() {
  const { getAvailabilitySeletion, availabilityOption, themeToggler, theme } =
    useContext(DataContext);

  return (
    <main>
      <PushButton />
      <StyledHeader>Settings:</StyledHeader>
      <StyledSectionOverall>
        <StyledSectionSettings>
          <StyledSectionTopic>
            <h4>Dark Mode:</h4>
            <button onClick={themeToggler}>
              {theme === "light" ? "Off" : "On"}
            </button>
          </StyledSectionTopic>
          <StyledSectionTopic>
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
          </StyledSectionTopic>
        </StyledSectionSettings>
      </StyledSectionOverall>
    </main>
  );
}
