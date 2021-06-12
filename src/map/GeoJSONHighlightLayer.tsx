import React, { useCallback, useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

const MemoizedGeoJSONLayer = React.memo(GeoJSON);

interface GeoJSONHighlightLayerProps {
    data: any;
    layerDefinition: any;
    onFeatureHover?: (x) => void;
    getId?;
    highlightedFeatures?: any[];
}

export function GeoJSONHighlightLayer({
    data,
    layerDefinition,
    onFeatureHover,
    getId,
    highlightedFeatures,
}: GeoJSONHighlightLayerProps) {
    const layerRef = useRef<any>();
    const featureLookup = useRef<any>({});

    const styleFn = useRef<any>();

    const getStyle = useCallback(
        (x, hovered, highlighted = false) => {
            const highlightStyle = highlighted ? layerDefinition.highlightStyle : {};
            const hoveredStyle = hovered ? layerDefinition.hoverStyle : {};

            return {
                // fillOpacity: 0,
                ...highlightStyle,
                ...hoveredStyle,
            };
        },
        [layerDefinition],
    );

    const hovered = useRef<any>();

    useEffect(() => {
        styleFn.current = getStyle;

        // layerRef.current?.eachLayer((layer) => {
        //   const layerId = layer._leaflet_id;
        //   const x = featureLookup.current[layerId];

        //   if (x != null) {
        //     const isHovered = x === hovered.current;
        //     const isHighlighted = highlightedFeatures?.includes(x);

        //     const style = getStyle(x, isHovered, isHighlighted);
        //     layer.setStyle(style);
        //     if (isHighlighted || isHovered) {
        //       layer.bringToFront();
        //     }
        //   }
        // });
    }, [getStyle, highlightedFeatures]);

    const onHover = useCallback(
        feature => {
            hovered.current = feature;
            onFeatureHover?.(feature);
        },
        [onFeatureHover],
    );

    const onMouseOver = useCallback(
        (layer, feature) => {
            console.log('mouseover', feature);
            const style = styleFn.current?.(feature, true);
            style && layer.setStyle(style);
            // layer.bringToFront();
            onHover(feature);
        },
        [onHover],
    );

    const onMouseOut = useCallback(
        (layer, feature) => {
            console.log('mouseout', feature);
            layerRef.current?.resetStyle(layer);
            // const style = styleFn.current?.(feature, false);
            // style && layer.setStyle(style);
            onHover(null);
        },
        [onHover],
    );

    const onEachFeature = useCallback(
        (feature, layer) => {
            console.log('highlight OEF');
            const layerId = getId(feature);
            layer._leaflet_id = layerId;
            featureLookup.current[layerId] = feature;

            layer.on('mouseover', () => onMouseOver(layer, feature));
            layer.on('mouseout', () => onMouseOut(layer, feature));
        },
        [getId, onMouseOver, onMouseOut],
    );

    return (
        <MemoizedGeoJSONLayer
            ref={layerRef}
            data={data}
            interactive={true}
            style={layerDefinition.borderStyle}
            onEachFeature={onEachFeature}
        />
    );
}
