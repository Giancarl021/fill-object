const { deepStrictEqual } = require('assert');
const fillObject = require('./index');

const complete = {
    user: {
        name: 'Unknown',
        age: null,
    },
    company: {
        name: 'Unknown',
        employees: []
    }
}

const partial = {
    user: {
        name: 'Giancarlo'
    },
    company: {
        name: 'GitHub'
    }
};

const actual = fillObject(partial, complete);

const expected = {
    user: {
        name: 'Giancarlo',
        age: null,
    },
    company: {
        name: 'GitHub',
        employees: []
    }
};

try {
    deepStrictEqual(actual, expected);
    console.log('✅ All tests passed!');
} catch (err) {
    console.log('❎ Tests failed!');
    console.error(err.message);
}