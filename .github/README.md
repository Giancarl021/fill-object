# fill-object

![](assets/logo.png)

Fill deep properties missing in an object based on a default object
## Similar projects

* [Lodash/defaultsDeep](https://lodash.com/docs/4.17.15#defaultsDeep) - Lodash function;
* [defaults](https://www.npmjs.com/package/defaults) - NPM package;

## Why?

This package is a simple and lightweight alternative to the Lodash function, to fill an partial object with a default value. This package is made specifically to deal with nested options objects, where a schema must be followed, so, as a side-effect, any property that is not in the schema will be removed.

## Installation

You can get this package on [NPM](https://www.npmjs.com/package/fill-object).

## Usage

### Importing

CommonJS:

```ts
const fillObject = require('fillObject');
```

ES Modules:

```js
import fillObject from 'fillObject';
```

### Calling

The `fillObject` function require two parameters and accepts a third optional parameter:

```ts
export = function fillObject<T extends {}>(
    partialValue: Partial<T>,
    defaultValue: T,
    overwriteOnTypeMismatch: boolean = false
): T
```

* `partialValue (Partial<T>)`: The partial value to be filled;
* `defaultValue (T)`: The default value to fill the partial value;
* `overwriteOnTypeMismatch (boolean)`: If `true`, the value will be overwritten if the types do not match. Defaults to `false`.

### Examples

```ts
const defaultOptions = {
    a: 1,
    b: 2,
    c: 3
};
```

**Usual filling:**

```ts
const options = fillObject({ a: 10 }, defaultOptions);

console.log(options);
// -> { a: 10, b: 2, c: 3 }
```

**Removing extra properties:**

```ts
const options = fillObject({ a: 10, d: 4 } as any, defaultOptions);

console.log(options);
// -> { a: 10, b: 2, c: 3 }
```

**Type mismatch default behavior:**

```ts
const options = fillObject({ a: '10' } as any, defaultOptions);

console.log(options);
// -> { a: '10', b: 2, c: 3 }
```

**Type mismatch with `overwriteOnTypeMismatch` set to `true`:**

```ts
const options = fillObject({ a: '10' } as any, defaultOptions, true);

console.log(options);
// -> { a: 1, b: 2, c: 3 }
```

## Tests

This library uses [Jest](https://jestjs.io/) for testing. To run the tests, use the following command:

```sh
yarn test
```