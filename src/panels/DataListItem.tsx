import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useFeatureDataColor, useGetMetadata } from '../data/use-feature-data';
import { variableSpecState } from '../recoil/data-selection';
import { featureHighlightState } from '../recoil/ui';

export function DataListItem({ geoLevel, feature }) {
    const variableSpec = useRecoilValue(variableSpecState);

    const { getName } = useGetMetadata(geoLevel);
    const setHighlight = useSetRecoilState(featureHighlightState);
    const resetHighlight = useResetRecoilState(featureHighlightState);

    const getDataColor = useFeatureDataColor(variableSpec);
    return (
        <>
            <li
                className={`w-full cursor-pointer p-2 filter hover:brightness-105`}
                onMouseOver={() => {
                    setHighlight([feature]);
                }}
                onMouseOut={() => {
                    resetHighlight();
                }}
            >
                <h3 className="text-gray-900 text-shadow-white font-normal uppercase">
                    {getName(feature)}
                </h3>
                <div
                    className="w-full cursor-pointer p-2 h-8"
                    style={{
                        backgroundColor: getDataColor(feature),
                    }}
                ></div>
            </li>
        </>
    );
}
