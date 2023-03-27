# fill-object

Fill object properties missing in an object based on a default object

## Installation

npm:

```bash
npm install --save fill-object
```

Yarn:

```bash
yarn add fill-object
```

## Usage

First, import the library:

```javascript
const fillObject = require('fill-object');
```

Then you can use the imported function to infer the type of a string input:

```javascript
const defaultUser = {
    name: 'Unknown',
    age: 0,
    job: 'Unknown'
};

function fillUser(user = {}) {
    return fillObject(user, defaultUser);
}

const user = fillUser({ name: 'Giancarlo' });

console.log(user); // { name: 'Giancarlo', age: 0, job: 'Unknown' }
```

## Tests

If you want to test the library, you can run the tests by running the following commands on the root of the project:

npm:
```bash
npm install
npm test
```

Yarn:
```bash
yarn
yarn test
```