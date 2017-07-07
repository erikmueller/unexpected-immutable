import expect from 'unexpected'
import { Map } from 'immutable'

describe('to have values satisfying <any>', function () {
  test('expect <ImmutableKeyed> to have values satisfying <any>', () =>
    expect(
      Map({ a: 1, b: 2 }),
      'to have values satisfying',
      expect.it('to be a number')
    )
  )

  test('expect error fot <ImmutableKeyed> to have values satisfying <any>', () =>
    expect(
      () =>
        expect(
          Map({ a: 1, b: 'text' }),
          'to have values satisfying',
          expect.it('to be a number')
        ),
      'to error',
      "expected Map { a: 1, b: 'text' } to have values satisfying expect.it('to be a number')\n\n" +
        '{\n' +
        '  a: 1,\n' +
        "  b: 'text' // should be a number\n" +
        '}'
    )
  )
})

describe('to have property <string>', function () {
  test('expect <ImmutableKeyed> not to have property <string>', () =>
    expect(
      () => expect(Map({ a: 1, b: 2 }), 'not to have property', 'c'),
      'not to error'
    )
  )

  test('expect error for <ImmutableKeyed> not to have property <string>', () =>
    expect(
      () => expect(Map({ a: 1, b: 'text' }), 'not to have property', 'b'),
      'to error',
      "expected Map { a: 1, b: 'text' } not to have property 'b'"
    )
  )
})

describe('to have property <string> <any>', function () {
  test('expect <ImmutableKeyed> to have property <string> <any>', () =>
    expect(Map({ a: 1, b: 2 }), 'to have property', 'b', 2)
  )

  test('expect error for <ImmutableKeyed> to have property <string> <any>', () =>
    expect(
      () => expect(Map({ a: 1, b: 'text' }), 'to have property', 'b', 2),
      'to error',
      "expected Map { a: 1, b: 'text' } to have property 'b', 2"
    ))
})
