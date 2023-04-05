import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import getIconForTheme from "../../utils/getIconForTheme";
import { useContext } from "react";
import { DataContext } from "../../pages/_app";
const StyledButton = styled.button`
  display: flex;
  height: 30px;
  gap: 5px;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 15px;
  padding-left: 15px;
  padding-top: 15px;
  color: ${(props) => props.theme.fontColor};
`;

export default function PushButton() {
  const { theme, resetResultsPage } = useContext(DataContext);
  const router = useRouter();
  function handleChangePage() {
    router.back();
  }

  function handleCompleteProcess() {
    handleChangePage();
    if (router.asPath.includes("/search-results")) {
      resetResultsPage();
    }
  }

  return (
    <StyledButton color={theme} onClick={handleCompleteProcess}>
      <Image
        alt="back button"
        src={`/back${getIconForTheme(theme)}.png`}
        width={20}
        height={20}
      />
      Back
    </StyledButton>
  );
}
