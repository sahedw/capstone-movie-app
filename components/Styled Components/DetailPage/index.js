import Image from "next/image";
import ReactPlayer from "react-player";
import styled from "styled-components";

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
`;

export const DetailPoster = styled(Image)`
  border-radius: 30px;
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
`;

export const DetailHeaderTitle = styled.h2`
  margin: 5px;
  text-align: center;
`;

export const DetailHeaderText = styled.p`
  color: grey;
  margin: 5px;
`;

export const DetailSynopsisText = styled.p`
  color: grey;
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
`;

export const Trailer = styled(ReactPlayer)`
  margin-bottom: 15px;
  align-self: flex-start;
`;

export const TrailerContainer = styled.section`
  align-self: center;
`;

export const DetailAvailability = styled.section`
  padding-left: 15px;
`;

export const DetailAvailabilityHeading = styled.h4`
  margin-bottom: 5px;
`;

export const DetailAvailabilityText = styled.p`
  margin-top: 5px;
  color: gray;
`;
