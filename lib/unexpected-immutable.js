const Immutable = require('immutable');

module.exports = {
    name: 'unexpected-immutable',
    installInto: (expect) => {
        expect.addType({
            name: 'Immutable',
            identify: (obj) => obj && Immutable.Iterable.isIterable(obj),
            equal: (obj1, obj2) => Immutable.is(obj1, obj2),
            inspect: function (obj, depth, output) {
                const iterable = ['Map', 'List', 'Stack', 'Seq', 'OrderedMap', 'Set', 'OrderedSet']
                    .find((type) => Immutable[type][`is${type}`](obj)) || 'Iterable';

                return output.jsKeyword(`${iterable} `).appendInspected(obj.toJS());
            },
            diff: (actual, expected, output, diff) => diff(actual.toJS(), expected.toJS())
        });
    }
};
