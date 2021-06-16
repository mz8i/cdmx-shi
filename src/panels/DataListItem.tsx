import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { useFeatureDataColor, useGetMetadata } from '../data/use-feature-data';
import { variableSpecState } from '../recoil/data-selection-state';
import { singleFeatureHighlightState } from '../recoil/ui-state';

export function DataListItem({ geoLevel, feature }) {
    const variableSpec = useRecoilValue(variableSpecState);

    const { getName, getId } = useGetMetadata(geoLevel);
    const setHighlight = useSetRecoilState(singleFeatureHighlightState);
    const resetHighlight = useResetRecoilState(singleFeatureHighlightState);

    const getDataColor = useFeatureDataColor(variableSpec);
    return (
        <>
            <div
                className={`w-full cursor-pointer p-2 filter hover:brightness-110 mb-2`}
                onMouseOver={() => {
                    setHighlight(feature);
                }}
                onMouseOut={() => {
                    resetHighlight();
                }}
            >
                <h3
                    className="text-gray-900 text-shadow-white text-sm font-normal uppercase truncate"
                    title={getName(feature)}
                >
                    {getName(feature) ?? (
                        <span className="italic">
                            {geoLevel === 'colonias'
                                ? `Colonia ${getId(feature).toFixed(0)}`
                                : 'Alcaldia'}
                        </span>
                    )}
                </h3>
                <div
                    className="w-full cursor-pointer p-2 h-5"
                    style={{
                        backgroundColor: getDataColor(feature),
                    }}
                ></div>
            </div>
        </>
    );
}
