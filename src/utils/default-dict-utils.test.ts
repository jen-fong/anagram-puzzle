import { defaultDict } from '@/utils/default-dict-utils';

describe('Default Dict Utils', () => {
    it('should initialize a key with the default value when accessed for the first time', () => {
        const dict = defaultDict<string, string[]>(() => []);

        const value = dict.testKey;

        expect(value).toEqual([]);
        expect('testKey' in dict).toBe(true);
    });

    it('should return the same reference when accessing subsequently', () => {
        const dict = defaultDict<string, string[]>(() => []);

        const firstAccess = dict.key;
        firstAccess!.push('foo');
        const secondAccess = dict.key;

        expect(secondAccess).toBe(firstAccess);
        expect(secondAccess).toEqual(['foo']);
    });

    it('should be able to create keys using the key passed', () => {
        const dict = defaultDict<string, string>((key) => `prefix_${key}`);

        expect(dict.hello).toBe('prefix_hello');
        expect(dict.world).toBe('prefix_world');
    });
});
