import { useRecoilState, useRecoilValue } from 'recoil';

import { currentVariableState, geoLevelState } from '../recoil/data-selection';
import { ToggleButton } from '../ui/ToggleButton';

export function WetlandsVariableSelection() {
    const geoLevel = useRecoilValue(geoLevelState);
    const [variable, setVariable] = useRecoilState(currentVariableState);

    const isColonias = geoLevel === 'colonias';
    return (
        <div className="border-none rounded-none my-1 w-full">
            <ToggleButton
                value={isColonias ? 'CW_sqm' : 'CW_budget'}
                toggleValue={variable}
                onChange={setVariable}
                selectedClassName="border-green-800"
                hoverClassName="hover:border-green-800"
            >
                CW
            </ToggleButton>
            {isColonias && (
                <>
                    <ToggleButton
                        value="population_impacted"
                        toggleValue={variable}
                        onChange={setVariable}
                        selectedClassName="border-blue-900"
                        hoverClassName="hover:border-blue-900"
                    >
                        Pop.
                    </ToggleButton>
                    {/* <ToggleButton
                        value="pop"
                        toggleValue={variable}
                        onChange={setVariable}
                        selectedClassName="border-green-800"
                        hoverClassName="hover:border-green-800"
                    >
                        Total Pop.
                    </ToggleButton> */}
                </>
            )}
        </div>
    );
}
