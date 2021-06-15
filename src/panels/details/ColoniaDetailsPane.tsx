import { useRecoilValue } from 'recoil';

import { dimensionsSpecState } from '../../recoil/data-selection-state';
import { ValueIndicator } from '../../ui/ValueIndicator';

export function IndexDetailsPane({ feature }) {
    const dimensions = useRecoilValue(dimensionsSpecState);

    return (
        <>
            <div className="m-1">
                <h3 className="text-center">Socio-Hydrological Vulnerability</h3>
                <ValueIndicator
                    variableSpec={{ variable: 'SHI', dimensions, dataset: 'colonias' }}
                    feature={feature}
                />
            </div>
            <div className="flex flex-row m-1 gap-4">
                <div className="flex-1">
                    <h3 className="text-center">Water Stress</h3>
                    <ValueIndicator
                        variableSpec={{ variable: 'WSI', dimensions, dataset: 'colonias' }}
                        feature={feature}
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-center">Adaptive Capacity</h3>
                    <ValueIndicator
                        variableSpec={{ variable: 'ACI', dimensions, dataset: 'colonias' }}
                        feature={feature}
                    />
                </div>
            </div>
        </>
    );
}
