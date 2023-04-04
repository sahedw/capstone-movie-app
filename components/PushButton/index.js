import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import getIconForTheme from "../../utils/getIconForTheme";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

const StyledButton = styled.button`
  display: flex;
  height: 30px;
  gap: 5px;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 15px;
`;

export default function PushButton() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  function handleChangePage() {
    router.back();
  }
  return (
    <StyledButton onClick={handleChangePage}>
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
