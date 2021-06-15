import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import {
    alcaldiasVariableState,
    coloniasVariableState,
    currentVariableState,
    geoLevelState,
} from '../recoil/data-selection';
import { ToggleButton } from '../ui/ToggleButton';

export function WetlandsVariableSelection() {
    const [, setGeoLevel] = useRecoilState(geoLevelState);
    const setColoniasVariable = useSetRecoilState(coloniasVariableState);
    const setAlcaldiasVariable = useSetRecoilState(alcaldiasVariableState);
    const variable = useRecoilValue(currentVariableState);

    return (
        <div className="border-none rounded-none my-1 w-full flex flex-row">
            <ToggleButton
                value={'CW_sqm'}
                toggleValue={variable}
                onChange={newVal => {
                    setGeoLevel('colonias');
                    setColoniasVariable(newVal);
                }}
                selectedClassName="border-green-800"
                hoverClassName="hover:border-green-800"
            >
                m<sup>2</sup>
            </ToggleButton>
            <ToggleButton
                value={'CW_budget'}
                toggleValue={variable}
                onChange={newVal => {
                    setGeoLevel('alcaldias');
                    setAlcaldiasVariable(newVal);
                }}
                selectedClassName="border-green-800"
                hoverClassName="hover:border-green-800"
            >
                $
            </ToggleButton>
        </div>
    );
}
