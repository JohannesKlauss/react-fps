import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';

function useFps(windowWidth) {
    var lastFpsValues = useRef([]);
    var frames = useRef(0);
    var prevTime = useRef(performance.now());
    var animRef = useRef(0);
    var _a = useState([]), fps = _a[0], setFps = _a[1];
    var calcFps = function () {
        var t = performance.now();
        frames.current += 1;
        if (t > prevTime.current + 1000) {
            var elapsedTime = t - prevTime.current;
            var currentFps_1 = Math.round((frames.current * 1000) / elapsedTime);
            lastFpsValues.current = lastFpsValues.current.concat(currentFps_1);
            if (elapsedTime > 1500) {
                for (var i = 1; i <= (elapsedTime - 1000) / 1000; i++) {
                    lastFpsValues.current = lastFpsValues.current.concat(0);
                }
            }
            lastFpsValues.current = lastFpsValues.current.slice(Math.min(lastFpsValues.current.length - windowWidth, 0));
            setFps(lastFpsValues.current);
            frames.current = 0;
            prevTime.current = performance.now();
        }
        animRef.current = requestAnimationFrame(calcFps);
    };
    useEffect(function () {
        animRef.current = requestAnimationFrame(calcFps);
        return function () {
            cancelAnimationFrame(animRef.current);
        };
    }, []);
    var avgFps = (fps.reduce(function (a, b) { return a + b; }, 0) / fps.length).toFixed(2);
    var maxFps = Math.max.apply(Math.max, fps);
    var currentFps = fps[fps.length - 1];
    return { fps: fps, avgFps: avgFps, maxFps: maxFps, currentFps: currentFps };
}

function useStyles(width, height, top, right, bottom, left, fpsLength) {
    var wrapperStyle = useMemo(function () { return ({
        zIndex: 999999,
        position: 'fixed',
        width: width + 6 + 'px',
        height: height + 30 + 'px',
        padding: '3px',
        backgroundColor: '#21006f',
        color: '#26F0FD',
        fontSize: '1rem',
        lineHeight: '1.3rem',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 300,
        boxSizing: 'border-box',
        top: top,
        right: right,
        bottom: bottom,
        left: left,
    }); }, [width, height, top, right, bottom, left]);
    var graphStyle = useMemo(function () { return ({
        position: 'absolute',
        left: '3px',
        right: '3px',
        bottom: '3px',
        height: height,
        backgroundColor: '#282844',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box'
    }); }, [height]);
    var barStyle = useCallback(function (calcHeight, i) { return ({
        position: 'absolute',
        bottom: '0',
        right: ((fpsLength - 1 - i) * 4) + 'px',
        height: calcHeight + 'px',
        width: '4px',
        backgroundColor: '#E200F7',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box'
    }); }, [fpsLength]);
    return { wrapperStyle: wrapperStyle, graphStyle: graphStyle, barStyle: barStyle };
}

var FpsView = function (_a) {
    var _b = _a.top, top = _b === void 0 ? 0 : _b, _c = _a.left, left = _c === void 0 ? 0 : _c, _d = _a.bottom, bottom = _d === void 0 ? 'auto' : _d, _e = _a.right, right = _e === void 0 ? 'auto' : _e, _f = _a.width, width = _f === void 0 ? 140 : _f, _g = _a.height, height = _g === void 0 ? 60 : _g;
    var _h = useFps(Math.floor(width / 2)), fps = _h.fps, avgFps = _h.avgFps, maxFps = _h.maxFps, currentFps = _h.currentFps;
    var _j = useStyles(width, height, top, right, bottom, left, fps.length), graphStyle = _j.graphStyle, barStyle = _j.barStyle, wrapperStyle = _j.wrapperStyle;
    return (
    // @ts-ignore
    React.createElement("div", { style: wrapperStyle },
        React.createElement("span", null,
            currentFps,
            " FPS (",
            avgFps,
            " Avg)"),
        React.createElement("div", { style: graphStyle }, fps.map(function (val, i) { return (
        // @ts-ignore
        React.createElement("div", { key: i, style: barStyle((height * val) / maxFps, i) })); }))));
};

export { FpsView, useFps };
//# sourceMappingURL=index.es.js.map
