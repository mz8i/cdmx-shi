import React from 'react';

import { COLOR_SCALES, SCALE_MAPPINGS } from '../config/scales';
import { GeoLevel, VARIABLES, VariableName } from '../config/variables';
import { formatNumber } from '../format';
import { ThresholdScaleLegend } from './ThresholdScaleLegend';

interface LegendProps {
    dataset: GeoLevel;
    variable: VariableName;
}

export const Legend: React.FC<LegendProps> = ({ variable, dataset }) => {
    const varDef = VARIABLES[dataset][variable];
    const colorScale = COLOR_SCALES[varDef.colorScale];
    const scaleMapping = SCALE_MAPPINGS[varDef.scaleMapping];
    const ascending = varDef.invertOrderToAscending ?? false;
    let formatFn = undefined;

    if (varDef.legendFractionalDigits != null) {
        formatFn = x => x.toFixed(varDef.legendFractionalDigits);
    } else if (varDef.formatAsLargeNumber) {
        formatFn = formatNumber;
    }

    return (
        <div className="w-56 bg-none sm:bg-gray-50 p-4 pt-3 pb-5 rounded-xl sm:border-2 sm:border-gray-200">
            <h3 className="font-bold mb-5">{varDef.description ?? ''}</h3>
            <ThresholdScaleLegend
                colorScale={colorScale}
                scaleMapping={scaleMapping}
                boxSize={24}
                inverted={!ascending}
                valueFormatFn={formatFn}
                variableHint={varDef.legendClassHint}
            />
        </div>
    );
};
