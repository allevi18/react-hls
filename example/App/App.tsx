import Hls from 'hls.js';
import React, { useState, useRef } from 'react';

import HlsPlayer from '../../src';

function App() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hlsUrl, setHlsUrl] = useState(
    'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
  );
  const [destroy, setDestroy] = useState(false);
  const [HLSInstance, setHLSInstance] = useState<Hls>();
  const [displayHLSPrperties, setDisplayHLSPrperties] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState<number>();

  function _handleEnter(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      setHlsUrl(inputRef?.current?.value ?? '');
    }
  }

  function _handleDestroyClick() {
    setDestroy(true);
  }

  function _handleToggleControls() {
    if (playerRef?.current?.hasAttribute('controls')) {
      playerRef.current.removeAttribute('controls');
    } else {
      playerRef?.current?.setAttribute('controls', 'true');
    }
  }

  function _handleHLSInstanceClick() {
    setDisplayHLSPrperties(!displayHLSPrperties)
  }

  function getHLSInstance(hlsInstance: Hls) {
    setHLSInstance(hlsInstance);
  }

  function handleQuality(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedQuality(Number(e.target.value));
    if(HLSInstance) HLSInstance.currentLevel = Number(e.target.value);
  }

  return (
    <div>
      <div
        style={{
          margin: '0 0 20px',
        }}
      >
        <label
          style={{
            display: 'block',
            marginBottom: 10,
          }}
          htmlFor="url-input"
        >
          hls url :{' '}
        </label>
        <input
          ref={inputRef}
          id="url-input"
          type="text"
          defaultValue={hlsUrl}
          onKeyUp={_handleEnter}
          style={{
            width: '100%',
            height: '30px',
            lineHeight: '30px',
            fontSize: '16px',
            color: '#333',
          }}
        />
      </div>

      {!destroy ? (
        <HlsPlayer
          loop={true}
          width="100%"
          height="auto"
          autoPlay
          playerRef={playerRef}
          src={hlsUrl}
          getHLSInstance={getHLSInstance}
        />
      ) : null}

      <br />

      <button
        style={{
          padding: '5px 10px',
        }}
        onClick={_handleDestroyClick}
      >
        Destroy Video
      </button>

      <button
        style={{
          padding: '5px 10px',
        }}
        onClick={_handleToggleControls}
      >
        Toggle Controls (via custom ref)
      </button>
      <button
        style={{
          padding: '5px 10px',
        }}
        onClick={_handleHLSInstanceClick}
      >
        Get HLS Instance
      </button>

      {displayHLSPrperties && (
        <div
          style={{
            padding: "5px 10px",
            border: "1px solid black",
            margin: "15px 15px",
          }}
        >
          <h3>HLS Details</h3>
          <p>Total Levels: {HLSInstance?.levels?.length}</p>
          <div>
          <p>Select Quoality</p>
          <select value={selectedQuality} defaultValue={`${HLSInstance?.currentLevel}`} onChange={handleQuality}>
            {HLSInstance?.levels?.map((level, index) => {
              return <option value={`${index}`}>{level.bitrate}</option>
            })}
          </select>
          </div>
        </div>
      )}
    </div>  
  );
}

export default App;
