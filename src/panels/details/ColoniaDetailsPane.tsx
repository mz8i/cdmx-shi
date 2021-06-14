import { useRecoilValue } from 'recoil';

import { dimensionsSpecState } from '../../recoil/data-selection';
import { ValueIndicator } from '../../ui/ValueIndicator';

export function ColoniaDetailsPane({ feature }) {
    const dimensions = useRecoilValue(dimensionsSpecState);

    return (
        <>
            <section className="flex flex-row nowrap gap-4 h-16 text-sm">
                <ValueIndicator
                    variableSpec={{ variable: 'SHI', dimensions, dataset: 'colonias' }}
                    feature={feature}
                />
                <ValueIndicator
                    variableSpec={{ variable: 'WSI', dimensions, dataset: 'colonias' }}
                    feature={feature}
                />
                <ValueIndicator
                    variableSpec={{ variable: 'ACI', dimensions, dataset: 'colonias' }}
                    feature={feature}
                />
            </section>
        </>
    );
}
