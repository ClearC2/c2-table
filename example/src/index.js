import React, {Component} from 'react'
import { render } from 'react-dom'
import {Foo} from '../../src/Table'
import {Table, Column, ColumnGroup} from '../../src/components/Table'

class FooBar extends Component {
  render() {
    return <div>{this.props.row.bar}</div>
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
          defaultOrderDir="desc"
          onExpand={FooBar}
          expandClassName="fit text-center"
        >
          <Column id="foo" headerClassName="col-xs-2" cellClassName={row => row.bam}/>
          <Column id="bar" headerClassName="col-xs-2"/>
          <ColumnGroup id="baz" headerClassName="col-xs-2 text-center">
            <Column id="bam" headerClassName="col-xs-1"/>
            <Column id="bama" headerClassName="col-xs-1"/>
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
