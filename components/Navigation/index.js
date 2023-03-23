import React from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
  position: fixed;
  width: 100%;
  height: 80px;
  bottom: 0;
  border-top: 1px solid lightgrey;
  border-radius: 15px;
`;

const StyledNavBar = styled.nav``;

const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding-inline-start: 0;
`;

const StyledListItem = styled.li`
  font-size: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledParagraphIcon = styled.p`
  margin: 0;
  font-size: 25px;
  text-align: center;
`;

const StyledParagraphText = styled.p`
  margin: 0;
  font-size: 15px;
`;

export default function Navigation() {
  return (
    <StyledFooter>
      <StyledNavBar>
        <StyledList>
          <StyledLink href={"/"}>
            <StyledListItem>
              <StyledDiv>
                <StyledParagraphIcon>🔍</StyledParagraphIcon>
                <StyledParagraphText>Search</StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
          <StyledLink href={"/my-watchlist"}>
            <StyledListItem>
              <StyledDiv>
                <StyledParagraphIcon>📝</StyledParagraphIcon>
                <StyledParagraphText>Watchlist</StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
