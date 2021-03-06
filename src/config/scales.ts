export const COLOR_SCALES = {
    SHI: [
        '#003496',
        '#567bbb',
        '#adc3e0',
        '#fef9e4',
        '#fee2a4',
        '#fdca65',
        '#fdb225',
        '#ee8311',
        '#d4411e',
        '#bd1a21',
        '#ab1319',
        '#990d10',
        '#870608',
        '#750000',
    ],
    WSI: [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#dff6fa',
        '#87cce1',
        '#2fa2c7',
        '#01568b',
        '#00316b',
    ],
    ACI: [
        '#00403F',
        '#005651',
        '#006D64',
        '#008476',
        '#009B89',
        '#19B09E',
        '#4CC2B6',
        '#7FD5CE',
        '#B2E7E6',
        '#E5FAFE',
    ],
    CW: [
        '#EAEBB2',
        '#D6D996',
        '#C3C87B',
        '#B0B760',
        '#9CA645',
        '#889334',
        '#727F2E',
        '#5D6A28',
        '#475522',
        '#32411C',
    ],
};

export type ColorScaleName = keyof typeof COLOR_SCALES;
export type ColorScale = typeof COLOR_SCALES[ColorScaleName];

export interface ScaleMappingItem {
    from: number;
    to: number;
    exclusiveFrom?: boolean;
    class?: string;
    classHint?: string;

    /** whether to keep the class string as-is in the tooltip */
    rawClass?: boolean;
}
export type ScaleMapping = ScaleMappingItem[];

export const SCALE_MAPPINGS = {
    SHI: [
        { from: 0, to: 0.6, class: 'Little to no', classHint: '(best)' },
        { from: 0.6, to: 0.8, class: 'Little to no', classHint: '(best)' },
        { from: 0.8, to: 1, class: 'Little to no', classHint: '(best)' },
        { from: 1, to: 1.2, class: 'Moderate' },
        { from: 1.2, to: 1.4, class: 'Moderate' },
        { from: 1.4, to: 1.6, class: 'Moderate' },
        { from: 1.6, to: 1.8, class: 'Moderate' },
        { from: 1.8, to: 2, class: 'Moderate' },
        { from: 2, to: 2.2, class: 'Significant' },
        { from: 2.2, to: 2.4, class: 'Significant' },
        { from: 2.4, to: 2.6, class: 'Significant' },
        { from: 2.6, to: 2.8, class: 'Significant' },
        { from: 2.8, to: 3, class: 'Significant' },
        { from: 3, to: 8, class: 'Extreme', classHint: '(worst)' },
    ],
    WSI: [
        { from: 0, to: 0.1, class: '(Not present)', rawClass: true },
        { from: 0.1, to: 0.2, class: '(Not present)', rawClass: true },
        { from: 0.2, to: 0.3, class: '(Not present)', rawClass: true },
        { from: 0.3, to: 0.4, class: '(Not present)', rawClass: true },
        { from: 0.4, to: 0.5, class: '(Not present)', rawClass: true },
        { from: 0.5, to: 0.6, class: 'Moderate' },
        { from: 0.6, to: 0.7, class: 'High' },
        { from: 0.7, to: 0.8, class: 'High' },
        { from: 0.8, to: 0.9, class: 'Very high', classHint: '(worst)' },
        { from: 0.9, to: 1, class: 'Very high', classHint: '(worst)' },
    ],
    ACI: [
        { from: 0, to: 0.1, class: 'Very low', classHint: '(worst)' },
        { from: 0.1, to: 0.2, class: 'Very low', classHint: '(worst)' },
        { from: 0.2, to: 0.3, class: 'Low' },
        { from: 0.3, to: 0.4, class: 'Low' },
        { from: 0.4, to: 0.5, class: 'Moderate' },
        { from: 0.5, to: 0.6, class: 'Moderate' },
        { from: 0.6, to: 0.7, class: 'High' },
        { from: 0.7, to: 0.8, class: 'High' },
        { from: 0.8, to: 0.9, class: 'Very high', classHint: '(best)' },
        { from: 0.9, to: 1, class: 'Very high', classHint: '(best)' },
    ],
    CW_sqm: [
        { exclusiveFrom: true, from: 0, to: 286 },
        { from: 286, to: 918 },
        { from: 918, to: 1822 },
        { from: 1822, to: 3134 },
        { from: 3134, to: 4986 },
        { from: 4986, to: 7960 },
        { from: 7960, to: 12620 },
        { from: 12620, to: 20796 },
        { from: 20796, to: 41446 },
        { from: 41446, to: 500000 },
    ],
    CW_budget: [
        { exclusiveFrom: true, from: 0, to: 72000 },
        { from: 72000, to: 426384000 },
        { from: 426384000, to: 1038780000 },
        { from: 1038780000, to: 1726308000 },
        { from: 1726308000, to: 2561544000 },
        { from: 2561544000, to: 3516336000 },
        { from: 3516336000, to: 4961268000 },
        { from: 4961268000, to: 6366888000 },
        { from: 6366888000, to: 9068724000 },
        { from: 9068724000, to: 10000000000 },
    ],
    pop: [
        { exclusiveFrom: true, from: 0, to: 500 },
        { from: 500, to: 1000 },
        { from: 1000, to: 2000 },
        { from: 2000, to: 3000 },
        { from: 3000, to: 4000 },
        { from: 4000, to: 5000 },
        { from: 5000, to: 6000 },
        { from: 6000, to: 7000 },
        { from: 7000, to: 8000 },
        { from: 8000, to: 1000000 },
    ],
};

export type ScaleMappingName = keyof typeof SCALE_MAPPINGS;
