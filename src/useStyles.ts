import {useCallback, useMemo} from "react";

type CssProp = number | string;

export default function useStyles(width: number, height: number, top: CssProp, right: CssProp, bottom: CssProp, left: CssProp, fpsLength: number) {
  const wrapperStyle = useMemo(() => ({
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
    top,
    right,
    bottom,
    left,
  }), [width, height, top, right, bottom, left]);

  const graphStyle = useMemo(() => ({
    position: 'absolute',
    left: '3px',
    right: '3px',
    bottom: '3px',
    height,
    backgroundColor: '#282844',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box'
  }), [height]);

  const barStyle = useCallback((calcHeight, i) => ({
    position: 'absolute',
    bottom: '0',
    right: ((fpsLength - 1 - i) * 4) + 'px',
    height: calcHeight + 'px',
    width: '4px',
    backgroundColor: '#E200F7',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box'
  }), [fpsLength]);

  return {wrapperStyle, graphStyle, barStyle};
}