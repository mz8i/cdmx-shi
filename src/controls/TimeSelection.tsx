import { useRecoilState } from 'recoil';

import { timeDimensionState } from '../recoil/data-selection-state';
import { ToggleButton } from '../ui/ToggleButton';

export function TimeSelection() {
    const [time, setTime] = useRecoilState(timeDimensionState);

    return (
        <div className="my-1">
            <div className="flex">
                <ToggleButton
                    value="c"
                    toggleValue={time}
                    onChange={setTime}
                    selectedClassName="border-blue-900"
                    hoverClassName="hover:border-blue-900"
                >
                    2020
                </ToggleButton>
                <ToggleButton
                    value="f"
                    toggleValue={time}
                    onChange={setTime}
                    selectedClassName="border-blue-900"
                    hoverClassName="hover:border-blue-900"
                >
                    2050
                </ToggleButton>
            </div>
        </div>
    );
}
