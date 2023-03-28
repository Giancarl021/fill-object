import { test, expect } from '@jest/globals';
import fillObject from './index';

type CircularValue = typeof FILLED_OBJ & {
    d: CircularValue;
};

const EMPTY_OBJ = {} as const;
const PARTIAL_OBJ = { a: 1 };
const FILLED_OBJ = { a: 1, b: 2 };

test('Vibe check', () => {});

test('Empty object on both arguments must return empty object', () => {
    const result = fillObject(EMPTY_OBJ, EMPTY_OBJ);

    expect(result).toEqual(EMPTY_OBJ);
});

test('Empty object on partialValue must return defaultValue', () => {
    const result = fillObject(EMPTY_OBJ, FILLED_OBJ);

    expect(result).toEqual(FILLED_OBJ);
});

test('Empty object on defaultValue must return empty object', () => {
    const result = fillObject(FILLED_OBJ, EMPTY_OBJ);

    expect(result).toEqual(EMPTY_OBJ);
});

test('Result must contain values present defaultValue but missing in partialValue', () => {
    const result = fillObject(PARTIAL_OBJ, FILLED_OBJ);

    expect(result).toEqual(FILLED_OBJ);
});

test('Result must contain values present defaultValue but missing in partialValue recursively', () => {
    const filledObject = {
        ...FILLED_OBJ,
        c: FILLED_OBJ,
        d: {}
    };

    const result = fillObject(PARTIAL_OBJ, filledObject);

    expect(result).toEqual(filledObject);
});

test('Result must contain values present partialValue on type mismatch', () => {
    const partialObject = {
        a: '1'
    };

    const result = fillObject(partialObject as any, FILLED_OBJ);

    expect(result).toEqual({
        ...FILLED_OBJ,
        a: '1'
    });
});

test('Result must contain values present defaultValue on type mismatch if overwrite flag is present', () => {
    const partialObject = {
        a: '1'
    };

    const result = fillObject(partialObject as any, FILLED_OBJ, true);

    expect(result).toEqual(FILLED_OBJ);
});

test('Circular references must not affect the defaultValue', () => {
    const defaultValue: CircularValue = {
        ...FILLED_OBJ,
        d: {} as CircularValue
    };

    defaultValue.d = defaultValue;

    const result = fillObject(PARTIAL_OBJ, defaultValue);

    result.a = result.d.a = 3;

    expect(defaultValue.a).toEqual(1);
    expect(defaultValue.d.a).toEqual(1);
    expect(defaultValue.d).toEqual(defaultValue);
});