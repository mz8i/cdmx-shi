import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { useGetMetadata } from '../data/use-feature-data';
import { featureHighlightState } from '../recoil/ui';

export function DataListItem({ geoLevel, region }) {
    const { getName, getParentName } = useGetMetadata(geoLevel);
    const setHighlight = useSetRecoilState(featureHighlightState);
    const resetHighlight = useResetRecoilState(featureHighlightState);

    const parentName = getParentName(region);
    return (
        <>
            <li
                className={`w-full cursor-pointer p-2 border border-white bg-gray-700 hover:bg-gray-500`}
                onMouseOver={() => {
                    setHighlight([region]);
                }}
                onMouseOut={() => {
                    resetHighlight();
                }}
            >
                {getName(region)}
                {parentName && (
                    <>
                        <br /> ({getParentName(region)})
                    </>
                )}
            </li>
        </>
    );
}
