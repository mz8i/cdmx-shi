import { useMemo } from "react";

export function useLoadingData<D, R>(data: D, loading: boolean, callback: (data: D) => R): R | undefined {
    return useMemo(() => {
        if(loading) {
            return undefined;
        } else {
            return callback(data);
        }
    }, [data, loading, callback]);
}