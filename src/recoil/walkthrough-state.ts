import { DefaultValue, atom, atomFamily, selector } from 'recoil';

import { budgetDimensionState, currentVariableState } from './data-selection-state';

const walkthroughPhases = ['intro', 'scenarios', 'solutions', 'impact'] as const;

const defaultWalkthroughPhase = 'intro';

export type WalkthroughPhase = typeof walkthroughPhases[number];

// private backing field for walkthrough phase
const _walkthroughPhaseState = atom<WalkthroughPhase>({
    key: '_walkthroughPhase',
    default: defaultWalkthroughPhase,
});

const walkthroughPhaseVisitedStateFamily = atomFamily<boolean, WalkthroughPhase>({
    key: 'WalkthroughPhaseVisited',
    default: param => param === defaultWalkthroughPhase,
});

export const walkthroughPhaseState = selector<WalkthroughPhase>({
    key: 'walkthroughPhase',
    get: ({ get }) => get(_walkthroughPhaseState),
    set: ({ get, set }, newValue) => {
        const currentValue = get(_walkthroughPhaseState);

        if (newValue instanceof DefaultValue) {
            set(_walkthroughPhaseState, newValue);
            return;
        }

        if (newValue === currentValue) return;

        const newValueVisited = get(walkthroughPhaseVisitedStateFamily(newValue));

        if (newValue === 'intro') {
            set(currentVariableState, 'SHI');
            set(budgetDimensionState, 'b0');
        } else if (newValue === 'scenarios') {
            set(currentVariableState, 'SHI');
            set(budgetDimensionState, 'b0');
        } else if (newValue === 'solutions') {
            const currentValueIndex = walkthroughPhases.indexOf(currentValue);
            const newValueIndex = walkthroughPhases.indexOf(newValue);

            if (currentValueIndex < newValueIndex) {
                // going forward in the narrative
                set(currentVariableState, 'CW_budget');

                if (!newValueVisited) {
                    set(budgetDimensionState, 'b0');
                }
            } else if (currentValueIndex > newValueIndex) {
                set(currentVariableState, 'CW_sqm');

                // don't change, since we're setting budget in impact screen
                // set(budgetDimensionState, 'b0');
            }
        } else if (newValue === 'impact') {
            set(currentVariableState, 'SHI');
            if (!newValueVisited) {
                set(budgetDimensionState, 'b1'); // or b0?
            }
        }

        set(_walkthroughPhaseState, newValue);
        set(walkthroughPhaseVisitedStateFamily(newValue), true);
    },
});
