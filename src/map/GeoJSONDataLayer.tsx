import React, { useCallback, useEffect, useRef } from "react";
import { GeoJSON } from 'react-leaflet';

import { COLOR_SCALES } from "../config/color-scales";
import { VariableSpec } from "../data-types";


const MemoizedGeoJSONLayer = React.memo(GeoJSON);


interface GeoJSONDataLayerProps {
  data: any;
  layerDefinition: any;
  onFeatureHover: (x) => void;
  type?: 'border' | 'data';
  variableSpec?: VariableSpec;
}

export function GeoJSONDataLayer({
  data,
  layerDefinition,
  onFeatureHover,
  type = "border",
  variableSpec = undefined,
}: GeoJSONDataLayerProps) {
  const layerRef = useRef<any>();
  const featureLookup = useRef<any>({});
  const hovered = useRef<any>();
  const styleFn = useRef<any>();

  // const [featureHover, setFeatureHover] = useState<any>();
  // useEffect(() => onFeatureHover(featureHover), [featureHover, onFeatureHover]);

  
  const getStyle = useCallback((x, highlighted) => {
    const dataStyle =
      variableSpec == null
        ? {
            fillOpacity: 0,
          }
        : {
            fillColor: COLOR_SCALES[variableSpec.variable](
              x.properties[variableSpec.fullName]
            ),
            fillOpacity: 1,
          };
    const highlightStyle = highlighted ? layerDefinition.highlightStyle : {};

    return {
      ...layerDefinition.borderStyle,
      ...dataStyle,
      ...highlightStyle
    }
  }, [layerDefinition, variableSpec]);

  useEffect(() => {
    styleFn.current = getStyle;

    layerRef.current?.eachLayer((layer) => {
      const layerId = layer._leaflet_id;
      const x = featureLookup.current[layerId];

      const style = getStyle(x, x === hovered.current);
      layer.setStyle(style);
    });
  }, [getStyle]);

  const onHover = useCallback((feature) => {
    hovered.current = feature;
    onFeatureHover(feature);
  }, [onFeatureHover]);

  const onMouseOver = useCallback((layer, feature) => {
    const style = styleFn.current?.(feature, true);
    style && layer.setStyle(style);
    layer.bringToFront();
    onHover(feature);
  }, [onHover]);

  const onMouseOut = useCallback((layer, feature) => {
    const style = styleFn.current?.(feature, false);
    style && layer.setStyle(style);
    onHover(null);
  }, [onHover]);

  const onEachFeature = useCallback(
    (feature, layer) => {
      console.log('on each feature');
      const layerId = feature.properties.ID_colonia;
      layer._leaflet_id = layerId;
      featureLookup.current[layerId] = feature;

      layer.on("mouseover", () => onMouseOver(layer, feature));
      layer.on("mouseout", () => onMouseOut(layer, feature));
    },
    [onMouseOver, onMouseOut]
  );

  return (
    <MemoizedGeoJSONLayer
      ref={layerRef}
      data={data}
      interactive={type === "data"}
      style={layerDefinition.borderStyle}
      onEachFeature={onEachFeature}
    />
  );
};