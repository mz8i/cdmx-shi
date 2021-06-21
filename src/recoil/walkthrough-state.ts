import { atom, selector } from 'recoil';

import { budgetDimensionState, currentVariableState } from './data-selection-state';

export type WalkthroughPhase = 'intro' | 'scenarios' | 'solutions' | 'impact';

// private backing field for walkthrough phase
const _walkthroughPhaseState = atom<WalkthroughPhase>({
    key: '_walkthroughPhase',
    default: 'solutions',
});

export const walkthroughPhaseState = selector<WalkthroughPhase>({
    key: 'walkthroughPhase',
    get: ({ get }) => get(_walkthroughPhaseState),
    set: ({ get, set }, newValue) => {
        const currentValue = get(_walkthroughPhaseState);

        if (newValue === currentValue) return;

        if (newValue === 'intro') {
            set(currentVariableState, 'SHI');
            set(budgetDimensionState, 'b0');
        } else if (newValue === 'scenarios') {
            set(currentVariableState, 'SHI');
            set(budgetDimensionState, 'b0');
        } else if (newValue === 'solutions') {
            if (currentValue === 'scenarios') {
                // going forward in the narrative
                set(currentVariableState, 'CW_budget');
                set(budgetDimensionState, 'b0');
            } else if (currentValue === 'impact') {
                set(currentVariableState, 'CW_sqm');

                // don't change, since we're setting budget in impact screen
                // set(budgetDimensionState, 'b0');
            }
        } else if (newValue === 'impact') {
            set(currentVariableState, 'SHI');
            set(budgetDimensionState, 'b1'); // or b0?
        }

        set(_walkthroughPhaseState, newValue);
    },
});
