import React, { useMemo } from 'react';

import { ColorScale, ScaleMapping } from '../config/scales';

function TickMark({ tickIndex, boxSize, value, separator }) {
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
            <text fontSize={boxSize / 2} y={yPosition + boxSize / 4 - 2} x={boxSize + 10}>
                {value}
            </text>
            {separator && (
                <line
                    y1={yPosition}
                    y2={yPosition}
                    x1={boxSize * 2.5}
                    x2={boxSize * 7.5}
                    stroke="#aaa"
                    strokeWidth={1}
                />
            )}
        </>
    );
}

interface ThresholdScaleLegendProps {
    scaleMapping: ScaleMapping;
    colorScale: ColorScale;
    boxSize: number;
    valueFormatFn?: (x: number) => string;
    inverted?: boolean;

    /** used to compile tooltip value for each box */
    variableHint: string;
}

interface LegendBin {
    index: number;
    color: string;
    tooltip: string;
}

interface LegendThreshold {
    index: number;
    label: string;

    /**
     * For setting a special value for a min/max value, e.g. separate color for 0
     */
    thresholdValueColor?: string;

    hasClassSeparator?: boolean;
}

interface LegendClass {
    label: string;
    span: number;
}

function prepareLegendElements(
    scaleMapping: ScaleMapping,
    colorScale: ColorScale,
    formatFn: (x: number) => string,
    variableHint: string,
): {
    boxes: LegendBin[];
    ticks: LegendThreshold[];
    classes: LegendClass[];
} {
    const lowerCaseHint = variableHint?.toLowerCase();

    const boxes = [];
    const ticks = [];
    const classes = [];

    let lastClass = null;
    let lastClassCount = 0;

    scaleMapping.forEach((mapping, i) => {
        const color = colorScale[i];

        const fromText = formatFn(mapping.from);
        const toText = formatFn(mapping.to);

        const box = {
            index: i,
            color,
            tooltip: `${fromText} - ${toText}`,
        };

        const tick: LegendThreshold = {
            index: i,
            label: fromText,
        };

        const classText = mapping.class && `${mapping.class} ${mapping.classHint ?? ''}`.trimEnd();

        if (classText) {
            box.tooltip = mapping.rawClass
                ? `${box.tooltip} ${mapping.class}`
                : lowerCaseHint != null
                ? `${box.tooltip} (${mapping.class} ${lowerCaseHint})`
                : `${box.tooltip} (${mapping.class})`;
            if (classText === lastClass) {
                lastClassCount++;
            } else {
                if (lastClass != null) {
                    classes.push({
                        label: lastClass,
                        span: lastClassCount,
                    });
                    tick.hasClassSeparator = true;
                }
                lastClass = classText;
                lastClassCount = 1;
            }

            if (i === 0) {
                tick.hasClassSeparator = true;
            }
        }

        boxes.push(box);
        ticks.push(tick);
    });

    const lastMapping = scaleMapping[scaleMapping.length - 1];

    ticks.push({
        index: scaleMapping.length,
        label: formatFn(lastMapping.to),
        hasClassSeparator: lastMapping.class != null ? true : undefined,
    });

    if (lastClass != null) {
        classes.push({
            label: lastClass,
            span: lastClassCount,
        });
    }

    return {
        boxes,
        ticks,
        classes,
    };
}

function formatFixed(x: number) {
    return x.toFixed(1);
}
export const ThresholdScaleLegend: React.FC<ThresholdScaleLegendProps> = ({
    scaleMapping,
    colorScale,
    boxSize = 20,
    valueFormatFn,
    inverted = false,
    variableHint,
}) => {
    if (scaleMapping.length !== colorScale.length) {
        throw new Error('Color scale and scale mapping are not equal in length');
    }

    const formatFn = valueFormatFn ?? formatFixed;

    const { boxes, ticks, classes } = useMemo(
        () => prepareLegendElements(scaleMapping, colorScale, formatFn, variableHint),
        [colorScale, formatFn, scaleMapping, variableHint],
    );

    if (inverted) {
        boxes.reverse();
        ticks.reverse();
        classes.reverse();
    }

    let cumulativeSpan = 0;
    const lastTick = ticks[ticks.length - 1];

    return (
        <svg width={200} height={colorScale.length * boxSize} style={{ overflow: 'visible' }}>
            {boxes.map((box, i) => {
                const tick = ticks[i];
                return (
                    <>
                        <TickMark
                            tickIndex={i}
                            boxSize={boxSize}
                            value={tick.label}
                            separator={tick.hasClassSeparator ?? false}
                        />
                        <rect width={boxSize} height={boxSize} fill={box.color} y={i * boxSize}>
                            <title>{box.tooltip}</title>
                        </rect>
                    </>
                );
            })}
            <TickMark
                tickIndex={scaleMapping.length}
                boxSize={boxSize}
                value={lastTick.label}
                separator={lastTick.hasClassSeparator ?? false}
            />
            {classes.map(c => {
                const startIndex = cumulativeSpan;
                const endIndex = startIndex + c.span;

                const labelPosition = ((startIndex + endIndex) / 2) * boxSize;

                cumulativeSpan += c.span;

                return c.label != null ? (
                    <>
                        <text
                            height={boxSize / 2}
                            y={labelPosition + boxSize / 4 - 2}
                            x={boxSize + 55}
                            fontSize={boxSize / 2}
                        >
                            {c.label}
                        </text>
                    </>
                ) : null;
            })}
        </svg>
    );
};
