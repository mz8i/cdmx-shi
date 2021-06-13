import React from 'react';
import { useRecoilValue } from 'recoil';

import { VARIABLES, VariableName } from '../config/variables';
import { useGetManyVariables } from '../data/use-feature-data';
import { dimensionsSpecState } from '../recoil/data-selection';
import { featureHoverState } from '../recoil/ui';

const benefitVariables: VariableName[] = [
    'arum_lillies_yearly',
    'cattail_plants_yearly',
    'homes_impacted',
    'maintenance_jobs',
    'manufacture_jobs',
    'population_impacted',
    'rain_filtered_yearly',
    'water_filtered_yearly',
];

export function Benefits() {
    const featureHover = useRecoilValue(featureHoverState);
    const dimensions = useRecoilValue(dimensionsSpecState);

    const getVariables = useGetManyVariables(benefitVariables, dimensions, 'colonias');

    const data = featureHover && getVariables(featureHover);

    return (
        <>
            {benefitVariables.map(bv => (
                <>
                    <h3>{VARIABLES.colonias[bv].description}</h3>
                    <div className="font-bold h-8">{data?.[bv]}</div>
                </>
            ))}
        </>
    );
}
