import test from 'ava'
import unexpected from 'unexpected'
import {List} from 'immutable'
import unexpectedImmutable from '../lib/unexpected-immutable'

const expect = unexpected.clone().use(unexpectedImmutable)
expect.output.preferredWidth = 150

test('<ImmutableIndexed> to have items [exhaustively] satisfying <any>, passing', () =>
  expect(
    () =>
      expect(
        new List([1, 2, 3]),
        'to have items satisfying',
        expect.it('to be a number')
      ),
    'not to error'
  ))

test('<ImmutableIndexed> to have items [exhaustively] satisfying <any>, diff', () =>
  expect(
    () =>
      expect(
        new List([1, 2, 'text']),
        'to have items satisfying',
        expect.it('to be a number')
      ),
    'to error',
    'expected List [ 1, 2, \'text\' ] to have items satisfying expect.it(\'to be a number\')\n\n' +
    '[\n' +
    '  1,\n' +
    '  2,\n' +
    '  \'text\' // should be a number\n' +
    ']'
  ))

test('<ImmutableIndexed> to have items [exhaustively] satisfying <assertion>, passing', () =>
  expect(
    () =>
      expect(
        new List([1, 2, 3]),
        'to have items satisfying',
        'to be a number'
      ),
    'not to error'
  ))

test('<ImmutableIndexed> to have items [exhaustively] satisfying <assertion>, diff', () =>
  expect(
    () =>
      expect(
        new List([1, 2, 'text']),
        'to have items satisfying',
        'to be a number'
      ),
    'to error',
    'expected List [ 1, 2, \'text\' ] to have items satisfying to be a number\n\n' +
    '[\n' +
    '  1,\n' +
    '  2,\n' +
    '  \'text\' // should be a number\n' +
    ']'
  ))
