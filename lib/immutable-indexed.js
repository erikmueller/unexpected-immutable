import Immutable from 'immutable'

/**
 * Array-like type and assertions
 */

const types = [
  {
    name: 'ImmutableIndexed',
    base: 'Immutable',
    identify: function (obj) {
      return obj && Immutable.Iterable.isIndexed(obj)
    },
    inspect: function (obj, depth, output, inspect) {
      output
        .jsKeyword(obj.constructor.name + ' ')
        .append(inspect(obj.toArray()))
    }
  }
]

const assertions = [
  [
    '<ImmutableIndexed> to have items [exhaustively] satisfying <any>',
    function (expect, subject, pattern) {
      return expect(
        subject.toArray(),
        'to have items [exhaustively] satisfying',
        pattern
      )
    }
  ],
  [
    '<ImmutableIndexed> to have items [exhaustively] satisfying <assertion>',
    function (expect, subject) {
      const passedArgs = [].slice.call(arguments, 2)
      const newArgs = [
        subject.toArray(),
        'to have items [exhaustively] satisfying'
      ]

      return expect.apply(null, newArgs.concat(passedArgs))
    }
  ]
]

export default { types, assertions }
