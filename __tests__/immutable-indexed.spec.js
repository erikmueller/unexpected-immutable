import expect from 'unexpected'
import { List } from 'immutable'

describe('to have items [exhaustively] satisfying <any>', function () {
  test('expect <ImmutableIndexed> to have items [exhaustively] satisfying <any>', () =>
    expect(
      List([1, 2, 3]),
      'to have items satisfying',
      expect.it('to be a number')
    )
  )

  test('expect error for <ImmutableIndexed> to have items [exhaustively] satisfying <any>', () =>
    expect(
      () =>
        expect(
          List([1, 2, 'text']),
          'to have items satisfying',
          expect.it('to be a number')
        ),
      'to error',
      "expected List [ 1, 2, 'text' ] to have items satisfying expect.it('to be a number')\n\n" +
        '[\n' +
        '  1,\n' +
        '  2,\n' +
        "  'text' // should be a number\n" +
        ']'
    )
  )
})

describe('to have items [exhaustively] satisfying <assertion>', function () {
  test('expect <ImmutableIndexed> to have items [exhaustively] satisfying <assertion>', () =>
    expect(List([1, 2, 3]), 'to have items satisfying', 'to be a number')
  )

  test('expect error for <ImmutableIndexed> to have items [exhaustively] satisfying <assertion>', () =>
    expect(
      () =>
        expect(
          List([1, 2, 'text']),
          'to have items satisfying',
          'to be a number'
        ),
      'to error',
      "expected List [ 1, 2, 'text' ] to have items satisfying to be a number\n\n" +
        '[\n' +
        '  1,\n' +
        '  2,\n' +
        "  'text' // should be a number\n" +
        ']'
    )
  )
})
