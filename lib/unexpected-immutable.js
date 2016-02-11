const Immutable = require('immutable');

module.exports = {
    name: 'unexpected-immutable',
    installInto: function (expect) {
        expect.addType({
            name: 'Immutable',
            identify: function (obj) {
                return obj && Immutable.Iterable.isIterable(obj);
            },
            equal: function (obj1, obj2) {
                return Immutable.is(obj1, obj2);
            },
            inspect: function (obj, depth, output) {
                output.jsKeyword(obj.constructor.name + ' ').appendInspected(obj.toJS());
            },
            diff: function (actual, expected, output, diff) {
                return diff(actual.toJS(), expected.toJS());
            }
        });
    }
};
