import React from 'react';

import { COLOR_SCALES, SCALE_MAPPINGS } from '../config/scales';
import { GeoLevel, VARIABLES, VariableName } from '../config/variables';
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
    const formatFn =
        varDef.legendFractionalDigits != null
            ? x => x.toFixed(varDef.legendFractionalDigits)
            : undefined;

    return (
        <div className="w-40">
            <h3 className="mb-2 font-bold">{varDef.description ?? ''}</h3>
            <ThresholdScaleLegend
                colorScale={colorScale}
                scaleMapping={scaleMapping}
                boxSize={30}
                inverted={!ascending}
                valueFormatFn={formatFn}
            />
        </div>
    );
};