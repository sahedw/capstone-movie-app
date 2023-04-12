import Link from "next/link";
import styled from "styled-components";

export const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

export const LayoutListButton = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

export const EmptyContentContainer = styled.section`
  height: 550px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LayoutGridButton = styled.button`
  border: none;
  background-color: transparent;

  :enabled {
    color: ${(props) => props.theme.fontColor};
  }

  :disabled {
    color: #f97b7b;
  }
`;

export const ContentContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 5px;
  margin-top: 15px;
`;

export const EmptyWatchedContainer = styled.section`
  height: 550px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ListWrapper = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
`;

export const ButtonsFlexContainer = styled.section`
  width: 100%;
  margin-bottom: 15px;
`;

export const ButtonsContainer = styled.section`
  display: flex;
  justify-content: flex-end;
`;

export const ContentContainerList = styled.section`
  margin-top: 15px;
`;

export const MediaHeader = styled.h5`
  margin-bottom: 5px;
`;
