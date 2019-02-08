import unexpected from 'unexpected'
import unexpectedImmutable from './lib/unexpected-immutable'

const expect = unexpected.clone()
  .use(unexpectedImmutable)
unexpected.output.preferredWidth = 150

export default expect
