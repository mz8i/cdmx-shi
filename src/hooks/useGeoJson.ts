import { useState, useEffect, useCallback } from 'react';

function useGeoJson(url: string): [any, boolean] {
    const [data, setData] = useState(undefined);

    const [loading, setLoading] = useState(true);

    const fetchUrl = useCallback(async () => {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        fetchUrl();
    }, [fetchUrl]);

    return [data, loading];
}
export { useGeoJson };
