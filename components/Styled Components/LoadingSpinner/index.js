import styled from "styled-components";
import { keyframes } from "styled-components";
export const rotation = keyframes`
    from {
    transform: rotate(0deg);
  }
    to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid lightgrey;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;

  &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-left: 4px solid #f97b7b;
    border-bottom: 4px solid transparent;
    animation: ${rotation} 0.5s linear infinite reverse;
  }
`;

export const LoadingSpinnerButton = styled.span`
  width: 32px;
  height: 32px;
  border: 5px solid;
  border-color: white transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
