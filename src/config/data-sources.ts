export const DATA_SOURCES = {
    colonias: {
        path: '/data/colonias.geojson'
    },
    alcaldias: {
        path: '/data/alcaldias.geojson'
    },
    cdmx: {
        path: '/data/spatial/cdmx.geojson'
    }
};

export type DatasetName = keyof typeof DATA_SOURCES;