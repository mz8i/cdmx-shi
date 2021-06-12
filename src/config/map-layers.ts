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
            weight: 0.5,
            color: '#ccc',
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
            color: '#777',
            weight: 1,
            fill: false,
        },
    },
    cdmx: {
        borderStyle: {
            color: '#777',
            weight: 2,
            fill: false,
        },
    },
};
