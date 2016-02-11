const Immutable = require('immutable');
const test = require('./try');
const expect = require('unexpected').clone().use(require('../lib/unexpected-immutable'));

test('Equality of two Maps', () =>
    expect(new Immutable.Map({a: 1, b: 2}), 'to equal', new Immutable.Map({a: 1, b: 2})));

test('Equality of nested iterables', () =>
    expect(new Immutable.List([new Immutable.Map({a:1})]), 'to equal', new Immutable.List([new Immutable.Map({a:1})])));

test('Constructor mismatch', () =>
    expect(() =>
        expect(new Immutable.List([1, 2, 3]), 'to equal', new Immutable.Map({a: 1, b: 2, c: 3})),
        'to error',
        'expected List [ 1, 2, 3 ] to equal Map { a: 1, b: 2, c: 3 }\n\nMismatching constructors Array should be Object'
    ));

test('Diff if not equal', () =>
    expect(() =>
        expect(new Immutable.List([1, 2, 3]), 'to equal', new Immutable.List([1, 2, 4])),
        'to error',
        'expected List [ 1, 2, 3 ] to equal List [ 1, 2, 4 ]\n\n' +
        '[\n' +
        '  1,\n  2,\n  3 // should equal 4\n' +
        ']'
    ));

test('Diff if nested not equal', () =>
    expect(() =>
        expect(new Immutable.List([new Immutable.Map({a:1})]), 'to equal', new Immutable.List([new Immutable.Map({a:2})])),
        'to error',
        'expected List [ { a: 1 } ] to equal List [ { a: 2 } ]\n\n' +
        '[\n' +
        '  {\n' +
        '    a: 1 // should equal 2\n' +
        '  }\n' +
        ']'
    ));
