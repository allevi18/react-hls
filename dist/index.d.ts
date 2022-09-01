import React, { RefObject } from 'react';
import Hls, { Config } from 'hls.js';
export interface HlsPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    hlsConfig?: Config;
    playerRef: RefObject<HTMLVideoElement>;
    src: string;
    getHLSInstance?: (HLSInstance: Hls) => void;
}
declare function ReactHlsPlayer({ hlsConfig, playerRef, src, autoPlay, getHLSInstance, ...props }: HlsPlayerProps): JSX.Element;
export default ReactHlsPlayer;
