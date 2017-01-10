import test from 'ava'
import unexpected from 'unexpected'
import {Map} from 'immutable'
import unexpectedImmutable from '../lib/unexpected-immutable'

const expect = unexpected.clone().use(unexpectedImmutable)
expect.output.preferredWidth = 150

test('<ImmutableKeyed> to have values satisfying <any>, passing', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to have values satisfying',
        expect.it('to be a number')
      ),
    'not to error'
  ))

test('<ImmutableKeyed> to have values satisfying <any>, diff', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 'text'}),
        'to have values satisfying',
        expect.it('to be a number')
      ),
    'to error',
    'expected Map { a: 1, b: \'text\' } to have values satisfying expect.it(\'to be a number\')\n\n' +
    '{\n' +
    '  a: 1,\n' +
    '  b: \'text\' // should be a number\n' +
    '}'
  ))

test('<ImmutableKeyed> to have property <string> <any>, passing', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'to have property',
        'b', 2
      ),
    'not to error'
  ))

test('<ImmutableKeyed> to have property <string> <any>, diff', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 'text'}),
        'to have property',
        'b', 2
      ),
    'to error',
    'expected Map { a: 1, b: \'text\' } to have property \'b\', 2'
  ))

test('<ImmutableKeyed> not to have property <string>, passing', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 2}),
        'not to have property',
        'c'
      ),
    'not to error'
  ))

test('<ImmutableKeyed> not to have property <string>, diff', () =>
  expect(
    () =>
      expect(
        new Map({a: 1, b: 'text'}),
        'not to have property',
        'b'
      ),
    'to error',
    'expected Map { a: 1, b: \'text\' } not to have property \'b\''
  ))
