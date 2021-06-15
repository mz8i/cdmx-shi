import React from 'react';
import { useRecoilValue } from 'recoil';

import { VARIABLES, VariableName } from '../config/variables';
import { useGetManyVariables } from '../data/use-feature-data';
import { dimensionsSpecState } from '../recoil/data-selection';
import { featureHoverState } from '../recoil/ui';
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

// from https://phrase.com/blog/posts/how-convert-a-decimal-to-a-string-with-thousands-separators/
function formatWithThousandsSeparator(num, separator = ' ') {
    let numAsString = num.toString();

    let characters = numAsString.split('').reverse();

    let parts: any[] = [];

    for (let i = 0; i < characters.length; i += 3) {
        let part = characters
            .slice(i, i + 3)
            .reverse()
            .join('');

        parts.unshift(part);
    }

    return parts.join(separator);
}

function formatNumber(number, unit) {
    let isMillions = false;
    if (number > 1_000_000) {
        number = number / 1_000_000;
        isMillions = true;
    }

    const rounded = Math.round(number);

    return `${formatWithThousandsSeparator(rounded)}${isMillions ? ' million' : ''} ${unit ?? ''}`;
}

export function Benefits() {
    const featureHover = useRecoilValue(featureHoverState);
    const dimensions = useRecoilValue(dimensionsSpecState);

    const getVariables = useGetManyVariables(benefitVariables, dimensions, 'colonias');

    const data = featureHover && getVariables(featureHover);

    return (
        <>
            {benefitVariables.map(bv => {
                const value = data?.[bv];
                const varDef = VARIABLES.colonias[bv];
                return (
                    <div key={bv} className="flex flex-row items-center h-14 mb-1">
                        <BenefitIcon
                            className="flex-0 mr-2 h-8"
                            fill="white"
                            height={32}
                            width={32}
                            icon={bv}
                        />
                        <div className="flex-auto h-10 align-center">
                            <h3 className="font-bold">{varDef.description}</h3>
                            {value != null ? (
                                <div className="font-light">{formatNumber(value, varDef.unit)}</div>
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
