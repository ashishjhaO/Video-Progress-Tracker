import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="App">
      <h2>Lecture Progress Tracker</h2>
      <VideoPlayer videoSrc="/lecture.mp4" /> {/* duration in seconds */}
    </div>
  );
}

export default App;
