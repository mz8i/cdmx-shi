import React from 'react';
import { useRecoilValue } from 'recoil';

import { VARIABLES, VariableName } from '../config/variables';
import { useGetManyVariables } from '../data/use-feature-data';
import { formatNumber } from '../format';
import { dimensionsSpecState } from '../recoil/data-selection-state';
import { mapHoverState } from '../recoil/ui-state';
import { BenefitIcon } from '../ui/icons';

const benefitVariables: VariableName[] = [
    'population_impacted',
    'homes_impacted',
    'water_filtered_yearly',
    'rain_filtered_yearly',
    'cattail_plants_yearly',
    'arum_lillies_yearly',
    'maintenance_jobs',
    'manufacture_jobs',
];

export function Benefits() {
    const featureHover = useRecoilValue(mapHoverState);
    const dimensions = useRecoilValue(dimensionsSpecState);

    const getVariables = useGetManyVariables(benefitVariables, dimensions, 'colonias');

    const data = featureHover && getVariables(featureHover);

    return (
        <>
            {benefitVariables.map(bv => {
                const value = data?.[bv];
                const varDef = VARIABLES.colonias[bv];
                return (
                    <div key={bv} className="flex flex-row items-center mb-2">
                        <BenefitIcon
                            className="flex-0 mr-2"
                            fill="white"
                            height={28}
                            width={28}
                            icon={bv}
                        />
                        <div className="flex-auto align-center">
                            <h3 className="font-bold text-sm">{varDef.description}</h3>
                            {value != null && !isNaN(value) ? (
                                <div className="font-light text-sm">
                                    {formatNumber(value, varDef.unit)}
                                </div>
                            ) : (
                                <div className="font-light text-sm">---</div>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
