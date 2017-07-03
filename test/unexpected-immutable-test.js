import test from 'ava'
import unexpected from 'unexpected'
import Immutable, {Map, List} from 'immutable'
import unexpectedImmutable from '../lib/unexpected-immutable'

const expect = unexpected.clone().use(unexpectedImmutable)
expect.output.preferredWidth = 150

test('Equality of two Maps', () =>
  expect(new Map({a: 1, b: 2}), 'to equal', new Map({a: 1, b: 2})))

test('Equality of nested iterables', () =>
  expect(Immutable.fromJS([{a: 1}]), 'to equal', Immutable.fromJS([{a: 1}]))
)

test('Constructor mismatch', () =>
  expect(() =>
    expect(new List([1, 2, 3]), 'to equal', new Map({a: 1, b: 2, c: 3})),
    'to error',
    'expected List [ 1, 2, 3 ] to equal Map { a: 1, b: 2, c: 3 }\n\nMismatching constructors Array should be Object'
  )
)

test('Diff if not equal', () =>
  expect(() =>
    expect(new List([1, 2, 3]), 'to equal', new List([1, 2, 4])),
    'to error',
    'expected List [ 1, 2, 3 ] to equal List [ 1, 2, 4 ]\n\n' +
    '[\n' +
    '  1,\n  2,\n  3 // should equal 4\n' +
    ']'
  )
)

test('Diff if nested not equal', () =>
  expect(
    () =>
      expect(
        Immutable.fromJS([{a: 1}]),
        'to equal',
        Immutable.fromJS([{a: 2}])
      ),
    'to error',
    'expected List [ Map ... ] to equal List [ Map ... ]\n\n' +
    '[\n' +
    '  {\n' +
    '    a: 1 // should equal 2\n' +
    '  }\n' +
    ']'
  )
)

test('<Immutable> to satisfy <any>, passing', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to satisfy',
        new Map({a: 1})
      ),
    'not to error'
  )
)

test('<Immutable> to satisfy <Immutable>, diff', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to satisfy',
        new Map({a: 2})
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to satisfy Map { a: 2 }\n\n' +
    '{\n' +
    '  a: 1, // should equal 2\n' +
    '  b: 2\n' +
    '}'
  )
)

test('<Immutable> to exhaustively satisfy <Immutable>, passing', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        new Map({a: 1, b: 2})
      ),
    'not to error'
  )
)

test('<Immutable> to exhaustively satisfy <Immutable>, diff', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        new Map({a: 1})
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to exhaustively satisfy Map { a: 1 }\n\n' +
    '{\n' +
    '  a: 1,\n' +
    '  b: 2 // should be removed\n' +
    '}'
  )
)

test('<Immutable> to satisfy <any>, passing', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to satisfy',
        {a: 1}
      ),
    'not to error'
  )
)

test('<Immutable> to satisfy <any>, diff', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to satisfy',
        {a: 2}
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to satisfy { a: 2 }\n\n' +
    '{\n' +
    '  a: 1, // should equal 2\n' +
    '  b: 2\n' +
    '}'
  )
)

test('<Immutable> to exhaustively satisfy <any>, passing', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        {a: 1, b: 2}
      ),
    'not to error'
  )
)

test('<Immutable> to exhaustively satisfy <any>, diff', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to exhaustively satisfy',
        {a: 1}
      ),
    'to error',
    'expected Map { a: 1, b: 2 } to exhaustively satisfy { a: 1 }\n\n' +
    '{\n' +
    '  a: 1,\n' +
    '  b: 2 // should be removed\n' +
    '}'
  )
)

test('<Immutable> extracting value at <array> <assertion>, pass', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'extracting value at',
        ['a', 'b', 'c'],
        'to be', 1
      ),
      'not to error'
    )
)

test('<Immutable> extracting value at <array> <assertion>, diff', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'extracting value at',
        ['a', 'b', 'd'],
        'to be', 1
      ),
    'to error',
    'expected Map { a: Map ... } extracting value at [ \'a\', \'b\', \'d\' ] to be 1'
  )
)

test('<Immutable> extracting value at <string> <assertion>, period delimited, pass', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'extracting value at',
        'a.b.c',
        'to be', 1
      ),
      'not to error'
    )
)

test('<Immutable> extracting value at <string> <assertion>, period delimited, diff', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'extracting value at',
        'a.b.d',
        'to be', 1
      ),
    'to error',
    'expected Map { a: Map ... } extracting value at \'a.b.d\' to be 1'
  )
)

test('<Immutable> extracting value at <string> <assertion>, slash delimited, pass', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'extracting value at',
        'a/b/c',
        'to be', 1
      ),
      'not to error'
    )
)

test('<Immutable> extracting value at <string> <assertion>, slash delimited, diff', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'extracting value at',
        'a/b/d',
        'to be', 1
      ),
    'to error',
    'expected Map { a: Map ... } extracting value at \'a/b/d\' to be 1'
  )
)

test('<Immutable> to have deep value <array>, passing', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        ['a', 'b', 'c']
      ),
    'not to error'
  )
)

test('<Immutable> to have deep value <array>, diff', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        ['a', 'b', 'd']
      ),
    'to error',
    'expected Map { a: Map ... } to have deep value [ \'a\', \'b\', \'d\' ]'
  )
)

test('<Immutable> to have deep value <array> <any>, passing', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        ['a', 'b', 'c'],
        1
      ),
    'not to error'
  )
)

test('<Immutable> to have deep value <array> <any>, diff', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        ['a', 'b', 'd'],
        1
      ),
    'to error',
    'expected Map { a: Map ... } to have deep value of 1 at [ \'a\', \'b\', \'d\' ]'
  )
)

test('<Immutable> to have deep value <string>, passing', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        'a.b.c'
      ),
    'not to error'
  )
)

test('<Immutable> to have deep value <string>, diff', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        'a.b.d'
      ),
    'to error',
    'expected Map { a: Map ... } to have deep value \'a.b.d\''
  )
)

test('<Immutable> to have deep value <string> <any>, passing', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        'a.b.c',
        1
      ),
    'not to error'
  )
)

test('<Immutable> to have deep value <string> <any>, diff', () =>
  expect(
    () =>
      expect(
        new Map({ a: new Map({ b: new Map({ c: 1 }) }) }),
        'to have deep value',
        'a.b.d',
        1
      ),
    'to error',
    'expected Map { a: Map ... } to have deep value of 1 at \'a.b.d\''
  )
)
