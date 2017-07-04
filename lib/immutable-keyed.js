import Immutable from 'immutable'

/**
 * Object-like type and assertions
 */

const types = [
  {
    name: 'ImmutableKeyed',
    base: 'Immutable',
    identify: function (obj) {
      return obj && Immutable.Iterable.isKeyed(obj)
    },
    inspect: function (obj, depth, output, inspect) {
      output
        .jsKeyword(obj.constructor.name + ' ')
        .append(inspect(obj.toObject()))
    }
  }
]

const assertions = [
  [
    '<ImmutableKeyed> to have values [exhaustively] satisfying <any>',
    function (expect, subject, pattern) {
      return expect(
        subject.toObject(),
        'to have values [exhaustively] satisfying',
        pattern
      )
    }
  ],
  [
    '<ImmutableKeyed> to have [own] property <string> <any>',
    function (expect, subject, name, value) {
      return expect(subject.toObject(), 'to have [own] property', name, value)
    }
  ],
  [
    '<ImmutableKeyed> [not] to have property <string>',
    function (expect, subject, name) {
      return expect(subject.toObject(), '[not] to have property', name)
    }
  ]
]

export default { types, assertions }
