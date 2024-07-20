import React, { useRef } from 'react';
import ThumbnailPreview from './Components/ThumbnailPreview';
import './VideoPlayer.css';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const spriteSheet = 'http://localhost:3001/public/sprite.png'; 
  const spriteWidth = 100; 
  const spriteHeight = 100; 
  const thumbnailsCount = 2; 

  return (
    <div className="video-player">
      <video ref={videoRef} controls width="600">
        <source src="../public/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <ThumbnailPreview
        videoRef={videoRef}
        spriteSheet={spriteSheet}
        spriteWidth={spriteWidth}
        spriteHeight={spriteHeight}
        thumbnailsCount={thumbnailsCount}
      />
    </div>
  );
};

export default VideoPlayer;
