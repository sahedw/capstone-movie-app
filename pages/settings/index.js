import React, { useContext } from "react";
import Movie from "../../components/Movie";
import PushButton from "../../components/PushButton";
import { DataContext } from "../_app";
import Link from "next/link";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import useLocalStorageState from "use-local-storage-state";
import { Tooltip } from "react-tooltip";

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

export default function SettingsPage() {
  const { getAvailabilitySeletion, availabilityOption, themeToggler, theme } =
    useContext(DataContext);

  console.log(getAvailabilitySeletion);
  console.log(availabilityOption);
  console.log(themeToggler);
  console.log(theme);

  return (
    <main>
      <PushButton />
      <h2>Settings:</h2>
      <StyledSectionOverall>
        <StyledSectionSettings>
          <StyledSectionTopic>
            <h4>Dark Mode:</h4>
            <button onClick={themeToggler}>
              {theme === "light" ? "Off" : "On"}
            </button>
          </StyledSectionTopic>
          <StyledSectionTopic>
            <Tooltip id="my-tooltip" />
            <h4
              data-tooltip-id="my-tooltip"
              data-tooltip-content="select the availability options in the movie details"
            >
              Availability:
            </h4>
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
