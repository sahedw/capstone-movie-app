import React from "react";
import Lottie from "react-lottie";
import animationData from "./139065-drum-roll.json";

export default function DrumRoll() {
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
