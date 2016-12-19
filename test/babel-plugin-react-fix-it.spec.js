import { transform } from 'babel-core'
import fixIt from '../src'

test('it works', () => {
  const source = `
    import React from 'react'

    class MyComponent extends React.Component {
      render() {
        return <div />
      }
    }

    export default MyComponent
  `

  const expected = `
    import fixIt from 'react-fix-it'
    import React from 'react'

    class MyComponent extends React.Component {
      render() {
        return <div />
      }
    }

    fixIt(MyComponent)
    export default MyComponent
  `

  const presets = { presets: ['es2015', 'react'] }
  const { code } = transform(source, { presets, plugins: [fixIt] })

  expect(code).toBe(transform(expected, { presets }).code)
})
