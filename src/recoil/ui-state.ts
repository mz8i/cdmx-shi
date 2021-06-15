import { atom, selector } from 'recoil';

import { DataFeature } from '../data/data-context';

export const mapHoverState = atom<DataFeature | null>({
    key: 'featureHover',
    default: null,
});

export const singleFeatureHighlightState = atom<DataFeature | null>({
    key: 'featureHighlight',
    default: null,
});

export const singleFeatureSelectionState = atom<DataFeature | null>({
    key: 'featureSelection',
    default: null,
});

export const featureDetailsState = selector<DataFeature>({
    key: 'featureDetails',
    get: ({ get }) =>
        get(mapHoverState) ?? get(singleFeatureHighlightState) ?? get(singleFeatureSelectionState),
});

// export const featureDetailsState = select;
