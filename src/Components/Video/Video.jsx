import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import Modal from "../Modal/Modal";

const Video = () => {
  const playerRef = useRef(null);
  const [playedSecondsWhole, setPlayedSecondsWhole] = useState(0);
  const [shouldPause, setShouldPause] = useState(false);
  const [videoAccepted, setVideoAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldPause(false);
  };

  const handleAccept = () => {
    setVideoAccepted(true);
    closeModal();
    setShouldPause(false);
  };

  const handleProgress = (state) => {
    const currentSecondsWhole = Math.round(state.playedSeconds);
    setPlayedSecondsWhole(currentSecondsWhole);

    if (playedSecondsWhole === 5) {
      handlePause(5);
    }
    if (playedSecondsWhole === 10) {
      handlePause1(10);
    }
  };

  const handlePause1 = (specificTimeToPause) => {
    const tolerance = 0.5;

    if (
      Math.abs(playedSecondsWhole - specificTimeToPause) < tolerance &&
      !shouldPause &&
      !videoAccepted
    ) {
      console.log("handlePause1 not working");
    } else {
      console.log("Pausing at", specificTimeToPause, "seconds");
      setShouldPause(true);
      setIsModalOpen(true);
    }
  };

  const handlePause = (specificTimeToPause) => {
    const tolerance = 0.5;
    if (
      Math.abs(playedSecondsWhole - specificTimeToPause) < tolerance &&
      !shouldPause &&
      !videoAccepted
    ) {
      console.log("working");
      console.log("Pausing at", specificTimeToPause, "seconds");
      setShouldPause(true);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="h-screen overflow-y-hidden bg-herobg pt-28">
      <div className="video mx-auto w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
        <ReactPlayer
          ref={playerRef}
          url="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          controls
          width="100%"
          height="10%"
          playing={!shouldPause}
          onPlay={() => console.log("Playing")}
          onContextMenu={(e) => e.preventDefault()}
          onProgress={handleProgress}
        />
        <p>PlayedSeconds : {playedSecondsWhole}</p>
      </div>

      <Modal
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleAccept={handleAccept}
      />
    </div>
  );
};

export default Video;
