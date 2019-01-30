import expect from 'unexpected'
import Immutable, { Map, List } from 'immutable'

test('Equality of two Maps', () =>
  expect(Map({ a: 1, b: 2 }), 'to equal', Map({ a: 1, b: 2 })))

test('Equality of nested iterables', () =>
  expect(
    Immutable.fromJS([{ a: 1 }]),
    'to equal',
    Immutable.fromJS([{ a: 1 }])
  ))

test('Constructor mismatch', () =>
  expect(
    () => expect(List([1, 2, 3]), 'to equal', Map({ a: 1, b: 2, c: 3 })),
    'to error',
    'expected List [ 1, 2, 3 ] to equal Map { a: 1, b: 2, c: 3 }\n\nMismatching constructors Array should be Object'
  ))

test('Diff if not equal', () =>
  expect(
    () => expect(List([1, 2, 3]), 'to equal', List([1, 2, 4])),
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
        Immutable.fromJS([{ a: 1 }]),
        'to equal',
        Immutable.fromJS([{ a: 2 }])
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
    () => expect(Map({ a: 1, b: 2 }), 'to satisfy', Map({ a: 1 })),
    'not to error'
  ))

test('<Immutable> to satisfy <Immutable>, diff', () =>
  expect(
    () => expect(Map({ a: 1, b: 2 }), 'to satisfy', Map({ a: 2 })),
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
        Map({ a: 1, b: 2 }),
        'to exhaustively satisfy',
        Map({ a: 1, b: 2 })
      ),
    'not to error'
  ))

test('<Immutable> to exhaustively satisfy <Immutable>, diff', () =>
  expect(
    () => expect(Map({ a: 1, b: 2 }), 'to exhaustively satisfy', Map({ a: 1 })),
    'to error',
    'expected Map { a: 1, b: 2 } to exhaustively satisfy Map { a: 1 }\n\n' +
      '{\n' +
      '  a: 1,\n' +
      '  b: 2 // should be removed\n' +
      '}'
  ))

test('<Immutable> to satisfy <any>, passing', () =>
  expect(
    () => expect(Map({ a: 1, b: 2 }), 'to satisfy', { a: 1 }),
    'not to error'
  ))

test('<Immutable> to satisfy <any>, diff', () =>
  expect(
    () => expect(Map({ a: 1, b: 2 }), 'to satisfy', { a: 2 }),
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
      expect(Map({ a: 1, b: 2 }), 'to exhaustively satisfy', { a: 1, b: 2 }),
    'not to error'
  ))

test('<Immutable> to exhaustively satisfy <any>, diff', () =>
  expect(
    () => expect(Map({ a: 1, b: 2 }), 'to exhaustively satisfy', { a: 1 }),
    'to error',
    'expected Map { a: 1, b: 2 } to exhaustively satisfy { a: 1 }\n\n' +
      '{\n' +
      '  a: 1,\n' +
      '  b: 2 // should be removed\n' +
      '}'
  ))

test('<Immutable> value at <array> <assertion>, pass', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'value at',
        ['a', 'b', 'c'],
        'to be',
        1
      ),
    'not to error'
  ))

test('<Immutable> value at <array> <assertion>, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'value at',
        ['a', 'b', 'd'],
        'to be',
        1
      ),
    'to error',
    'expected Map { a: Map ... } value at [ \'a\', \'b\', \'d\' ] to be 1'
  )
)

test('<Immutable> value at <string> <assertion>, period delimited, pass', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'value at',
        'a.b.c',
        'to be',
        1
      ),
    'not to error'
  ))

test('<Immutable> value at <string> <assertion>, period delimited, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'value at',
        'a.b.d',
        'to be',
        1
      ),
    'to error',
    'expected Map { a: Map ... } value at \'a.b.d\' to be 1'
  )
)

test('<Immutable> value at <string> <assertion>, slash delimited, pass', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'value at',
        'a/b/c',
        'to be',
        1
      ),
    'not to error'
  ))

test('<Immutable> value at <string> <assertion>, slash delimited, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'value at',
        'a/b/d',
        'to be',
        1
      ),
    'to error',
    'expected Map { a: Map ... } value at \'a/b/d\' to be 1'
  )
)

test('<Immutable> to have value at <array>, passing', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        ['a', 'b', 'c']
      ),
    'not to error'
  ))

test('<Immutable> to have value at <array>, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        ['a', 'b', 'd']
      ),
    'to error',
    'expected Map { a: Map ... } to have value at [ \'a\', \'b\', \'d\' ]'
  )
)

test('<Immutable> to have value at <array> <any>, passing', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        ['a', 'b', 'c'],
        1
      ),
    'not to error'
  ))

test('<Immutable> to have value at <array> <any>, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        ['a', 'b', 'd'],
        1
      ),
    'to error',
    'expected Map { a: Map ... } to have value at [ \'a\', \'b\', \'d\' ] of 1'
  )
)

test('<Immutable> to have value at <string>, passing', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        'a.b.c'
      ),
    'not to error'
  ))

test('<Immutable> to have value at <string>, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        'a.b.d'
      ),
    'to error',
    'expected Map { a: Map ... } to have value at \'a.b.d\''
  )
)

test('<Immutable> to have value at <string> <any>, passing', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        'a.b.c',
        1
      ),
    'not to error'
  ))

test('<Immutable> to have value at <string> <any>, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        'a.b.d',
        1
      ),
    'to error',
    'expected Map { a: Map ... } to have value at \'a.b.d\' of 1'
  )
)

test('<Immutable> to be empty, passing', () =>
  expect(
    () =>
      expect(
        Map(),
        'to be empty'
      ),
    'not to error'
  )
)

test('<Immutable> to be empty, diff', () =>
  expect(
    () =>
      expect(
        Map({ a: 1 }),
        'to be empty'
      ),
    'to error',
    'expected Map { a: 1 } to be empty'
  )
)
