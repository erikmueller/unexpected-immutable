const Immutable = require('immutable')

module.exports = {
  name: 'unexpected-immutable',
  installInto: function (expect) {
    expect.addType({
      name: 'Immutable',
      identify: function (obj) {
        return obj && Immutable.Iterable.isIterable(obj)
      },
      equal: function (obj1, obj2) {
        return Immutable.is(obj1, obj2)
      },
      inspect: function (obj, depth, output) {
        output.jsKeyword(obj.constructor.name + ' ').appendInspected(obj.toJS())
      },
      diff: function (actual, expected, output, diff) {
        return diff(actual.toJS(), expected.toJS())
      }
    })

    expect.addAssertion('<Immutable> to [exhaustively] satisfy <any>', function (expect, subject, pattern) {
      return expect(subject.toJS(), 'to [exhaustively] satisfy', pattern)
    })

    expect.addType({
      name: 'ImmutableMap',
      base: 'Immutable',
      identify: function (obj) {
        return obj && Immutable.Map.isMap(obj)
      }
    })
    expect.addAssertion('<ImmutableMap> to have values [exhaustively] satisfying <any>', function (expect, subject, pattern) {
      return expect(subject.toObject(), 'to have values [exhaustively] satisfying', pattern)
    })
    expect.addAssertion('<ImmutableMap> to have [own] property <string> <any>', function (expect, subject, name, value) {
      return expect(subject.toObject(), 'to have [own] property', name, value)
    })
    expect.addAssertion('<ImmutableMap> [not] to have property <string>', function (expect, subject, name) {
      return expect(subject.toObject(), '[not] to have property', name)
    })

    expect.addType({
      name: 'ImmutableList',
      base: 'Immutable',
      identify: function (obj) {
        return obj && Immutable.List.isList(obj)
      }
    })
    expect.addAssertion('<ImmutableList> to have items [exhaustively] satisfying <any>', function (expect, subject, pattern) {
      return expect(subject.toArray(), 'to have items [exhaustively] satisfying', pattern)
    })
    // expect.addAssertion('<ImmutableList> to have items [exhaustively] satisfying <assertion>', function (expect, subject, ...pattern) {
    //   return expect(subject.toArray(), 'to have items [exhaustively] satisfying', ...pattern)
    // })
  }
}
