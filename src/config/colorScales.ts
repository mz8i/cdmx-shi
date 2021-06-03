import { scaleThreshold } from 'd3-scale';
import * as d3 from 'd3-color';
import { RGBAColor } from '@deck.gl/core';
import { objectMap } from '../util';

export const RAW_SCALES = {
  SHI: [
    { from: 0, to: 0.6, class: "Little to no", color: "#003496" },
    { from: 0.6, to: 0.8, class: "Little to no", color: "#567bbb" },
    { from: 0.8, to: 1, class: "Little to no", color: "#adc3e0" },
    { from: 1, to: 1.2, class: "Moderate", color: "#fef9e4" },
    { from: 1.2, to: 1.4, class: "Moderate", color: "#fee2a4" },
    { from: 1.4, to: 1.6, class: "Moderate", color: "#fdca65" },
    { from: 1.6, to: 1.8, class: "Moderate", color: "#fdb225" },
    { from: 1.8, to: 2, class: "Moderate", color: "#ee8311" },
    { from: 2, to: 2.2, class: "Significant", color: "#d4411e" },
    { from: 2.2, to: 2.4, class: "Significant", color: "#bd1a21" },
    { from: 2.4, to: 2.6, class: "Significant", color: "#ab1319" },
    { from: 2.6, to: 2.8, class: "Significant", color: "#990d10" },
    { from: 2.8, to: 3, class: "Significant", color: "#870608" },
    { from: 3, to: 8, class: "Extreme", color: "#750000" },
  ],
  WSI: [
    { from: 0, to: 0.1, class: "Very low", color: "#ffffff" },
    { from: 0.1, to: 0.2, class: "Very low", color: "#ffffff" },
    { from: 0.2, to: 0.3, class: "Low", color: "#ffffff" },
    { from: 0.3, to: 0.4, class: "Low", color: "#ffffff" },
    { from: 0.4, to: 0.5, class: "Moderate", color: "#ffffff" },
    { from: 0.5, to: 0.6, class: "Moderate", color: "#dff6fa" },
    { from: 0.6, to: 0.7, class: "High", color: "#87cce1" },
    { from: 0.7, to: 0.8, class: "High", color: "#2fa2c7" },
    { from: 0.8, to: 0.9, class: "Very high", color: "#01568b" },
    { from: 0.9, to: 1, class: "Very high", color: "#00316b" },
  ],
  ACI: [
    { from: 0, to: 0.1, class: "Very low", color: "#00403F" },
    { from: 0.1, to: 0.2, class: "Very low", color: "#005651" },
    { from: 0.2, to: 0.3, class: "Low", color: "#006D64" },
    { from: 0.3, to: 0.4, class: "Low", color: "#008476" },
    { from: 0.4, to: 0.5, class: "Moderate", color: "#009B89" },
    { from: 0.5, to: 0.6, class: "Moderate", color: "#19B09E" },
    { from: 0.6, to: 0.7, class: "High", color: "#4CC2B6" },
    { from: 0.7, to: 0.8, class: "High", color: "#7FD5CE" },
    { from: 0.8, to: 0.9, class: "Very high", color: "#B2E7E6" },
    { from: 0.9, to: 1, class: "Very high", color: "#E5FAFE" },
  ],
};

export const COLOR_SCALES = objectMap(RAW_SCALES, (x) => {
  return scaleThreshold<number, RGBAColor>()
    .domain(x.map((x) => x.to))
    .range(x.map((x) => hexToDeckColor(x.color)))
});
//   x.map((elem) => ({
//     ...elem,
//     color: hexToDeckColor(elem.color),
//   }))
// );

function hexToDeckColor(hex: string): RGBAColor {
  let c = d3.color(hex);
  if(c == undefined) {
    return [0, 0, 0, 255];
  } else {
    c = c.rgb();
    return [c.r, c.g, c.b, c.opacity * 255];
  }
}

// export const colorScaleFunctions = objectMap(COLOR_SCALES,
//   x => scaleThreshold<number, RGBAColor>()
//     .domain(x.map((x) => x.to))
//     .range(x.map((x) => x.color))
// );
