import React from "react";
import Lottie from "react-lottie";
import animationData from "./81986-movie.json";

export default function Clipperboard() {
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
