import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

const StyledSection = styled.section`
  width: 100%;
`;

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const StyledInput = styled.input`
  padding-right: 25px;
  width: 250px;
`;

const StyledIcon = styled(Image)`
  position: relative;
`;
const StyledButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  top: 21px;
  left: 220px;
`;

export default function Form({ onSubmit }) {
  const router = useRouter();

  function handleOnSubmit(event) {
    onSubmit(event);
    router.push("/search-results");
  }

  return (
    <>
      <StyledSection>
        <StyledForm onSubmit={handleOnSubmit}>
          <label htmlFor="search">Search:</label>
          <StyledInput
            type="text"
            name="search"
            id="search"
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
        </StyledForm>
      </StyledSection>
    </>
  );
}
