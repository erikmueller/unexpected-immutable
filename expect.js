import unexpected from 'unexpected'
import unexpectedImmutable from './lib/unexpected-immutable'

unexpected.output.preferredWidth = 150
const expect = unexpected.clone()
  .use(unexpectedImmutable)

export default expect
