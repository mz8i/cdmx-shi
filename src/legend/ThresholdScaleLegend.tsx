import React from 'react';

import { ColorScale, ScaleMapping } from '../config/scales';

function TickMark({ tickIndex, boxSize, value }) {
    const yPosition = tickIndex * boxSize;
    return (
        <>
            <line
                y1={yPosition}
                y2={yPosition}
                x1={boxSize}
                x2={boxSize + 6}
                stroke="#111"
                strokeWidth={1}
            />
            <text height={boxSize / 2} y={yPosition + boxSize / 4 - 1} x={boxSize + 10}>
                {value}
            </text>
        </>
    );
}

interface ThresholdScaleLegendProps {
    scaleMapping: ScaleMapping;
    colorScale: ColorScale;
    boxSize: number;
    valueFormatFn?: (x: number) => string;
    inverted?: boolean;
}

export const ThresholdScaleLegend: React.FC<ThresholdScaleLegendProps> = ({
    scaleMapping,
    colorScale,
    boxSize = 20,
    valueFormatFn,
    inverted = false,
}) => {
    if (scaleMapping.length !== colorScale.length) {
        throw new Error('Color scale and scale mapping are not equal in length');
    }

    const formatFn = valueFormatFn ?? ((x: number) => x.toFixed(1));

    const n = scaleMapping.length;
    const lastTickValue = inverted ? scaleMapping[0].from : scaleMapping[n - 1].to;

    return (
        <svg width={100} height={colorScale.length * boxSize} style={{ overflow: 'visible' }}>
            {[...Array(n).keys()].map(i => {
                const x = colorScale[inverted ? n - 1 - i : i];
                const mapping = scaleMapping[inverted ? n - 1 - i : i];
                const fromText = formatFn(inverted ? mapping.to : mapping.from);
                const toText = formatFn(inverted ? mapping.from : mapping.to);

                return (
                    <>
                        <TickMark tickIndex={i} boxSize={boxSize} value={fromText} />
                        <rect width={boxSize} height={boxSize} fill={x} y={i * boxSize}>
                            <title>{`${inverted ? toText : fromText} - ${
                                inverted ? fromText : toText
                            }`}</title>
                        </rect>
                    </>
                );
            })}
            <TickMark
                tickIndex={scaleMapping.length}
                boxSize={boxSize}
                value={formatFn(lastTickValue)}
            />
        </svg>
    );
};
