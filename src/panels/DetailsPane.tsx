import { useRecoilValue } from 'recoil';

import { useFeatureDataValue, useGetMetadata } from '../data/use-feature-data';
import { geoLevelState, variableSpecState } from '../recoil/data-selection';
import { featureHoverState } from '../recoil/ui';

export function DetailsPane() {
    const featureHover = useRecoilValue(featureHoverState);
    const geoLevel = useRecoilValue(geoLevelState);

    const variableSpec = useRecoilValue(variableSpecState);

    const getFeatureData = useFeatureDataValue(variableSpec);

    const { getName, getParentName } = useGetMetadata(geoLevel);

    return (
        <>
            <section>
                <h3>Colonia:</h3>
                <div className="font-bold h-8">{getName(featureHover)}</div>
            </section>
            <section>
                <h3>Alcaldia:</h3>
                <div className="font-bold h-8">{getParentName(featureHover)}</div>
            </section>
            <section>
                <h3>Value:</h3>
                <div className="font-bold h-8">{featureHover && getFeatureData(featureHover)}</div>
                <h3>Population:</h3>
                <div className="font-bold h-8">{featureHover?.properties.pop}</div>
            </section>
        </>
    );
}
