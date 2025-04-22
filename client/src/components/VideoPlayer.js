import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [currentStart, setCurrentStart] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Start tracking when user starts playing
  const handlePlay = () => {
    setCurrentStart(videoRef.current.currentTime);
  };

  // Stop tracking and record interval
  const handlePauseOrSeek = () => {
    const end = videoRef.current.currentTime;
    if (currentStart !== null && Math.abs(end - currentStart) > 1) {
      addInterval([currentStart, end]);
    }
    setCurrentStart(null);
  };

  const addInterval = (newInterval) => {
    const updated = mergeIntervals([...watchedIntervals, newInterval]);
    setWatchedIntervals(updated);
    calculateProgress(updated);
  };

  const calculateProgress = (intervals) => {
    const watched = intervals.reduce((acc, [start, end]) => acc + (end - start), 0);
    const percent = (watched / duration) * 100;
    setProgress(percent.toFixed(2));
  };

  const mergeIntervals = (intervals) => {
    const sorted = intervals.sort((a, b) => a[0] - b[0]);
    const merged = [];

    for (let interval of sorted) {
      if (!merged.length || merged[merged.length - 1][1] < interval[0]) {
        merged.push(interval);
      } else {
        merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
      }
    }
    return merged;
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        width="640"
        height="360"
        controls
        onPlay={handlePlay}
        onPause={handlePauseOrSeek}
        onSeeked={handlePauseOrSeek}
        onEnded={handlePauseOrSeek}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}  // ← yeh line important hai!
        >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <p>Progress: {progress}%</p>
    </div>
  );
};

export default VideoPlayer;
