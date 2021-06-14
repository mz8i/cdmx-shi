export const WEIGHTED_VARIABLES = {
    WV: {
        fullName: 'Water Variation',
        parentVariable: 'WSI',
    },
    WS: {
        fullName: 'Water Scarcity',
        parentVariable: 'WSI',
    },
    WE: {
        fullName: 'Water Exploitation',
        parentVariable: 'WSI',
    },
    WP: {
        fullName: 'Water Pollution',
        parentVariable: 'WSI',
    },
    NC: {
        fullName: 'Natural Capacity',
        parentVariable: 'ACI',
    },
    PC: {
        fullName: 'Physical Capacity',
        parentVariable: 'ACI',
    },
    HC: {
        fullName: 'Human Capacity',
        parentVariable: 'ACI',
    },
    EC: {
        fullName: 'Economic Capacity',
        parentVariable: 'ACI',
    },
};

export const WEIGHTING_SCENARIOS = {
    w1: { WV: 0.15, WS: 0.27, WE: 0.39, WP: 0.19, NC: 0.26, PC: 0.17, HC: 0.31, EC: 0.16 },
    w2: { WV: 0.17, WS: 0.5, WE: 0.14, WP: 0.19, NC: 0.4, PC: 0.41, HC: 0.1, EC: 0.09 },
    w3: { WV: 0.13, WS: 0.55, WE: 0.23, WP: 0.09, NC: 0.08, PC: 0.12, HC: 0.39, EC: 0.41 },
};
