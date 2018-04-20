import React from 'react'
import Shallow from 'react-test-renderer/shallow'
import unexpectedReact from 'unexpected-react/jest'
import unexpected from 'unexpected'
import Immutable from 'immutable'

const expect = unexpected.clone().use(unexpectedReact)

const Element = props => React.createElement('div', props)

const render = immutable => {
  const renderer = new Shallow()

  renderer.render(React.createElement(Element, { immutable }))

  return renderer
}

describe('using unexpected-react', function () {
  it('should work with Maps', function () {
    expect(render(Immutable.Map({ foo: 'bar' })), 'to match snapshot')
  })
})
