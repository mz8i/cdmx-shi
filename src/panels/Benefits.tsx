import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { VariableSpec } from '../config/variables';
import { useFeatureDataValue } from '../data/use-feature-data';
import { dimensionsSpecState } from '../recoil/data-selection';
import { featureHoverState } from '../recoil/ui';

export function Benefits() {
    const featureHover = useRecoilValue(featureHoverState);
    const dimensions = useRecoilValue(dimensionsSpecState);

    const cattailVariableSpec = useMemo<VariableSpec>(
        () => ({
            dataset: 'colonias',
            variable: 'cattail_plants_yearly',
            dimensions,
        }),
        [dimensions],
    );

    const getCattailData = useFeatureDataValue(cattailVariableSpec);

    return (
        <>
            <h3>Cattail plants yearly:</h3>
            <div className="font-bold h-8">{featureHover && getCattailData(featureHover)}</div>
        </>
    );
}
