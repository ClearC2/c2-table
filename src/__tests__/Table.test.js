import React from 'react'
import {render as rtlRender, fireEvent} from 'react-testing-library'
import {Table, Column, ColumnGroup} from '../Table'

const tableId = 'test-table'

function render (...args) {
  const result = rtlRender(...args)
  return {
    ...result,
    queryTd (row, col) {
      const selector = `#${tableId} > tbody > tr:nth-child(${row}) > td:nth-child(${col})`
      return result.container.querySelector(selector)
    },
    queryTh (row, col) {
      const selector = `#${tableId} > thead > tr:nth-child(${row}) > th:nth-child(${col})`
      return result.container.querySelector(selector)
    },
    queryTf (row, col) {
      const selector = `#${tableId} > tfoot > tr:nth-child(${row}) > td:nth-child(${col})`
      return result.container.querySelector(selector)
    },
    queryBodyRows () {
      const selector = `#${tableId} > tbody tr`
      return result.container.querySelectorAll(selector)
    }
  }
}

test('render string rowId', () => {
  const data = [
    {id: 123},
    {id: 456}
  ]
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveTextContent('123')
})

test('render func rowId', () => {
  const data = [
    {id: 123},
    {id: 456}
  ]
  const {queryTd} = render((
    <Table data={data} rowId={(row) => row.id} id={tableId}>
      <Column id='id' />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveTextContent('123')
})

test('render Table with multiple columns', () => {
  const data = [{id: 123, foo: 'test'}]
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' />
      <Column id='foo' />
    </Table>
  ))
  expect(queryTd(1, 2)).toHaveTextContent('test')
})

test('sort by column header click', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd, queryTh} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' />
      <Column id='foo' />
    </Table>
  ))
  const th = queryTh(1, 1)
  expect(queryTd(1, 1)).toHaveTextContent('1')
  fireEvent.click(th)
  fireEvent.click(th)
  expect(queryTd(1, 1)).toHaveTextContent('3')
  fireEvent.click(th)
  expect(queryTd(1, 1)).toHaveTextContent('1')
})

test('custom orderValue string', () => {
  const data = [
    {id: 1, foo: 'b'},
    {id: 2, foo: 'a'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd, queryTh} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' orderValue='foo' />
    </Table>
  ))
  const th = queryTh(1, 1)
  expect(queryTd(1, 1)).toHaveTextContent('1')
  fireEvent.click(th)
  fireEvent.click(th)
  expect(queryTd(1, 1)).toHaveTextContent('3')
  fireEvent.click(th)
  expect(queryTd(1, 1)).toHaveTextContent('2')
})

test('custom orderValue func', () => {
  const data = [
    {id: 1, foo: 'b'},
    {id: 2, foo: 'a'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd, queryTh} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' orderValue={(row) => row.foo} />
    </Table>
  ))
  const th = queryTh(1, 1)
  expect(queryTd(1, 1)).toHaveTextContent('1')
  fireEvent.click(th)
  fireEvent.click(th)
  expect(queryTd(1, 1)).toHaveTextContent('3')
  fireEvent.click(th)
  expect(queryTd(1, 1)).toHaveTextContent('2')
})

test('render string cell', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' cell='foo' />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveTextContent('a')
})

test('render func cell', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' cell={row => `${row.id}-${row.foo}`} />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveTextContent('1-a')
})

test('renders headerClassName', () => {
  const {queryTh} = render((
    <Table data={[]} rowId='id' id={tableId}>
      <Column id='id' headerClassName='test-header-id' />
      <Column id='foo' headerClassName='test-header-foo' />
    </Table>
  ))
  expect(queryTh(1, 1)).toHaveClass('test-header-id')
  expect(queryTh(1, 2)).toHaveClass('test-header-foo')
})

test('render string cellClassName', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' cellClassName='foobar' />
      <Column id='foo' cellClassName='foobaz' />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveClass('foobar')
  expect(queryTd(1, 1)).not.toHaveClass('foobaz')

  expect(queryTd(1, 2)).toHaveClass('foobaz')
  expect(queryTd(1, 2)).not.toHaveClass('foobar')
})

test('render func cellClassName', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' cellClassName={row => `${row.id}-${row.foo}`} />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveClass('1-a')
  expect(queryTd(2, 1)).toHaveClass('2-b')
  expect(queryTd(3, 1)).toHaveClass('3-c')
})

test('render func footer', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTf} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' footer={(rows) => rows.length} />
    </Table>
  ))
  expect(queryTf(1, 1)).toHaveTextContent('3')
})

test('render string header', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTh} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' header='Foo Bar' />
    </Table>
  ))
  expect(queryTh(1, 1)).toHaveTextContent('Foo Bar')
})

test('render func header', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTh} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' header={() => 'Foo Bar'} />
    </Table>
  ))
  expect(queryTh(1, 1)).toHaveTextContent('Foo Bar')
})

test('render func header that uses sort func', () => {
  const data = [
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'},
    {id: 1, foo: 'a'}
  ]
  const {queryTd, getByTestId} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column
        id='id'
        header={(symbol, sort) => (
          <span data-testid='sort-span' onClick={sort}>{symbol} Foo Bar</span>
        )}
      />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveTextContent('2')
  const sortable = getByTestId('sort-span')
  fireEvent.click(sortable)
  expect(queryTd(1, 1)).toHaveTextContent('1')
  expect(queryTd(2, 1)).toHaveTextContent('2')
  expect(queryTd(3, 1)).toHaveTextContent('3')
})

test('display empty message', () => {
  const data = []
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId} onEmpty='No data!'>
      <Column id='id' />
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveTextContent('No data!')
})

test('render expanded component', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'}
  ]
  const {queryTd, getByText} = render((
    <Table
      data={data}
      rowId='id'
      id={tableId}
      onExpand={({row}) => <span>{row.id}X{row.foo}</span>}
    >
      <Column id='id' header={() => 'Foo Bar'} />
    </Table>
  ))
  fireEvent.click(getByText('+'))
  expect(queryTd(2, 1)).toHaveTextContent('1Xa')
})

test('render paged table', () => {
  const data = [
    {id: 1, foo: 'a'},
    {id: 2, foo: 'b'},
    {id: 3, foo: 'c'},
    {id: 4, foo: 'd'},
    {id: 5, foo: 'e'},
    {id: 6, foo: 'f'}
  ]
  const {rerender, queryTd, queryBodyRows} = render((
    <Table
      data={data} rowId='id' id={tableId} page={0} rowsPerPage={2}>
      <Column id='id' />
    </Table>
  ))
  expect(queryBodyRows()).toHaveLength(2)
  expect(queryTd(1, 1)).toHaveTextContent('1')
  expect(queryTd(2, 1)).toHaveTextContent('2')
  rerender((
    <Table
      data={data} rowId='id' id={tableId} page={1} rowsPerPage={2}>
      <Column id='id' />
    </Table>
  ))
  expect(queryBodyRows()).toHaveLength(2)

  expect(queryTd(1, 1)).toHaveTextContent('3')
  expect(queryTd(2, 1)).toHaveTextContent('4')
  rerender((
    <Table
      data={data} rowId='id' id={tableId} page={2} rowsPerPage={2}>
      <Column id='id' />
    </Table>
  ))
  expect(queryBodyRows()).toHaveLength(2)
  expect(queryTd(1, 1)).toHaveTextContent('5')
  expect(queryTd(2, 1)).toHaveTextContent('6')
})

test('render column group', () => {
  const data = [
    {id: 1, foo: 'a', baz: 'true'},
    {id: 2, foo: 'b', baz: 'false'},
    {id: 3, foo: 'c', baz: 'null'}
  ]
  const {queryTd} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' />
      <ColumnGroup id='foobar'>
        <Column id='foo' />
        <Column id='baz' />
      </ColumnGroup>
    </Table>
  ))
  expect(queryTd(1, 1)).toHaveTextContent('1')
  expect(queryTd(1, 2)).toHaveTextContent('a')
  expect(queryTd(1, 3)).toHaveTextContent('true')
})

test('column group sorts', () => {
  const data = [
    {id: 1, total: 4, foo: 'a', baz: 'true'},
    {id: 2, total: 6, foo: 'b', baz: 'false'},
    {id: 3, total: 1, foo: 'c', baz: 'null'}
  ]
  const {queryTd, getByTestId} = render((
    <Table data={data} rowId='id' id={tableId}>
      <Column id='id' />
      <ColumnGroup id='total'>
        <Column id='foo' />
        <Column id='baz' />
      </ColumnGroup>
    </Table>
  ))
  expect(queryTd(1, 2)).toHaveTextContent('a')
  expect(queryTd(2, 2)).toHaveTextContent('b')
  expect(queryTd(3, 2)).toHaveTextContent('c')
  const totalHeader = getByTestId('header-total')
  fireEvent.click(totalHeader)
  expect(queryTd(1, 2)).toHaveTextContent('c')
  expect(queryTd(2, 2)).toHaveTextContent('a')
  expect(queryTd(3, 2)).toHaveTextContent('b')
  fireEvent.click(totalHeader)
  expect(queryTd(1, 2)).toHaveTextContent('b')
  expect(queryTd(2, 2)).toHaveTextContent('a')
  expect(queryTd(3, 2)).toHaveTextContent('c')
})
