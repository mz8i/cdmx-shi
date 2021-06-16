import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { GeoLevel } from '../config/variables';
import {
    alcaldiasVariableState,
    coloniasVariableState,
    currentVariableState,
    geoLevelState,
} from '../recoil/data-selection-state';
import { ToggleButton } from '../ui/ToggleButton';

export function WetlandsVariableSelection() {
    const setGeoLevel = useSetRecoilState(geoLevelState);
    const setColoniasVariable = useSetRecoilState(coloniasVariableState);
    const setAlcaldiasVariable = useSetRecoilState(alcaldiasVariableState);
    const variable = useRecoilValue(currentVariableState);

    const [hoverGeoLevel, setHoverGeoLevel] = useState<GeoLevel>(null);

    return (
        <div className="my-1 w-full">
            <div className="flex flex-row">
                <ToggleButton
                    value={'CW_budget'}
                    toggleValue={variable}
                    onChange={newVal => {
                        setGeoLevel('alcaldias');
                        setAlcaldiasVariable(newVal);
                    }}
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
                    onChange={newVal => {
                        setGeoLevel('colonias');
                        setColoniasVariable(newVal);
                    }}
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
