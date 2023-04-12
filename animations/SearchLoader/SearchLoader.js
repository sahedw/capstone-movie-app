import React from "react";
import Lottie from "react-lottie";
import animationData from "./103853-searching.json";

export default function SearchLoader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Lottie options={defaultOptions} />
    </>
  );
}
