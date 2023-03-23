import React from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  padding-inline-start: 0;
`;

const StyledNavBar = styled.nav``;

const StyledFooter = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

export default function Navigation() {
  return (
    <StyledFooter>
      <StyledNavBar>
        <StyledList>
          <li style={{ height: 70, width: "50%", backgroundColor: "beige" }}>
            Home
          </li>

          <li style={{ height: 70, width: "50%", backgroundColor: "beige" }}>
            Watchlist
          </li>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
