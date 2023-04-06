import Image from "next/image";
import styled from "styled-components";

export const DetailFooter = styled.footer`
  background-color: ${(props) => props.theme.body};
  position: fixed;
  width: 100%;
  height: 80px;
  bottom: -1px;
  border-top: 1px solid grey;
`;

export const DetailNavBar = styled.nav``;

export const NavBarList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding-inline-start: 0;
`;

export const NavBarListItem = styled.li`
  font-size: 10px;
`;

export const DetailNavBarButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavBarListButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
  height: 45px;
  width: 160px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.color};
`;

export const NavBarButtonIcon = styled(Image)``;

export const NavBarButtonText = styled.p`
  color: white;
`;
