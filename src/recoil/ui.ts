import { atom } from 'recoil';

import { DataFeature } from '../data/data-context';

export const featureHoverState = atom<DataFeature | null>({
    key: 'featureHover',
    default: null,
});

export const featureHighlightState = atom<string[]>({
    key: 'featureHighlight',
    default: [],
});
