import unexpected from 'unexpected'
import unexpectedImmutable from './lib/unexpected-immutable'

unexpected.use(unexpectedImmutable)
unexpected.output.preferredWidth = 150
