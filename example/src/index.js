import React, {Component} from 'react'
import { render } from 'react-dom'
import {Foo} from '../../src/Table'
import {Table, Column, ColumnGroup} from '../../src/components/Table'

class FooBar extends Component {
  render() {
    Foo()
    return <div>Hello world</div>
  }
}

const data = [
  {foo: 'a', bar: 123, bam: 'abc', bama: '1'},
  {foo: 'b', bar: 456, bam: 'def', bama: '2'},
  {foo: 'c', bar: 789, bam: 'ghi', bama: '3'}
]

const table = (
  <div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <Table
          id="some-table"
          className="table table-bordered"
          style={{marginTop: '100px'}}
          data={data}
          rowId={row => row.foo}
          style={{marginTop: '100px'}}
          defaultOrderColumn="bar"
          defaultOrderDir="asc"
        >
          <Column id="foo" td={row => `${row['bar']}~${row['foo']}`}/>
          <Column id="bar" td="bar" headerClassName="foobar-class" sortOnHeaderClick={false}/>
          <ColumnGroup id="baz">
            <Column id="bam" sortOnHeaderClick={false} header={(icon, onClick) => <span onClick={onClick}>{icon} BLAH</span>} />
            <Column id="bama"/>
          </ColumnGroup>
        </Table>
      </div>
    </div>
  </div>
)

render(
  table,
  document.getElementById('app')
);
