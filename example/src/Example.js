import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {hot} from 'react-hot-loader'
import {Table, Column, ColumnGroup} from 'c2-table'

class FooBar extends Component {
  static propTypes = {row: PropTypes.object}

  render () {
    return <div>{this.props.row.bar}</div>
  }
}

const data = [
  {foo: 'a', baz: 4, bar: 123, bam: 'abc', bama: 1},
  {foo: 'b', baz: 6, bar: 456, bam: 'def', bama: 2},
  {foo: 'c', baz: 1, bar: 789, bam: 'ghi', bama: 3}
]

function App () {
  return (
    <div>
      <div className='row'>
        <div className='col-md-6 col-md-offset-3'>
          <Table
            id='some-table'
            expanded={['b']}
            className='table table-bordered'
            style={{marginTop: '100px'}}
            data={data}
            rowId={row => row.foo}
            defaultOrderColumn='bar'
            defaultOrderDir='desc'
            expandClassName='fit text-center'
            onExpand={FooBar}
            onEmpty={(
              <div className='text-center'>Nothing to see here...</div>
            )}
            onSort={(column, dir) => console.log(column, dir)}
            rowClassName={row => row.bar > 200 ? 'high' : 'low'}
          >
            <Column id='foo' headerClassName='col-xs-2' cellClassName={row => row.bam} footerClassName='foo-footer' />
            <Column id='bar' headerClassName='col-xs-2' />
            <ColumnGroup id='baz' headerClassName='col-xs-2 text-center'>
              <Column id='bam' headerClassName='col-xs-1' />
              <Column
                id='bama'
                headerClassName='col-xs-1'
                footer={rows => rows.reduce((prev, current) => prev + current.bama, 0)}
              />
            </ColumnGroup>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default hot(module)(App)
