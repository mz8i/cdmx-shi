import React, { useCallback, useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';

import { mapStyles } from '../config/map-layers';
import { DataFeature } from '../data/data-context';

const MemoizedGeoJSONLayer = React.memo(GeoJSON);

interface GeoJSONDataLayerProps {
    data: any;
    layerDefinition: any;
    onFeatureHover?: (x) => void;
    type?: 'border' | 'data';
    getId?;
    getData?;
    getDataColor?;
    highlightedFeature?: DataFeature;
    selectedFeature?: DataFeature;
    onFeatureSelect?: (x: DataFeature) => void;
}

export function GeoJSONDataLayer({
    data,
    layerDefinition,
    onFeatureHover,
    type = 'border',
    getId,
    getData,
    getDataColor,
    highlightedFeature,
    selectedFeature,
    onFeatureSelect,
}: GeoJSONDataLayerProps) {
    const layerRef = useRef<any>();
    const featureLookup = useRef<any>({});

    const styleFn = useRef<any>();
    const selectionRef = useRef<any>();

    const getStyle = useCallback(
        (x, hovered, highlighted = false, selected = false) => {
            const baseStyle =
                type === 'data' ? layerDefinition.dataStyle : layerDefinition.borderStyle;

            const dataStyle =
                getData && getDataColor
                    ? {
                          fillColor: getDataColor(getData(x)),
                          fillOpacity: 1,
                      }
                    : {};

            const highlightStyle = highlighted
                ? layerDefinition.highlightStyle ?? mapStyles.highlightStyle
                : {};
            const hoveredStyle = hovered ? layerDefinition.hoverStyle ?? mapStyles.hoverStyle : {};
            const selectedStyle = selected
                ? layerDefinition.selectedStyle ?? mapStyles.selectedStyle
                : {};

            return {
                fillOpacity: 0,
                ...baseStyle,
                ...dataStyle,
                ...highlightStyle,
                ...hoveredStyle,
                ...selectedStyle,
            };
        },
        [getData, getDataColor, layerDefinition, type],
    );

    const hovered = useRef<any>();

    useEffect(() => {
        styleFn.current = getStyle;
        selectionRef.current = selectedFeature;

        layerRef.current?.eachLayer(layer => {
            const layerId = layer._leaflet_id;
            const x = featureLookup.current[layerId];

            if (x != null) {
                const isHovered = x === hovered.current;
                const isHighlighted = highlightedFeature === x;
                const isSelected = selectedFeature === x;

                const style = getStyle(x, isHovered, isHighlighted, isSelected);
                layer.setStyle(style);
                if (isHighlighted || isHovered || isSelected) {
                    layer.bringToFront();
                }
            }
        });
    }, [getStyle, highlightedFeature, selectedFeature]);

    const onHover = useCallback(
        feature => {
            hovered.current = feature;
            onFeatureHover?.(feature);
        },
        [onFeatureHover],
    );

    const onMouseOver = useCallback(
        (layer, feature) => {
            const style = styleFn.current?.(
                feature,
                true,
                null,
                selectionRef.current != null && selectionRef.current === feature,
            );
            style && layer.setStyle(style);
            layer.bringToFront();
            onHover(feature);
        },
        [onHover],
    );

    const onMouseOut = useCallback(
        (layer, feature) => {
            const style = styleFn.current?.(
                feature,
                false,
                null,
                selectionRef.current != null && selectionRef.current === feature,
            );
            style && layer.setStyle(style);
            onHover(null);
        },
        [onHover],
    );

    const onClick = useCallback(
        (layer, feature) => {
            const newSelection = feature === selectionRef.current ? null : feature;
            onFeatureSelect?.(newSelection);
        },
        [onFeatureSelect],
    );

    const onEachFeature = useCallback(
        (feature, layer) => {
            const layerId = getId(feature);
            layer._leaflet_id = layerId;
            featureLookup.current[layerId] = feature;

            layer.on('mouseover', () => onMouseOver(layer, feature));
            layer.on('mouseout', () => onMouseOut(layer, feature));
            layer.on('click', () => onClick(layer, feature));
        },
        [getId, onMouseOver, onMouseOut, onClick],
    );

    return (
        <MemoizedGeoJSONLayer
            ref={layerRef}
            data={data}
            interactive={type === 'data'}
            style={type === 'data' ? layerDefinition.dataStyle : layerDefinition.borderStyle}
            onEachFeature={onEachFeature}
        />
    );
}
