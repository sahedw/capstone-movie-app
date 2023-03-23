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

const StyledImage = styled(Image)`
  margin-bottom: 5px;
  font-size: 25px;
  text-align: center;
`;

const StyledParagraphText = styled.p`
  margin: 0;
  font-size: 15px;
  color: ${({ value }) => (value === "current" ? "red" : "black")};
`;

export default function Navigation() {
  const router = useRouter();

  function setCurrentNavSearchIcon(router, whenCurrent, whenIdle, icon) {
    if (router.asPath.includes(whenCurrent)) {
      return require(`/icons/${icon}-current.png`);
    } else if (router.asPath.includes(whenIdle)) {
      return require(`/icons/${icon}.png`);
    } else {
      return null;
    }
  }

  function setCurrentNavSearchText(router, whenCurrent, whenIdle) {
    if (router.asPath.includes(`${whenCurrent}`)) {
      return "current";
    } else if (router.asPath.includes(`${whenIdle}`)) {
      return "idle";
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
                  src={setCurrentNavSearchIcon(
                    router,
                    "/search-results",
                    "/",
                    "search"
                  )}
                  alt="icon"
                  width={25}
                  height={25}
                />
                <StyledParagraphText
                  value={setCurrentNavSearchText(
                    router,
                    "/search-results",
                    "/"
                  )}
                >
                  Search
                </StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
          <StyledLink href={"/my-watchlist"}>
            <StyledListItem>
              <StyledDiv>
                <StyledImage
                  src={setCurrentNavSearchIcon(
                    router,
                    "/my-watchlist",
                    "/",
                    "watchlist"
                  )}
                  alt="icon"
                  width={25}
                  height={25}
                />
                <StyledParagraphText
                  value={setCurrentNavSearchText(router, "/my-watchlist", "/")}
                >
                  Watchlist
                </StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
