const Immutable = require('immutable');
const expect = require('unexpected').clone().use(require('../lib/unexpected-immutable'));

const test = (name, expectation) => {
    try {
        expectation();
        console.log('✔', name, 'passed.'); //eslint-disable-line no-console
    } catch (e) {
        console.error('✘', name, 'failed.'); //eslint-disable-line no-console
        throw e;
    }
};

test('Ensure equality of two `Maps`', () =>
    expect(new Immutable.Map({a: 1, b: 2}), 'to equal', new Immutable.Map({a: 1, b: 2})));
