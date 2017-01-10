import test from 'ava'
import unexpected from 'unexpected'
import Immutable from 'immutable'
import unexpectedImmutable from '../lib/unexpected-immutable'

const expect = unexpected.clone().use(unexpectedImmutable)

test('Equality of two Maps', () =>
  expect(Immutable.Map({a: 1, b: 2}), 'to equal', Immutable.Map({a: 1, b: 2})))

test('Equality of nested iterables', () =>
  expect(Immutable.List([Immutable.Map({a: 1})]), 'to equal', Immutable.List([Immutable.Map({a: 1})])))

test('Constructor mismatch', () =>
  expect(() =>
    expect(Immutable.List([1, 2, 3]), 'to equal', Immutable.Map({a: 1, b: 2, c: 3})),
    'to error',
    'expected List [ 1, 2, 3 ] to equal Map { a: 1, b: 2, c: 3 }\n\nMismatching constructors Array should be Object'
  ))

test('Diff if not equal', () =>
  expect(() =>
    expect(Immutable.List([1, 2, 3]), 'to equal', Immutable.List([1, 2, 4])),
    'to error',
    'expected List [ 1, 2, 3 ] to equal List [ 1, 2, 4 ]\n\n' +
    '[\n' +
    '  1,\n  2,\n  3 // should equal 4\n' +
    ']'
  ))

test('Diff if nested not equal', () =>
  expect(
    () =>
      expect(
        Immutable.List([Immutable.Map({a: 1})]),
        'to equal',
        Immutable.List([Immutable.Map({a: 2})])
      ),
    'to error',
    'expected List [ Map ... ] to equal List [ Map ... ]\n\n' +
    '[\n' +
    '  {\n' +
    '    a: 1 // should equal 2\n' +
    '  }\n' +
    ']'
  ))

test('<Immutable> to satisfy <any>, passing', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to satisfy',
        Immutable.Map({a: 1})
      ),
    'not to error'
  ))

test('<Immutable> to satisfy <Immutable>, diff', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to satisfy',
        Immutable.Map({a: 2})
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to satisfy Map { a: 2 }\n\n' +
    '{\n' +
    '  a: 1, // should equal 2\n' +
    '  b: 2\n' +
    '}'
  ))

test('<Immutable> to exhaustively satisfy <Immutable>, passing', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        Immutable.Map({a: 1, b: 2})
      ),
    'not to error'
  ))

test('<Immutable> to exhaustively satisfy <Immutable>, diff', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        Immutable.Map({a: 1})
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to exhaustively satisfy Map { a: 1 }\n\n' +
    '{\n' +
    '  a: 1,\n' +
    '  b: 2 // should be removed\n' +
    '}'
  ))

test('<Immutable> to satisfy <any>, passing', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to satisfy',
        {a: 1}
      ),
    'not to error'
  ))

test('<Immutable> to satisfy <any>, diff', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to satisfy',
        {a: 2}
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to satisfy { a: 2 }\n\n' +
    '{\n' +
    '  a: 1, // should equal 2\n' +
    '  b: 2\n' +
    '}'
  ))

test('<Immutable> to exhaustively satisfy <any>, passing', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        {a: 1, b: 2}
      ),
    'not to error'
  ))

test('<Immutable> to exhaustively satisfy <any>, diff', () =>
  expect(
    () =>
      expect(
        Immutable.Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        {a: 1}
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to exhaustively satisfy { a: 1 }\n\n' +
    '{\n' +
    '  a: 1,\n' +
    '  b: 2 // should be removed\n' +
    '}'
  ))
