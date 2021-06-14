export function objectMap<T extends object, R>(obj: T, fn: (v: any) => R) {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]));
}

export function valueType<C>() {
    return <K extends string>(cfg: Record<K, C>) =>
        cfg as {
            [key in K]: typeof cfg[key];
        };
}
