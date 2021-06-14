export const mapStyles = {
    hoverStyle: {
        weight: 2,
        color: '#ff0',
    },
    highlightStyle: {
        weight: 2,
        color: '#f00',
    },
};

export const mapLayers = {
    colonias: {
        dataStyle: {
            weight: 0.4,
            color: '#bbb',
            smoothFactor: 0.7,
        },
    },
    alcaldias: {
        dataStyle: {
            weight: 1,
            color: '#777',
            smoothFactor: 0,
        },
        borderStyle: {
            color: '#555',
            weight: 0.7,
            fill: false,
        },
    },
    cdmx: {
        borderStyle: {
            color: '#555',
            weight: 1,
            fill: false,
        },
    },
};
