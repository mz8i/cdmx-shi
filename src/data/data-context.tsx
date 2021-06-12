import { Feature, FeatureCollection, Geometry } from 'geojson';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DATA_SOURCES } from '../config/data-sources';
import { GeoLevel, VariableName } from '../config/variables';
import { objectMap } from '../util';
import { transformDataset } from './derive-data';

export type DataFeatureProperties = { [key in VariableName]?: any };
export type DataFeature = Feature<Geometry, DataFeatureProperties>;
export type DatasetFeatureCollection = FeatureCollection<Geometry, DataFeatureProperties>;

export type DataContextState =
    | { status: 'loading' | 'error'; data: null }
    | { status: 'loaded'; data: DatasetFeatureCollection };

const dataContexts = objectMap(DATA_SOURCES, () => createContext<DataContextState | null>(null));

export const useData = (key: keyof typeof DATA_SOURCES): DataContextState => {
    if (dataContexts[key] == null) {
        throw new Error(`'${key}' is not a defined dataset`);
    }

    const contextState = useContext(dataContexts[key]);

    if (contextState === null) {
        throw new Error('useItemData must be used within a ItemDataProvider tag');
    }

    return contextState;
};

export const DataProvider: React.FC<{ dataset: GeoLevel }> = ({ dataset, children }) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [data, setData] = useState<DatasetFeatureCollection | null>(null);

    useEffect(() => {
        setStatus('loading');

        (async () => {
            try {
                const path = DATA_SOURCES[dataset]?.path;

                const response = await fetch(path);
                const json = await response.json();
                transformDataset(json, dataset);
                setStatus('loaded');
                setData(json);
            } catch (err) {
                setStatus('error');
            }
        })();
    }, [dataset]);

    const state = useMemo<DataContextState>(
        () =>
            ({
                status,
                data,
            } as DataContextState),
        [status, data]
    );

    const Ctx = dataContexts[dataset];

    return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
};
