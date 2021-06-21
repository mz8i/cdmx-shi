import { useRecoilState } from 'recoil';

import { currentVariableState } from '../recoil/data-selection-state';
import { ToggleButton } from '../ui/ToggleButton';

export function IndexVariableSelection() {
    const [variable, setVariable] = useRecoilState(currentVariableState);

    return (
        <div className="border-none rounded-none my-px flex flex-row gap-4">
            <div className="flex-1">
                <ToggleButton
                    value="SHI"
                    toggleValue={variable}
                    onChange={setVariable}
                    selectedClassName="border-shi-700"
                    hoverClassName="hover:border-shi-700"
                    className="rounded-b-none -mb-px"
                    title="Socio-Hydrological Vulnerability Index"
                >
                    SHI
                </ToggleButton>
                <div className="w-full flex relative -mt-px">
                    <ToggleButton
                        value="WSI"
                        toggleValue={variable}
                        onChange={setVariable}
                        selectedClassName="border-wsi-800"
                        hoverClassName="hover:border-wsi-800"
                        className="rounded-t-none rounded-br-none -mr-px"
                        title="Water Stress Index"
                    >
                        WSI
                    </ToggleButton>
                    <ToggleButton
                        value="ACI"
                        toggleValue={variable}
                        onChange={setVariable}
                        selectedClassName="border-aci-800"
                        hoverClassName="hover:border-aci-800"
                        className="rounded-t-none rounded-bl-none -ml-px"
                        title="Adaptive Capacity Index"
                    >
                        ACI
                    </ToggleButton>
                </div>
            </div>
        </div>
    );
}
