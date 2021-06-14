import { useRecoilValue } from 'recoil';

import { useFeatureDataValue, useGetMetadata } from '../../data/use-feature-data';
import { geoLevelState, variableSpecState } from '../../recoil/data-selection';
import { featureHoverState } from '../../recoil/ui';
import { ValueIndicator } from '../../ui/ValueIndicator';
import { ColoniaDetailsPane } from './ColoniaDetailsPane';

export function HoverDetailsPane() {
    const feature = useRecoilValue(featureHoverState);
    const geoLevel = useRecoilValue(geoLevelState);
    const variableSpec = useRecoilValue(variableSpecState);

    const getPopulation = useFeatureDataValue({ variable: 'pop', dataset: 'colonias' });

    const { getName, getParentName } = useGetMetadata(geoLevel);

    const population = feature && getPopulation(feature);

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
                        <div className="text-sm h-8 uppercase font-light" title="Population">
                            population: {population?.toLocaleString()}
                        </div>
                    </>
                ) : (
                    <h2 className="uppercase font-light">No region selected</h2>
                )}
            </section>
            <section>
                {geoLevel === 'colonias' ? <ColoniaDetailsPane feature={feature} /> : null}
            </section>
            <section className="w-full mt-3">
                <h2>{variableSpec.variable}</h2>
                <ValueIndicator variableSpec={variableSpec} feature={feature} />
            </section>
            <section></section>
        </>
    );
}
