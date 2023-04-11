import styled from "styled-components";
import Image from "next/image";
import { keyframes } from "styled-components";

export const fadeInFromBottomImage = keyframes`
    0% {
    opacity: 0;
    transform: translateY(20px) rotate(-3deg);
  }
    90% {
    transform: translateY(0);
  }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(0deg);
  }
`;

export const fadeInFromBottomText = keyframes`
    0% {
    opacity: 0;
    transform: translateY(20px) rotate(3deg);
  }
    90% {
    transform: translateY(0);
  }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(0deg);
  }
`;

export const OverviewPosterContainer = styled.div`
  height: 200px;
  width: 120px;

  animation: ${fadeInFromBottomImage} 1s ease-in-out;
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

  animation: ${fadeInFromBottomText} 1s ease-in-out;
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
