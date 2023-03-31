import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import setCurrentNavIcon from "../../utils/setCurrentNavIcon";
import setCurrentNavText from "../../utils/setCurrentNavText";
import { DataContext } from "../../pages/_app";
import { useContext } from "react";

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.navigation};
  position: fixed;
  width: 100%;
  height: 80px;
  bottom: -1px;
  border-top: 1px solid grey;
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
  color: ${({ value }) => (value === "current" ? "#F97B7B" : "black")};
`;

export default function Navigation() {
  const { theme } = useContext(DataContext);
  const router = useRouter();

  return (
    <StyledFooter color={theme}>
      <StyledNavBar>
        <StyledList>
          <StyledLink href={"/"}>
            <StyledListItem>
              <StyledDiv>
                <StyledImage
                  src={setCurrentNavIcon(
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
                  value={setCurrentNavText(
                    router,
                    "/search-results",
                    "/my-watchlist",
                    "search"
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
                  src={setCurrentNavIcon(
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
                  value={setCurrentNavText(
                    router,
                    "/my-watchlist",
                    "/",
                    "watchlist"
                  )}
                >
                  Watchlist
                </StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
          <StyledLink href={"/my-watched"}>
            <StyledListItem>
              <StyledDiv>
                <StyledImage
                  src={setCurrentNavIcon(router, "/my-watched", "/", "watched")}
                  alt="icon"
                  width={25}
                  height={25}
                />
                <StyledParagraphText
                  value={setCurrentNavText(
                    router,
                    "/my-watched",
                    "/",
                    "watched"
                  )}
                >
                  Watched
                </StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
          <StyledLink href={"/cinema"}>
            <StyledListItem>
              <StyledDiv>
                <StyledImage
                  src={setCurrentNavIcon(router, "/cinema", "/", "cinema")}
                  alt="icon"
                  width={25}
                  height={25}
                />
                <StyledParagraphText
                  value={setCurrentNavText(router, "/cinema", "/", "cinema")}
                >
                  Cinema
                </StyledParagraphText>
              </StyledDiv>
            </StyledListItem>
          </StyledLink>
        </StyledList>
      </StyledNavBar>
    </StyledFooter>
  );
}
