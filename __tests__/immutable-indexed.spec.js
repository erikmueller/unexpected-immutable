import expect from '../expect'
import { List } from 'immutable'

test('<ImmutableIndexed> to have items [exhaustively] satisfying <any>, passing', () =>
  expect(
    () =>
      expect(
        List([1, 2, 3]),
        'to have items satisfying',
        expect.it('to be a number')
      ),
    'not to error'
  ))

test('<ImmutableIndexed> to have items [exhaustively] satisfying <any>, diff', () =>
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
  ))

test('<ImmutableIndexed> to have items [exhaustively] satisfying <assertion>, passing', () =>
  expect(
    () => expect(List([1, 2, 3]), 'to have items satisfying', 'to be a number'),
    'not to error'
  ))

test('<ImmutableIndexed> to have items [exhaustively] satisfying <assertion>, diff', () =>
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
  ))
