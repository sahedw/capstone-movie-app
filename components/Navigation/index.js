import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const StyledFooter = styled.footer`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 80px;
  bottom: 0;
  border-top: 1px solid lightgrey;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  align-items: center;
`;

const StyledParagraphIcon = styled.p`
  margin: 0;
  font-size: 25px;
  text-align: center;
`;

const StyledImage = styled(Image)`
  margin-bottom: 5px;
  font-size: 25px;
  text-align: center;
`;

const StyledParagraphText = styled.p`
  margin: 0;
  font-size: 15px;
`;

export default function Navigation() {
  const router = useRouter();

  function setCurrentSearchIcon(router) {
    if (router.asPath.includes("/search-results")) {
      return require("/icons/search-current.png");
    } else if (router.asPath.includes("/")) {
      return require("/icons/search.png");
    } else {
      return null;
    }
  }

  return (
    <StyledFooter>
      <StyledNavBar>
        <StyledList>
          <StyledLink href={"/"}>
            <StyledListItem>
              <StyledDiv>
                <StyledImage
                  src={setCurrentSearchIcon(router)}
                  alt="icon"
                  width={25}
                  height={25}
                />
                <StyledParagraphText>Search</StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
          <StyledLink href={"/"}>
            <StyledListItem>
              <StyledDiv>
                <StyledImage
                  src={require("/icons/watchlist.png")}
                  alt="icon"
                  width={25}
                  height={25}
                />
                <StyledParagraphText>Watchlist</StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
