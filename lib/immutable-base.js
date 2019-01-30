import Immutable from 'immutable'

/**
 * Base type and assertions
 */

const types = [
  {
    name: 'Immutable',
    identify: function (obj) {
      return obj && Immutable.Iterable.isIterable(obj)
    },
    equal: function (obj1, obj2) {
      return Immutable.is(obj1, obj2)
    },
    inspect: function (obj, depth, output, inspect) {
      output.jsKeyword(obj.constructor.name + ' ').append(inspect(obj.toJS()))
    },
    diff: function (actual, expected, output, diff) {
      return diff(actual.toJS(), expected.toJS())
    }
  }
]

const assertions = [
  [
    '<Immutable> to [exhaustively] satisfy <Immutable>',
    function (expect, subject, pattern) {
      return expect(subject.toJS(), 'to [exhaustively] satisfy', pattern.toJS())
    }
  ],
  [
    '<Immutable> to [exhaustively] satisfy <any>',
    function (expect, subject, pattern) {
      return expect(subject.toJS(), 'to [exhaustively] satisfy', pattern)
    }
  ],
  [
    '<Immutable> value at <array> <assertion>',
    function (expect, subject, path) {
      expect(subject.hasIn(path), 'to be true')
      return expect.shift(subject.getIn(path))
    }
  ],
  [
    '<Immutable> value at <string> <assertion>',
    function (expect, subject, pathStr) {
      const path = pathStr.split(/[./]/)
      return expect.shift(subject.getIn(path))
    }
  ],
  [
    '<Immutable> to have value at <array|string> <any?>',
    function (expect, subject, path, value) {
      if (value !== undefined) {
        expect.argsOutput = function (output) {
          output.appendInspected(path).text(' of ').appendInspected(value)
        }
        return expect(subject, 'value at', path, 'to equal', value)
      } else {
        const pathArray = typeof path === 'string' ? path.split(/[./]/) : path
        return expect(subject.hasIn(pathArray), 'to be true')
      }
    }
  ],
  [
    '<Immutable> to be empty',
    function (expect, subject) {
      return expect(subject.size, 'to be', 0)
    }
  ]
]

export default {types, assertions}
