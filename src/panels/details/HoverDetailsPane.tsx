import { useRecoilValue } from 'recoil';

import { VARIABLES, VariableName } from '../../config/variables';
import { useFeatureDataValue, useGetMetadata } from '../../data/use-feature-data';
import {
    currentVariableState,
    geoLevelState,
    variableSpecState,
} from '../../recoil/data-selection-state';
import { featureDetailsState } from '../../recoil/ui-state';
import { ValueIndicator } from '../../ui/ValueIndicator';
import { IndexDetailsPane } from './ColoniaDetailsPane';

const indexVariables: VariableName[] = ['SHI', 'ACI', 'WSI'];
const wetlandsVariables: VariableName[] = ['CW_sqm', 'CW_budget'];

export function HoverDetailsPane() {
    const feature = useRecoilValue(featureDetailsState);
    const geoLevel = useRecoilValue(geoLevelState);
    const variable = useRecoilValue(currentVariableState);
    const variableSpec = useRecoilValue(variableSpecState);

    const getPopulation = useFeatureDataValue({ variable: 'pop', dataset: 'colonias' });

    const { getName, getParentName } = useGetMetadata(geoLevel);

    const population = feature && getPopulation(feature);

    const varDef = VARIABLES[geoLevel][variable];

    return (
        <>
            <section className="h-28">
                {feature ? (
                    <>
                        <h3 className="font-bold min-h-8 text-lg uppercase" title="Colonia">
                            {getName(feature)}
                        </h3>
                        <h4 className="font-normal min-h-8" title="Alcaldía (Municipality)">
                            {getParentName(feature)}
                        </h4>
                        {population && (
                            <div className="text-sm h-8 uppercase font-light" title="Population">
                                population: {population?.toLocaleString()}
                            </div>
                        )}
                    </>
                ) : (
                    <h2 className="uppercase font-light">No region selected</h2>
                )}
            </section>
            <section className="w-full mt-3">
                {indexVariables.includes(variable) && <IndexDetailsPane feature={feature} />}
                {wetlandsVariables.includes(variable) && (
                    <>
                        <h2>{varDef.description}</h2>
                        <ValueIndicator variableSpec={variableSpec} feature={feature} />
                    </>
                )}
            </section>
        </>
    );
}
