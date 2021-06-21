import { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { useRecoilValue } from 'recoil';

import { useData } from '../data/data-context';
import { useCompareData, useFeatureDataValue } from '../data/use-feature-data';
import { geoLevelState } from '../recoil/data-selection-state';
import { variableSpecState } from '../recoil/data-selection-state';
import { DataListItem } from './DataListItem';

export function DataList({ count = 10, height, itemHeight }) {
    const geoLevel = useRecoilValue(geoLevelState);
    const variableSpec = useRecoilValue(variableSpecState);

    const { data: currentData } = useData(geoLevel);
    const getFeatureData = useFeatureDataValue(variableSpec);
    const compareData = useCompareData(variableSpec);

    const sorted = useMemo(
        () =>
            currentData?.features
                .filter(x => (getFeatureData(x) ?? 0) !== 0)
                .slice()
                .sort(compareData),
        [currentData, compareData, getFeatureData],
    );

    const hasData = (sorted?.length ?? 0) > 0;

    return (
        hasData && (
            <FixedSizeList
                itemCount={sorted?.length ?? 0}
                width="100%"
                height={height}
                itemSize={itemHeight}
            >
                {({ index, style }) => (
                    <div className="text-white" style={style}>
                        <DataListItem geoLevel={geoLevel} feature={sorted?.[index]} />
                    </div>
                )}
            </FixedSizeList>
        )
    );
}
