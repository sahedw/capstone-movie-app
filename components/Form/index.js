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

const StyledInput = styled.input`
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

export default function Form({ onSubmit }) {
  const { handleMediaTypeChange, mediaTypeMovies } = useContext(MediaContext);
  const router = useRouter();

  function handleOnSubmit(event) {
    onSubmit(event);
    router.push("/search-results");
  }

  console.log(mediaTypeMovies);

  return (
    <>
      <StyledSection>
        <StyledForm onSubmit={handleOnSubmit}>
          <StyledInput
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            required
          ></StyledInput>
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
              <label htmlFor="movies">Movies:</label>
              <input
                type="radio"
                id="movies"
                name="media-type"
                value="movies"
                onChange={() => {
                  handleMediaTypeChange(true);
                }}
                defaultChecked
              />
            </StyledSectionRadio>
            <StyledSectionRadio>
              <label htmlFor="shows">Shows:</label>
              <input
                type="radio"
                id="shows"
                name="media-type"
                value="shows"
                onChange={() => {
                  handleMediaTypeChange(false);
                }}
              />
            </StyledSectionRadio>
          </StyledSectionRadioButtons>
        </StyledForm>
      </StyledSection>
    </>
  );
}
