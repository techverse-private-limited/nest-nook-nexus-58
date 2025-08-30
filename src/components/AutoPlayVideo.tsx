
import React, { useEffect, useRef, useState } from 'react';

type AutoPlayVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  loop?: boolean;
};

const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({ src, className = '', poster = '/placeholder.svg', loop = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  // Convert Google Drive URL to embed URL for better video streaming
  const getEmbedVideoUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      if (fileId) {
        // Use the embed format which works better for videos
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return url;
  };

  const embedSrc = getEmbedVideoUrl(src);
  const isGoogleDriveVideo = src.includes('drive.google.com');

  useEffect(() => {
    const v = videoRef.current;
    if (!v || isGoogleDriveVideo) return; // Skip autoplay logic for Google Drive videos

    // Ensure attributes that help with autoplay policies
    v.muted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.loop = loop ?? true;

    const tryPlay = () => {
      if (!v) return;
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.catch((err) => {
          console.log('[AutoPlayVideo] Autoplay attempt failed, will retry on interaction.', err);
        });
      }
    };

    // Try immediately and on key media readiness events
    tryPlay();
    v.addEventListener('loadedmetadata', tryPlay);
    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('canplay', tryPlay);

    // As a fallback, attempt on common interactions and visibility changes
    const onInteract = () => tryPlay();
    document.addEventListener('visibilitychange', onInteract);
    window.addEventListener('focus', onInteract);
    window.addEventListener('click', onInteract, { once: false });
    window.addEventListener('touchstart', onInteract, { once: false });

    return () => {
      v.removeEventListener('loadedmetadata', tryPlay);
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', onInteract);
      window.removeEventListener('focus', onInteract);
      window.removeEventListener('click', onInteract);
      window.removeEventListener('touchstart', onInteract);
    };
  }, [embedSrc, loop, isGoogleDriveVideo]);

  // For Google Drive videos, use iframe embed
  if (isGoogleDriveVideo) {
    return (
      <div className="relative">
        <iframe
          src={embedSrc}
          className={`${className} w-full aspect-video`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
          title="Video from Google Drive"
        />
      </div>
    );
  }

  // For regular video files
  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={embedSrc}
        className={className}
        muted
        playsInline
        autoPlay
        loop={loop}
        preload="auto"
        poster={poster}
        aria-label="Autoplaying video"
        controls
        onError={(e) => {
          console.error('Video failed to load:', e);
          console.log('Attempted URL:', embedSrc);
          setShowFallback(true);
        }}
        onLoadedData={() => setShowFallback(false)}
      />
      {/* Fallback message if video fails to load */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <p>Video unavailable</p>
        </div>
      )}
    </div>
  );
};

export default AutoPlayVideo;
