export const DATA_SOURCES = {
    colonias: {
        path: '/data/colonias.geojson',
        idField: 'ID_colonia',
        nameField: 'Colonia',
        parentNameField: 'Municipality',
    },
    alcaldias: {
        path: '/data/alcaldias.geojson',
        idField: 'Municipality',
        nameField: 'Municipality',
        parentNameField: null,
    },
    cdmx: {
        path: '/data/spatial/cdmx.geojson',
        idField: '',
        nameField: null,
        parentNameField: null,
    },
};
