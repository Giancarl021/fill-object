import clone from 'clone';

export = function fillObject<T extends {}>(
    partialValue: Partial<T>,
    defaultValue: T,
    overwriteOnTypeMismatch: boolean = false
): T {
    // Input checking
    if (typeof partialValue !== 'object' && partialValue !== null)
        throw new Error('partialValue must be an not null object');

    if (typeof defaultValue !== 'object' && defaultValue !== null)
        throw new Error('defaultValue must be an not null object');

    const result = clone(partialValue, true);

    const keys = Object.keys(defaultValue) as (keyof T)[];
    const keysToDelete = Object.keys(partialValue)
        .filter(key => !keys.includes(key as keyof T));

    for (const key of keysToDelete) {
        delete result[key as keyof T];
    }

    for (const key of keys) {
        fill(result, key, defaultValue);
    }

    return result as T;

    function fill<T extends {}>(
        partialValue: Partial<T>,
        key: keyof T,
        defaultValue: T
    ) {
        const defaultValueProp = defaultValue[key];
        const partialValueProp = partialValue[key];

        // Key existent in partialValue and with same type and value
        if (defaultValueProp === partialValueProp) return;

        // Key inexistent in partial value
        if (!partialValue.hasOwnProperty(key)) {
            partialValue[key] =
                typeof defaultValueProp === 'object'
                    ? clone(defaultValueProp, true)
                    : defaultValueProp;
            return;
        }

        // Key existent in partial value but with type mismatch
        // Type Mismatch && partialValue invalid (not object/null/undefined) && defaultValue valid (truthy)
        if (
            typeof partialValueProp !== typeof defaultValueProp &&
            (typeof partialValueProp !== 'object' ||
                isNullOrUndefined(partialValueProp)) &&
            !isNullOrUndefined(defaultValueProp)
        ) {
            if (overwriteOnTypeMismatch) {
                partialValue[key] = clone(defaultValueProp, true);
            }

            return;
        }

        // Value not an object, short circuiting
        // typeof defaultValueProp === typeof partialValueProp, so if defaultValueProp is not an object,
        // partialValueProp is not an object too
        if (typeof defaultValueProp !== 'object') {
            // If partialValueProp is null or undefined, use defaultValueProp
            if (isNullOrUndefined(partialValueProp)) {
                partialValue[key] = defaultValueProp;
            }
            return;
        }

        // partialValueProp is for sure an object
        const prop = partialValueProp!;

        // If defaultValueProp is null or undefined, use partialValueProp
        for (const key in defaultValueProp) {
            if (!prop.hasOwnProperty(key))
                prop[key] = clone(defaultValueProp[key], true);
            else if (typeof defaultValueProp === 'object')
                fill(prop, key, defaultValueProp);
            else if (isNullOrUndefined(prop[key]))
                prop[key] = defaultValueProp[key];
        }

        partialValue[key] = prop;
    }

    function isNullOrUndefined(value: any): boolean {
        return value === null || value === undefined;
    }
};
