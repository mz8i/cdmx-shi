import { scaleThreshold } from 'd3-scale';
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
  CW_sqm: [
    { from: 0, to: 286, color: "#EAEBB2" },
    { from: 286, to: 918, color: "#D6D996" },
    { from: 918, to: 1822, color: "#C3C87B" },
    { from: 1822, to: 3134, color: "#B0B760" },
    { from: 3134, to: 4986, color: "#9CA645" },
    { from: 4986, to: 7960, color: "#889334" },
    { from: 7960, to: 12620, color: "#727F2E" },
    { from: 12620, to: 20796, color: "#5D6A28" },
    { from: 20796, to: 41446, color: "#475522" },
    { from: 41446, to: 500000, color: "#32411C" },
  ],
  CW_budget: [
    { from: 0, to: 72000, color: "#EAEBB2" },
    { from: 72000, to: 426384000, color: "#D6D996" },
    { from: 426384000, to: 1038780000, color: "#C3C87B" },
    { from: 1038780000, to: 1726308000, color: "#B0B760" },
    { from: 1726308000, to: 2561544000, color: "#9CA645" },
    { from: 2561544000, to: 3516336000, color: "#889334" },
    { from: 3516336000, to: 4961268000, color: "#727F2E" },
    { from: 4961268000, to: 6366888000, color: "#5D6A28" },
    { from: 6366888000, to: 9068724000, color: "#475522" },
    { from: 9068724000, to: 10000000000, color: "#32411C" },
  ],
};

export const COLOR_SCALES = objectMap(RAW_SCALES, (x) => {
  const d3Scale = scaleThreshold<number, string>()
    .domain(x.map((x) => x.to))
    .range(x.map((x) => x.color))

  return (val: number) => {
    if(val == null) {
      return "rgba(0,0,0,0)";
    } else return d3Scale(val);
  }
});
