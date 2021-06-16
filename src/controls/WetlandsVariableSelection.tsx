import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { GeoLevel } from '../config/variables';
import { currentVariableState } from '../recoil/data-selection-state';
import { ToggleButton } from '../ui/ToggleButton';

export function WetlandsVariableSelection() {
    const [variable, setVariable] = useRecoilState(currentVariableState);

    const [hoverGeoLevel, setHoverGeoLevel] = useState<GeoLevel>(null);

    return (
        <div className="my-1 w-full">
            <div className="flex flex-row">
                <ToggleButton
                    value={'CW_budget'}
                    toggleValue={variable}
                    onChange={setVariable}
                    selectedClassName="border-green-800"
                    hoverClassName="hover:border-green-800"
                    onMouseOver={() => setHoverGeoLevel('alcaldias')}
                    onMouseOut={() => setHoverGeoLevel(null)}
                >
                    $
                </ToggleButton>
                <ToggleButton
                    value={'CW_sqm'}
                    toggleValue={variable}
                    onChange={setVariable}
                    selectedClassName="border-green-800"
                    hoverClassName="hover:border-green-800"
                    onMouseOver={() => setHoverGeoLevel('colonias')}
                    onMouseOut={() => setHoverGeoLevel(null)}
                >
                    m<sup>2</sup>
                </ToggleButton>
            </div>
            {hoverGeoLevel != null && (
                <div className="flex flex-row items-center justify-center">
                    <label>{hoverGeoLevel === 'colonias' ? '(by colonia)' : '(by alcaldía)'}</label>
                </div>
            )}
        </div>
    );
}
