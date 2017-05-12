import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {render} from 'react-dom'
import {Table, Column, ColumnGroup} from '../../src/components/Table'

class FooBar extends Component {
  static propTypes = {row: PropTypes.object}

  render () {
    return <div>{this.props.row.bar}</div>
  }
}

const data = [
  {foo: 'a', bar: 123, bam: 'abc', bama: 1},
  {foo: 'b', bar: 456, bam: 'def', bama: 2},
  {foo: 'c', bar: 789, bam: 'ghi', bama: 3}
]

const table = (
  <div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <Table
          id="some-table"
          expanded={['b']}
          className="table table-bordered"
          style={{marginTop: '100px'}}
          data={data}
          rowId={row => row.foo}
          defaultOrderColumn="bar"
          defaultOrderDir="desc"
          expandClassName="fit text-center"
          onExpand={FooBar}
          onEmpty={(
            <div className="text-center">Nothing to see here...</div>
          )}
        >
          <Column id="foo" headerClassName="col-xs-2" cellClassName={row => row.bam} footerClassName="foo-footer"/>
          <Column id="bar" headerClassName="col-xs-2"/>
          <ColumnGroup id="baz" headerClassName="col-xs-2 text-center">
            <Column id="bam" headerClassName="col-xs-1"/>
            <Column
              id="bama"
              headerClassName="col-xs-1"
              footer={rows => rows.reduce((prev, current) => prev + current.bama, 0)}
            />
          </ColumnGroup>
        </Table>
      </div>
    </div>
  </div>
)

render(
  table,
  document.getElementById('app')
)
