import Image from "next/image";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { keyframes } from "styled-components";

export const fadeInFromBottomWithScale = keyframes`
    0% {
    opacity: 0;
    transform: translateY(20px) scale(0.2);
  }
    100% {
      opacity: 1;
      transform: translateY(0)  scale(1);
  }
`;

export const fadeInFromBottom = keyframes`
    0% {
    opacity: 0;
    transform: translateY(20px);
  }
    100% {
      opacity: 1;
      transform: translateY(0);
  }
`;

export const DetailPageDescription = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DetailPageDescriptionText = styled.h4`
  margin: 15px;
  margin-top: 0;
`;

export const TrailerButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  border: none;
  margin-bottom: 15px;
  cursor: pointer;
  animation: ${fadeInFromBottom} 2s ease-in-out;
`;

export const DetailPoster = styled(Image)`
  border-radius: 30px;
  animation: ${fadeInFromBottomWithScale} 1s ease-in-out;
`;

export const DetailPosterContainer = styled.section`
  display: flex;
  justify-content: center;
`;

export const DetailHeaderContainer = styled.section`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInFromBottomWithScale} 2s ease-in-out;
`;

export const DetailHeaderTitle = styled.h2`
  margin: 5px;
  text-align: center;
`;

export const DetailHeaderText = styled.p`
  color: grey;
  margin: 5px;
  font-family: system-ui;
`;

export const DetailSynopsisText = styled.p`
  color: grey;
  font-family: system-ui;
  animation: ${fadeInFromBottom} 3s ease-in-out;
`;

export const DetailSynopsis = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const DetailSynopsisHeader = styled.h4`
  align-self: flex-start;
  margin: 0;
  animation: ${fadeInFromBottom} 3s ease-in-out;
`;

export const Trailer = styled(ReactPlayer)`
  margin-bottom: 15px;
  align-self: flex-start;
  animation: ${fadeInFromBottomWithScale} 1s ease-in-out;
`;

export const TrailerContainer = styled.section`
  align-self: center;
`;

export const DetailAvailability = styled.section`
  padding-left: 15px;
  animation: ${fadeInFromBottom} 4s ease-in-out;
`;

export const DetailAvailabilityHeading = styled.h4`
  margin-bottom: 5px;
`;

export const DetailAvailabilityText = styled.p`
  margin-top: 5px;
  color: gray;
  font-family: system-ui;
`;
