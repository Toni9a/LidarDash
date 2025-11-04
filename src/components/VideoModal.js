import React from 'react';

const VideoModal = ({ showVideo, onClose }) => {
  if (!showVideo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Live LiDAR Platform Feed</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>
        <video
          controls
          autoPlay
          className="w-full rounded-lg"
          src="/videos/lidar-platform.mp4"
        >
          Your browser does not support the video tag.
          <p className="text-white mt-4">
            Please add your LiDAR video to public/videos/lidar-platform.mp4
          </p>
        </video>
      </div>
    </div>
  );
};

export default VideoModal;