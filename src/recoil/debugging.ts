import { atom } from 'recoil';

export const wetlandsBackdropColorState = atom<string>({
    key: 'wetlandsColor',
    default: '#fff',
});

export const wetlandsBackdropOpacityState = atom<number>({
    key: 'wetlandsOpacity',
    default: 0.0,
});
