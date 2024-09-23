import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';


const ScreenShared = () => {
  const videoRef = useRef(null);

  useEffect(() => {
      const ws = new WebSocket('ws://127.0.0.1:3001');

      ws.binaryType = 'arraybuffer';

      ws.onmessage = (event) => {
          if (videoRef.current) {
              const blob = new Blob([event.data], { type: 'video/mp4' });
              const url = URL.createObjectURL(blob);
              videoRef.current.src = url;
              videoRef.current.play();
          }
      };

      return () => {
          ws.close();
      };
  }, []);

  return (
      <div>
          <h1>Espelhamento de Tela</h1>
          <video ref={videoRef} id='video' controls autoPlay style={{ maxWidth: '100%' }} />
      </div>
  );
};

export default ScreenShared;