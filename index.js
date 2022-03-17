const clone = require('clone');

module.exports = function (origin, source, overwriteOnTypeConflict = false) {
    if (typeof origin !== 'object' && origin !== null) throw new Error('origin must be an not null object');
    if (typeof source !== 'object' && source !== null) throw new Error('source must be an not null object');

    const r = clone(origin);

    Object.keys(source).forEach(key => fill(r, key));

    return r;

    function fill(target, key, _source = source) {
        const sourceValue = _source[key];
        const targetValue = target[key];

        if (!target.hasOwnProperty(key)) {
            target[key] = typeof sourceValue === 'object' ? clone(sourceValue) : sourceValue;
            return;
        }

        if (typeof targetValue !== typeof sourceValue && (typeof targetValue !== 'object' || targetValue === null)) {
            if (overwriteOnTypeConflict) {
                target[key] = clone(sourceValue);
            }

            return;
        }

        for (const key in sourceValue) {
            if (!targetValue.hasOwnProperty(key)) targetValue[key] = clone(sourceValue[key]);
            else if (typeof sourceValue === 'object') fill(targetValue, key, sourceValue);
        }

        target[key] = targetValue;
    }
}