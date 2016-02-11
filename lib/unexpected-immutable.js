const Immutable = require('immutable');

module.exports = {
    name: 'unexpected-immutable',
    installInto: (expect) => {
        expect.addType({
            name: 'Immutable',
            identify: (obj) => obj && Immutable.Iterable.isIterable(obj),
            equal: (obj1, obj2) => Immutable.is(obj1, obj2),
            inspect: (obj, depth, output) => output.jsKeyword(`${obj.constructor.name} `).appendInspected(obj.toJS()),
            diff: (actual, expected, output, diff) => diff(actual.toJS(), expected.toJS())
        });
    }
};
