import React from "react";
import {FpsView} from "./index";
import {withKnobs, number, button} from '@storybook/addon-knobs';

function fibonacci(x) {
  if (x <= 0) return 0;
  if (x == 1) return 1;
  return fibonacci(x - 1) + fibonacci(x - 2);
}

export default {
  title: "FpsView",
  decorators: [withKnobs],
};

// Knobs as dynamic variables.
export const asDynamicVariables = () => {
  const width = number('Width', 140);
  const height = number('Height', 60);
  const top = number('Top', 20);
  const left = number('Left', 20);

  button(`Calculate fib 35`, () => fibonacci(35));
  button('Calculate fib 40', () => fibonacci(40));
  button('Calculate fib 43', () => fibonacci(43));

  return <FpsView width={width} height={height} top={top} left={left}/>;
};