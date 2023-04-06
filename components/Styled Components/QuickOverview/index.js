import styled from "styled-components";
import Image from "next/image";

export const OverviewPosterContainer = styled.div`
  height: 200px;
  width: 120px;
`;

export const OverviewWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  transition: 0.3s ease-out;

  :hover {
    transform: translateY(-10px);
  }
`;

export const OverviewTextContainer = styled.section`
  width: 200px;
  margin-left: 20px;
  padding-left: 10px;
`;

export const OverviewText = styled.p`
  color: gray;
`;

export const OverviewPoster = styled(Image)`
  border-radius: 15px;
`;

export const OverviewHeader = styled.h4`
  color: ${(props) => props.theme.fontColor};
`;
