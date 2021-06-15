import { useRecoilState, useSetRecoilState } from 'recoil';

import { coloniasVariableState, geoLevelState } from '../recoil/data-selection';
import { ToggleButton } from '../ui/ToggleButton';

export function IndexVariableSelection() {
    const [variable, setVariable] = useRecoilState(coloniasVariableState);
    const setGeoLevel = useSetRecoilState(geoLevelState);

    return (
        <div className="border-none rounded-none my-1 flex flex-row gap-4">
            <div className="flex-1">
                <ToggleButton
                    value="SHI"
                    toggleValue={variable}
                    onChange={newVal => {
                        setGeoLevel('colonias');
                        setVariable(newVal);
                    }}
                    selectedClassName="border-shi-700"
                    hoverClassName="hover:border-shi-700"
                >
                    SHI
                </ToggleButton>
                <div className="w-full flex">
                    <ToggleButton
                        value="WSI"
                        toggleValue={variable}
                        onChange={newVal => {
                            setGeoLevel('colonias');
                            setVariable(newVal);
                        }}
                        selectedClassName="border-wsi-800"
                        hoverClassName="hover:border-wsi-800"
                    >
                        WSI
                    </ToggleButton>
                    <ToggleButton
                        value="ACI"
                        toggleValue={variable}
                        onChange={newVal => {
                            setGeoLevel('colonias');
                            setVariable(newVal);
                        }}
                        selectedClassName="border-aci-800"
                        hoverClassName="hover:border-aci-800"
                    >
                        ACI
                    </ToggleButton>
                </div>
            </div>
        </div>
    );
}
