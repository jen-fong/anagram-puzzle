type Key = string | number | symbol;

export function defaultDict<K extends Key, V>(createValue: (key: K) => V): Record<K, V> {
    const storage = {} as Record<K, V>;

    return new Proxy(storage, {
        get(target, prop: string | symbol) {
            // Ignore symbols
            if (typeof prop === 'symbol') {
                return target[prop as K];
            }

            const key = prop as K;

            if (!(key in target)) {
                target[key] = createValue(key);
            }

            return target[key];
        },
    });
}
