import immutableBase from './immutable-base'
import immutableIndexed from './immutable-indexed'
import immutableKeyed from './immutable-keyed'

const types = [
  ...immutableBase.types,
  ...immutableIndexed.types,
  ...immutableKeyed.types
]
const assertions = [
  ...immutableBase.assertions,
  ...immutableIndexed.assertions,
  ...immutableKeyed.assertions
]

export default {
  name: 'unexpected-immutable',
  installInto: function (expect) {
    types.forEach(type => expect.addType.call(null, type))
    assertions.forEach(assertion => expect.addAssertion.apply(null, assertion))
  }
}
