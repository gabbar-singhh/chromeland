import React from "react";
import ReactAudioPlayer from "react-audio-player";

const Audio = ({ audioSrc, play }) => {
  return <ReactAudioPlayer src={audioSrc} autoPlay={play} controls />;
};

export default Audio;
