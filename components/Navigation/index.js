import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0;
`;

const StyledNavBar = styled.nav``;

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding-inline-start: 0;
`;

const StyledListItem = styled.li`
  font-size: 30px;
`;

export default function Navigation() {
  return (
    <StyledFooter>
      <StyledNavBar>
        <StyledList>
          <StyledListItem>🔍</StyledListItem>
          <StyledListItem>📝</StyledListItem>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
