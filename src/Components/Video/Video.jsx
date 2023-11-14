import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import Modal from "../Modal/Modal";

const Video = () => {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  const handleDuration = (videoDuration) => {
    setDuration(videoDuration);
  };

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds);

    // Pause the video at a specific time (e.g., 5 seconds)
    const specificTimeToPause = 10;
    if (
      state.playedSeconds >= specificTimeToPause &&
      !shouldPause &&
      !videoAccepted
    ) {
      setShouldPause(true);
      setIsModalOpen(true);
    }
  };

  const handleReady = () => {
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration());
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  console.log(formatTime(currentTime));
  console.log(formatTime(duration));

  return (
    <div className="h-screen overflow-y-hidden bg-herobg pt-28">
      <div className="video mx-auto w-[95%]  sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
        <ReactPlayer
          ref={playerRef}
          url="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          controls
          width="100%"
          height="10%"
          playing={!shouldPause && !videoAccepted}
          onPlay={() => console.log("Playing")}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload nofullscreen noremoteplayback",
                disablePictureInPicture: true,
              },
            },
          }}
          onContextMenu={(e) => e.preventDefault()}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onReady={handleReady}
        />
        <p>Current Time: {formatTime(currentTime)}</p>
        <p>Video Duration: {formatTime(duration)}</p>
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
