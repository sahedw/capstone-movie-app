import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { useContext } from "react";
import { MediaContext } from "../../pages/_app";

const StyledSection = styled.section``;

const StyledSectionRadioButtons = styled.section`
  margin-top: 5px;
  display: flex;
  gap: 10px;
`;

const StyledSectionRadio = styled.section`
  display: flex;
`;

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const StyledInputText = styled.input`
  margin-top: 10px;
  padding-right: 25px;
  width: 250px;
  height: 30px;
  border: lightgray solid;
  border-radius: 10px;
  background-color: #f7f7f7;

  :focus {
    background-color: e8a2a2;
    opacity: 0.4;
    border: none;
    outline: 2px solid red;
    border-radius: 5px;
  }
`;

const StyledInputRadio = styled.input`
  accent-color: black;
`;

const StyledIcon = styled(Image)`
  position: relative;
`;
const StyledButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  top: 16px;
  left: 220px;
`;

const StyledLabel = styled.label`
  padding-top: 3px;
`;

export default function Form({ onSubmit }) {
  const { handleMediaTypeChange, mediaTypeMovies } = useContext(MediaContext);

  const router = useRouter();

  function handleOnSubmit(event) {
    onSubmit(event);
    router.push("/search-results");
  }

  return (
    <>
      <StyledSection>
        <StyledForm onSubmit={handleOnSubmit}>
          <StyledInputText
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            maxLength={25}
            required
          ></StyledInputText>
          <StyledButton>
            <StyledIcon
              src={require("/icons/search.png")}
              alt="search-icon"
              width={15}
              height={15}
            />
          </StyledButton>
          <StyledSectionRadioButtons>
            <StyledSectionRadio>
              <StyledLabel htmlFor="movie">Movies:</StyledLabel>
              <StyledInputRadio
                type="radio"
                id="movie"
                name="media-type"
                value="movie"
                onChange={() => {
                  handleMediaTypeChange("movie");
                }}
                required
              />
            </StyledSectionRadio>
            <StyledSectionRadio>
              <StyledLabel htmlFor="tv">Shows:</StyledLabel>
              <StyledInputRadio
                type="radio"
                id="tv"
                name="media-type"
                value="tv"
                onChange={() => {
                  handleMediaTypeChange("tv");
                }}
              />
            </StyledSectionRadio>
          </StyledSectionRadioButtons>
        </StyledForm>
      </StyledSection>
    </>
  );
}
