import React, {Component} from 'react'
import { render } from 'react-dom'
import {Foo} from '../../src/Table'

class FooBar extends Component {
  render() {
    Foo()
    return <div>Hello world</div>
  }
}

render(
  <FooBar />,
  document.getElementById('app')
);
