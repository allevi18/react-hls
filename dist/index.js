var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState } from 'react';
import Hls from 'hls.js';
function ReactHlsPlayer(_a) {
    var hlsConfig = _a.hlsConfig, _b = _a.playerRef, playerRef = _b === void 0 ? React.createRef() : _b, src = _a.src, autoPlay = _a.autoPlay, getHLSInstance = _a.getHLSInstance, props = __rest(_a, ["hlsConfig", "playerRef", "src", "autoPlay", "getHLSInstance"]);
    var _c = useState(), hlsInstance = _c[0], setHlsInstance = _c[1];
    useEffect(function () {
        var hls;
        function _initPlayer() {
            if (hls != null) {
                hls.destroy();
            }
            var newHls = new Hls(__assign({ enableWorker: false }, hlsConfig));
            if (playerRef.current != null) {
                newHls.attachMedia(playerRef.current);
            }
            newHls.on(Hls.Events.MEDIA_ATTACHED, function () {
                newHls.loadSource(src);
                newHls.on(Hls.Events.MANIFEST_PARSED, function () {
                    var _a;
                    if (autoPlay) {
                        (_a = playerRef === null || playerRef === void 0 ? void 0 : playerRef.current) === null || _a === void 0 ? void 0 : _a.play().catch(function () {
                            return console.log('Unable to autoplay prior to user interaction with the dom.');
                        });
                    }
                });
            });
            newHls.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            newHls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            newHls.recoverMediaError();
                            break;
                        default:
                            _initPlayer();
                            break;
                    }
                }
            });
            setHlsInstance(newHls);
            hls = newHls;
        }
        if (Hls.isSupported()) {
            _initPlayer();
        }
        return function () {
            if (hls != null) {
                hls.destroy();
            }
        };
    }, [autoPlay, hlsConfig, playerRef, src]);
    useEffect(function () {
        if (getHLSInstance && hlsInstance) {
            getHLSInstance(hlsInstance);
        }
    }, [hlsInstance]);
    if (Hls.isSupported())
        return React.createElement("video", __assign({ ref: playerRef }, props));
    return React.createElement("video", __assign({ ref: playerRef, src: src, autoPlay: autoPlay }, props));
}
export default ReactHlsPlayer;
