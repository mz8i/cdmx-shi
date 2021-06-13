import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { useData } from '../data/data-context';
import { useFeatureDataValue } from '../data/use-feature-data';
import { geoLevelState } from '../recoil/data-selection';
import { variableSpecState } from '../recoil/data-selection';
import { DataListItem } from './DataListItem';

export function DataList({ count = 10 }) {
    const geoLevel = useRecoilValue(geoLevelState);
    const variableSpec = useRecoilValue(variableSpecState);

    const { data: currentData } = useData(geoLevel);
    const getFeatureData = useFeatureDataValue(variableSpec);

    const sorted = useMemo(
        () =>
            currentData?.features
                .filter(x => (getFeatureData(x) ?? 0) !== 0)
                .slice()
                .sort((a, b) => getFeatureData(b) - getFeatureData(a))
                .slice(0, count),
        [currentData, getFeatureData, count],
    );

    return (
        <ul className="max-h-full overflow-y-scroll list-none p-0 text-white">
            {sorted?.map(x => (
                <DataListItem geoLevel={geoLevel} feature={x} />
            ))}
        </ul>
    );
}
