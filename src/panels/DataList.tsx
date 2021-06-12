import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { useData } from '../data/data-context';
import { useFeatureDataValue, useFeatureId } from '../data/use-feature-data';
import { geoLevelState } from '../recoil/data-selection';
import { variableSpecState } from '../recoil/data-selection';
import { DataListItem } from './DataListItem';

export function DataList() {
    const geoLevel = useRecoilValue(geoLevelState);
    const variableSpec = useRecoilValue(variableSpecState);

    const { data: currentData } = useData(geoLevel);
    const getFeatureData = useFeatureDataValue(variableSpec);
    const getFeatureId = useFeatureId(geoLevel);

    const sorted = useMemo(
        () =>
            currentData?.features
                .filter(x => (getFeatureData(x) ?? 0) !== 0)
                .slice()
                .sort((a, b) => getFeatureData(b) - getFeatureData(a)),
        [currentData, getFeatureData],
    );

    return (
        <div className="bg-white p-4 mb-4 w-80 h-96">
            <h3>All regions:</h3>
            <ul className="max-h-full overflow-y-scroll list-none pl-0 text-white">
                {sorted?.map(x => (
                    <DataListItem key={getFeatureId(x)} geoLevel={geoLevel} region={x} />
                ))}
            </ul>
        </div>
    );
}
