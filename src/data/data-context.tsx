import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DATA_SOURCES } from "../config/data-sources";
import { objectMap } from "../util";

type DataContextState = 
    { status: 'loading' | 'error', data: undefined }
    | { status: 'loaded'; data: any};


const dataContexts = objectMap(
    DATA_SOURCES,
    () => createContext<DataContextState | null>(null)
)

export const useData = (key: keyof typeof DATA_SOURCES): DataContextState => {
    if (dataContexts[key] == null) {
        throw new Error(`'${key}' is not a defined dataset`);
    }

    const contextState = useContext(dataContexts[key])

    if (contextState === null) {
        throw new Error("useItemData must be used within a ItemDataProvider tag");
    }

    return contextState;
}

export const DataProvider: React.FC<{dataset: string}> = ({ dataset, children }) => {
    const path = DATA_SOURCES[dataset]?.path;

    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [data, setData] = useState(undefined);

    useEffect(() => {
        setStatus('loading');

        (async () => {
            try {
                const response = await fetch(path);
                const json = await response.json();
                
                setStatus('loaded');
                setData(json);
            } catch(err) {
                setStatus('error');
            }

        })();
    }, [path]);

    const state = useMemo<DataContextState>(() => ({
        status,
        data
    }), [status, data])

    const Ctx = dataContexts[dataset];

    return <Ctx.Provider value={state}>
        {children}
    </Ctx.Provider>;
};