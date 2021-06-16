import { SliderHandle, SliderInput, SliderMarker, SliderTrack } from '@reach/slider';
import { useRecoilState } from 'recoil';

import { BudgetName } from '../config/variables';
import { budgetDimensionState } from '../recoil/data-selection-state';

export function BudgetSelection() {
    const [budget, setBudget] = useRecoilState(budgetDimensionState);
    return (
        <div className="m-5 mb-10">
            <SliderInput
                name="budget"
                min={0}
                max={4}
                step={1}
                value={parseInt(budget.substring(1), 10)}
                onChange={val => setBudget(`b${val}` as BudgetName)}
                getAriaValueText={val => val.toString()}
            >
                <SliderTrack>
                    <SliderMarker value={0}>
                        <div className="text-blue-900 font-extrabold w-5 transform -translate-x-1/2 translate-y-5">
                            0$
                        </div>
                    </SliderMarker>
                    <SliderMarker value={1} />
                    <SliderMarker value={2} />
                    <SliderMarker value={3} />
                    <SliderMarker value={4}>
                        <div className="text-blue-900 font-extrabold w-9 transform -translate-x-1/2 translate-y-5">
                            max&nbsp;$
                        </div>
                    </SliderMarker>
                    <SliderHandle />
                </SliderTrack>
            </SliderInput>
        </div>
    );
}
