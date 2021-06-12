import { SliderHandle, SliderInput, SliderMarker, SliderTrack } from '@reach/slider';
import { useRecoilState } from 'recoil';

import { BudgetName } from '../config/variables';
import { budgetDimensionState } from '../recoil/data-selection';

export function BudgetSelection() {
    const [budget, setBudget] = useRecoilState(budgetDimensionState);
    return (
        <div>
            <SliderInput
                name="budget"
                min={0}
                max={4}
                step={1}
                value={parseInt(budget.substring(1), 10)}
                onChange={val => setBudget(`b${val}` as BudgetName)}
            >
                <SliderTrack>
                    <SliderMarker value={0} title="test" />
                    <SliderMarker value={1} />
                    <SliderMarker value={2} />
                    <SliderMarker value={3} />
                    <SliderMarker value={4} />
                    <SliderHandle />
                </SliderTrack>
            </SliderInput>
        </div>
    );
}
