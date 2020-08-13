import React from "react";
import useFps from "./useFps";
import useStyles from "./useStyles";

interface ComponentProps {
  width?: number;
  height?: number;
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
}

const FpsView: React.FC<ComponentProps> = ({top = 0, left = 0, bottom = 'auto', right = 'auto', width = 140, height = 60}) => {
  const {fps, avgFps, maxFps, currentFps} = useFps(Math.floor(width / 2));
  const {graphStyle, barStyle, wrapperStyle} = useStyles(width, height, top, right, bottom, left, fps.length);

  return (
    // @ts-ignore
    <div style={wrapperStyle}>
      <span>{currentFps} FPS ({avgFps} Avg)</span>
      {/* @ts-ignore */}
      <div style={graphStyle}>
        {fps.map((val, i) => (
          // @ts-ignore
          <div key={i} style={barStyle((height * val) / maxFps, i)}/>
        ))}
      </div>
    </div>
  );
};

export default FpsView;
