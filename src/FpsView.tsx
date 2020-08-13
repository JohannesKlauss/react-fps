import React, {useEffect, useRef, useState} from "react";

interface ComponentProps {
  width?: number;
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
}

const FpsView: React.FC<ComponentProps> = ({top = 0, left = 0, bottom = 'auto', right = 'auto', width = 70,}) => {
  const lastFpsValues = useRef<number[]>([]);
  const frames = useRef(0);
  const prevTime = useRef(performance.now());
  const animRef = useRef(0);
  const [fps, setFps] = useState<number[]>([]);

  const calcFps = () => {
    const t = performance.now();

    frames.current += 1;

    if (t > prevTime.current + 1000) {
      let currentFps = Math.round((frames.current * 1000) / (t - prevTime.current));

      lastFpsValues.current.concat(currentFps);
      lastFpsValues.current.slice(Math.min(lastFpsValues.current.length - width, 0));

      setFps(lastFpsValues.current);

      frames.current = 0;
      prevTime.current = t;
    }

    animRef.current = requestAnimationFrame(calcFps);
  };

  useEffect(() => {
    animRef.current = requestAnimationFrame(calcFps);

    return () => {
      cancelAnimationFrame(animRef.current);
    }
  }, []);

  return <div>{fps[fps.length - 1]} FPS</div>;
};

export default FpsView;
