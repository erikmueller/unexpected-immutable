import expect from 'unexpected'
import Immutable, { Map, List } from 'immutable'

describe('to equal', function () {
  test('expect <Iterable> to equal <Iterable>', function () {
    expect(
      Immutable.fromJS([{ a: 1 }]),
      'to equal',
      Immutable.fromJS([{ a: 1 }])
    )
  })

  test('expect error for <Iterable> to equal <Iterable>', () =>
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
    )
  )

  test('expect error for <List> to equal <Map>', function () {
    expect(
      () =>
        expect(
          List([1, 2, 3]), 'to equal', Map({ a: 1, b: 2, c: 3 })),
          'to error',
          'expected List [ 1, 2, 3 ] to equal Map { a: 1, b: 2, c: 3 }\n\nMismatching constructors Array should be Object'
    )
  })
})

describe('to satisfy', function () {
  test('expect <Immutable> to satisfy <any>', () =>
    expect(Map({ a: 1, b: 2 }), 'to satisfy', { a: 1 })
  )

  test('expect error for <Immutable> to satisfy <any>', () =>
    expect(
      () => expect(Map({ a: 1, b: 2 }), 'to satisfy', { a: 2 }),
      'to error',
      'expected Map { a: 1, b: 2 } to satisfy { a: 2 }\n\n' +
        '{\n' +
        '  a: 1, // should equal 2\n' +
        '  b: 2\n' +
        '}'
    )
  )

  test('expect <Immutable> to satisfy <Immutable>', () =>
    expect(Map({ a: 1, b: 2 }), 'to satisfy', Map({ a: 1 }))
  )

  test('expect error for <Immutable> to satisfy <Immutable>', () =>
    expect(
      () =>
        expect(Map({ a: 1, b: 2 }), 'to satisfy', Map({ a: 2 })),
        'to error',
        'expected Map { a: 1, b: 2 } to satisfy Map { a: 2 }\n\n' +
          '{\n' +
          '  a: 1, // should equal 2\n' +
          '  b: 2\n' +
          '}'
      )
  )
})

describe('to exhaustively satisfy', function () {
  test('expect <Immutable> to exhaustively satisfy <any>', () =>
    expect(Map({ a: 1, b: 2 }), 'to exhaustively satisfy', { a: 1, b: 2 })
  )

  test('expect error for <Immutable> to exhaustively satisfy <any>', () =>
    expect(
      () => expect(Map({ a: 1, b: 2 }), 'to exhaustively satisfy', { a: 1 }),
      'to error',
      'expected Map { a: 1, b: 2 } to exhaustively satisfy { a: 1 }\n\n' +
        '{\n' +
        '  a: 1,\n' +
        '  b: 2 // should be removed\n' +
        '}'
    )
  )

  test('expect <Immutable> to exhaustively satisfy <Immutable>', () =>
    expect(Map({ a: 1, b: 2 }), 'to exhaustively satisfy', Map({ a: 1, b: 2 }))
  )

  test('expect error for <Immutable> to exhaustively satisfy <Immutable>', () =>
    expect(
      () =>
        expect(Map({ a: 1, b: 2 }), 'to exhaustively satisfy', Map({ a: 1 })),
        'to error',
        'expected Map { a: 1, b: 2 } to exhaustively satisfy Map { a: 1 }\n\n' +
          '{\n' +
          '  a: 1,\n' +
          '  b: 2 // should be removed\n' +
          '}'
      )
  )
})

describe('value at', function () {
  describe('<array> <assertion>', function () {
    test('expect <Immutable> value at <array> <assertion>', () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'value at',
        ['a', 'b', 'c'],
        'to be',
        1
      )
    )

    test('expect error for <Immutable> value at <array> <assertion>', () =>
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
  })

  describe('<string> <assertion>', function () {
    describe('period delimited', function () {
      test('expect <Immutable> value at <string> <assertion>', () =>
        expect(
          Map({ a: Map({ b: Map({ c: 1 }) }) }),
          'value at',
          'a.b.c',
          'to be',
          1
        )
      )

      test('expect error for <Immutable> value at <string> <assertion>', () =>
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
    })

    describe('slash delimited', function () {
      test('expect <Immutable> value at <string> <assertion>', () =>
        expect(
          Map({ a: Map({ b: Map({ c: 1 }) }) }),
          'value at',
          'a/b/c',
          'to be',
          1
        )
      )

      test('expect error for <Immutable> value at <string> <assertion>', () =>
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
    })
  })
})

describe('[not] to have value at', function () {
  test('expect <Immutable> not to have value at <string|array>', () =>
    expect(
      Map({ a: Map({ b: Map({ c: 1 }) }) }),
      'not to have value at',
      'a.b.c.d'
    )
  )

  describe('<string>', function () {
    test('expect <Immutable> to have value at <string>', () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        'a.b.c'
      )
    )

    test('expect error for <Immutable> to have value at <string>', () =>
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
  })

  describe('<string> <any>', function () {
    test('expect <Immutable> to have value at <string> <any>', () =>
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

    test('expect error for <Immutable> to have value at <string> <any>', () =>
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
  })

  describe('<array>', function () {
    test('expect <Immutable> to have value at <array>', () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        ['a', 'b', 'c']
      )
    )

    test('expect error for <Immutable> to have value at <array>', () =>
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
  })

  describe('<array> <any>', function () {
    test('expect <Immutable> to have value at <array> <any>', () =>
      expect(
        Map({ a: Map({ b: Map({ c: 1 }) }) }),
        'to have value at',
        ['a', 'b', 'c'],
        1
      )
    )

    test('expect error for <Immutable> to have value at <array> <any>', () =>
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
  })
})
