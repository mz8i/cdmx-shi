import React, { useCallback, useEffect, useRef } from "react";
import { GeoJSON } from 'react-leaflet';


const MemoizedGeoJSONLayer = React.memo(GeoJSON);


interface GeoJSONDataLayerProps {
  data: any;
  layerDefinition: any;
  onFeatureHover?: (x) => void;
  type?: "border" | "data";
  getId?;
  getData?;
  getDataColor?;
  highlightedFeatures?: any[];
}

export function GeoJSONDataLayer({
  data,
  layerDefinition,
  onFeatureHover,
  type = "border",
  getId,
  getData,
  getDataColor,
  highlightedFeatures
}: GeoJSONDataLayerProps) {
  const layerRef = useRef<any>();
  const featureLookup = useRef<any>({});

  const styleFn = useRef<any>();

  const getStyle = useCallback(
    (x, hovered, highlighted = false) => {
      const dataStyle = 
        (getData && getDataColor)
          ? {
              fillColor: getDataColor(getData(x)),
              fillOpacity: 1,
            } 
          : {};
      const highlightStyle = highlighted ? layerDefinition.highlightStyle : {};
      const hoveredStyle = hovered ? layerDefinition.hoverStyle : {};

      return {
        fillOpacity: 0,
        ...layerDefinition.borderStyle,
        ...dataStyle,
        ...highlightStyle,
        ...hoveredStyle,
      };
    },
    [getData, getDataColor, layerDefinition]
  );

  const hovered = useRef<any>();

  useEffect(() => {
    styleFn.current = getStyle;

    layerRef.current?.eachLayer((layer) => {
      const layerId = layer._leaflet_id;
      const x = featureLookup.current[layerId];

      if(x != null) {
        const isHovered = x === hovered.current;
        const isHighlighted = highlightedFeatures?.includes(x);

        const style = getStyle(x, isHovered, isHighlighted);
        layer.setStyle(style);
        if(isHighlighted || isHovered) {
          layer.bringToFront();
        }
      }
    });
  }, [getStyle, highlightedFeatures]);

  const onHover = useCallback((feature) => {
    hovered.current = feature;
    onFeatureHover?.(feature);
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
      const layerId = getId(feature);
      layer._leaflet_id = layerId;
      featureLookup.current[layerId] = feature;

      layer.on("mouseover", () => onMouseOver(layer, feature));
      layer.on("mouseout", () => onMouseOut(layer, feature));
    },
    [getId, onMouseOver, onMouseOut]
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