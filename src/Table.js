import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {areComponentsEqual} from 'react-hot-loader'

const defaultClickableClass = 'clickable'

const StringOrFunc = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func
])

const StringOrObject = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object
])

const StringObjectOrFunc = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
  PropTypes.func
])

class Column extends Component {
  static _colType = 'c2-table-column'
  static propTypes = {
    /** Unique column id */
    id: PropTypes.string.isRequired,
    /** Header label or func that accepts sort direction and sort function that should return jsx */
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    /** Class to apply to header th */
    headerClassName: StringObjectOrFunc,
    /** Class to apply to body td */
    cellClassName: PropTypes.any,
    /** Class to apply to footer td */
    footerClassName: StringOrObject,
    /** Func that accepts all rows and should return string/jsx */
    footer: PropTypes.func,
    /** String or func that accepts row and should return string/jsx */
    cell: StringOrFunc,
    /** String id of column or func that accepts row and should return string */
    orderValue: StringOrFunc,
    /** Add sort click handler to column header */
    sortOnHeaderClick: PropTypes.bool
  }
  static defaultProps = {
    sortOnHeaderClick: true
  }

  render () {
    throw new Error('<Column> is not meant to be rendered.')
  }
}

class ColumnGroup extends Component {
  static _colType = 'c2-table-column-group'
  static propTypes = {
    /** Unique column id */
    id: PropTypes.string.isRequired,
    /** Columns */
    children: PropTypes.arrayOf((propValue, key) => {
      if (!isColumn(propValue[key])) {
        throw new Error('<ColumnGroup> can only have <Column>\'s as children. ')
      }
    }).isRequired,
    /** Class to apply to header th */
    headerClassName: StringObjectOrFunc,
    /** Add sort click handler to column group header */
    sortOnHeaderClick: PropTypes.bool
  }
  static defaultProps = {
    sortOnHeaderClick: true
  }

  render () {
    throw new Error('<ColumnGroup> is not meant to be rendered.')
  }
}

function isColumnGroup (child) {
  return areComponentsEqual(child.type, ColumnGroup)
}

function isColumn (child) {
  return areComponentsEqual(child.type, Column)
}

const ColumnOrColumnGroup = function (props, propName) {
  let error
  React.Children.forEach(props[propName], value => {
    const validType = isColumnGroup(value) || isColumn(value)
    if (!validType) {
      error = new Error('Invalid Table children.')
    }
    return error
  })
}

class Header extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    orderColumn: PropTypes.string,
    orderDir: PropTypes.string,
    setOrderColumn: PropTypes.func.isRequired,
    setOrderDir: PropTypes.func.isRequired,
    sortOnHeaderClick: PropTypes.bool,
    clickableClass: PropTypes.string,
    children: ColumnOrColumnGroup,
    hasGroups: PropTypes.bool,
    className: StringOrObject,
    isFirstRow: PropTypes.bool,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    sortDescIcon: PropTypes.any,
    sortAscIcon: PropTypes.any,
    onSort: PropTypes.func
  }

  static defaultProps = {
    onSort: () => {}
  }

  headerContent () {
    switch (typeof (this.props.header)) {
      case 'function':
        return this.props.header(this.getSortSymbol(), this.onHeaderClick)
      default:
        return <span>{this.props.header || this.props.id} {this.getSortSymbol()}</span>
    }
  }

  isCurrentSortColumn () {
    return this.props.orderColumn === this.props.id
  }

  getSortSymbol (column) {
    const {sortDescIcon, sortAscIcon} = this.props

    return this.isCurrentSortColumn(column)
      ? (this.props.orderDir === 'asc' ? <span>{sortAscIcon || '↑'}</span> : <span>{sortDescIcon || '↓'}</span>)
      : null
  }

  onHeaderClick = () => {
    const dir = this.props.orderDir === 'asc' || !this.props.orderDir ? 'desc' : 'asc'
    this.props.setOrderColumn(this.props.id)
    this.props.setOrderDir(dir)
    this.props.onSort(this.props.id, dir)
  }

  getClickableClass () {
    return this.props.sortOnHeaderClick === false ? null : (this.props.clickableClass || defaultClickableClass)
  }

  renderFirstRowHeader () {
    const colSpan = this.props.children ? this.props.children.length : 1

    return (
      <th
        colSpan={colSpan || 1}
        rowSpan={this.props.hasGroups && colSpan === 1 ? 2 : 1}
        onClick={() => this.props.sortOnHeaderClick === false ? null : this.onHeaderClick()}
        className={`${this.props.className || ''} ${this.getClickableClass()}`.trim()}
        data-testid={`header-${this.props.id}`}
      >
        {this.headerContent()}
      </th>
    )
  }

  renderSecondRowHeader () {
    return (
      <th
        key={this.props.id}
        onClick={() => this.props.sortOnHeaderClick === false ? null : this.onHeaderClick()}
        className={`${this.props.className || ''} ${this.getClickableClass()}`.trim()}
      >
        {this.headerContent()}
      </th>
    )
  }

  render () {
    return this.props.isFirstRow ? this.renderFirstRowHeader() : this.renderSecondRowHeader()
  }
}

class Thead extends Component {
  static propTypes = {
    children: ColumnOrColumnGroup,
    onExpand: PropTypes.func,
    expandClassName: StringOrObject
  }

  hasGroups () {
    let hasGroups = false
    React.Children.forEach(this.props.children, column => {
      if (isColumnGroup(column)) hasGroups = true
    })

    return hasGroups
  }

  renderFirstRow () {
    const hasGroups = this.hasGroups()
    return (
      <tr>
        {this.props.onExpand ? <th rowSpan={hasGroups ? 2 : 1} className={this.props.expandClassName} /> : null}
        {React.Children.map(this.props.children, column => (
          <Header
            key={column.props.id}
            {...this.props}
            {...column.props}
            hasGroups={hasGroups}
            className={column.props.headerClassName}
            isFirstRow
          >
            {column.props.children}
          </Header>
        ))}
      </tr>
    )
  }

  renderSecondRow () {
    return (
      <tr>
        {React.Children.map(this.props.children, column => {
          if (!isColumnGroup(column)) return null
          return React.Children.map(column.props.children, child => (
            <Header
              key={child.props.id}
              {...this.props}
              {...child.props}
              className={child.props.headerClassName}
            >
              {child.props.children}
            </Header>
          ))
        })}
      </tr>
    )
  }

  render () {
    return (
      <thead>
        {this.renderFirstRow()}
        {this.hasGroups() ? this.renderSecondRow() : null}
      </thead>
    )
  }
}

function flattenColumns (columns) {
  let childs = []

  React.Children.forEach(columns, child => {
    if (isColumnGroup(child)) {
      childs = childs.concat(flattenColumns(child.props.children))
    } else {
      childs.push(child)
    }
  })

  return childs
}

function findColumn (columns, id) {
  const found = React.Children.toArray(columns).find(column => column.props.id === id)
  if (found) return found
  return flattenColumns(columns).find(column => column.props.id === id)
}

class Tbody extends Component {
  static propTypes = {
    rowId: StringOrFunc.isRequired,
    expandClassName: StringOrObject,
    clickableClass: PropTypes.string,
    children: ColumnOrColumnGroup,
    id: PropTypes.string.isRequired,
    onExpand: PropTypes.func,
    data: PropTypes.array.isRequired,
    expandedIcon: PropTypes.any,
    collapsedIcon: PropTypes.any,
    expanded: PropTypes.array,
    onEmpty: PropTypes.node,
    rowClassName: StringOrFunc
  }

  constructor (props) {
    super(props)
    const expanded = {}
    if (props.expanded) {
      props.expanded.forEach(rowId => {
        expanded[rowId] = true
      })
    }
    this.state = {expanded}
  }

  cellClassName (column, row) {
    if (typeof (column.props.cellClassName) === 'function') {
      return column.props.cellClassName(row)
    }

    return column.props.cellClassName
  }

  expandCell (row) {
    const {rowId, expandClassName, clickableClass, collapsedIcon, expandedIcon} = this.props
    const id = getRowId(rowId, row)
    const onClick = () => {
      const expanded = this.state.expanded
      expanded[id] = !expanded[id]

      this.setState({expanded})
    }

    return (
      <td className={`${expandClassName || ''} ${clickableClass || defaultClickableClass}`.trim()} onClick={onClick}>
        {this.state.expanded[id] ? (expandedIcon || '-') : (collapsedIcon || '+')}
      </td>
    )
  }
  getRowClassName = row => {
    const {rowClassName} = this.props
    if (typeof (rowClassName) === 'string') return rowClassName
    if (typeof (rowClassName) === 'function') return rowClassName(row)
    return ''
  }

  render () {
    const {children, rowId, onExpand, onEmpty} = this.props
    const tableId = this.props.id
    const columns = flattenColumns(children)
    const data = this.props.data || []
    let rows = []

    data.forEach((row, index) => {
      const rowClassName = this.getRowClassName(row)
      const id = getRowId(rowId, row)
      const rId = `${tableId}-${id}`
      rows.push(
        <tr key={`tr-${rId}`} id={`tr-${rId}`} className={rowClassName}>
          {onExpand ? this.expandCell(row) : null}
          {columns.map(column => (
            <td key={`td-${rId}-${column.props.id}`} className={this.cellClassName(column, row)}>
              {tdContent(column, row, index)}
            </td>
          ))}
        </tr>
      )
      if (onExpand && this.state.expanded[id]) {
        rows.push(
          <tr key={`tr-${rId}-expanded`} className={`${rowClassName}-expanded`}>
            <td colSpan={columns.length + 1}>
              {React.createElement(onExpand, {row})}
            </td>
          </tr>
        )
      }
    })

    if (rows.length === 0) {
      rows.push((
        <tr key={`tr-empty`}>
          <td colSpan={columns.length + (onExpand ? 1 : 0)}>
            {onEmpty || <div className='text-center'>No data...</div>}
          </td>
        </tr>
      ))
    }

    return (
      <tbody>
        {rows}
      </tbody>
    )
  }
}

function getRowId (rowId, row) {
  switch (typeof (rowId)) {
    case 'function':
      return rowId(row)
    default:
      return row[rowId]
  }
}

function tdContent (column, row, index) {
  switch (typeof (column.props.cell)) {
    case 'function':
      return column.props.cell(row, index)
    default:
      return row[column.props.cell || column.props.id]
  }
}

function tdOrderValue (column, row) {
  switch (typeof (column.props.orderValue)) {
    case 'function':
      return column.props.orderValue(row)
    default:
      return row[column.props.orderValue || column.props.id]
  }
}

class Table extends Component {
  static propTypes = {
    /** Unique table id */
    id: PropTypes.string.isRequired,
    /** String or func that accepts row and should return a unique row id string */
    rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    /** The array of table data */
    data: PropTypes.array.isRequired,
    /** The default column to order by */
    defaultOrderColumn: PropTypes.string,
    /** The default column direction */
    defaultOrderDir: PropTypes.oneOf(['asc', 'desc']),
    /** Columns/ColumnGroups */
    children: ColumnOrColumnGroup,
    /** Can be string or object(glamor) */
    className: StringOrObject,
    /** Style object */
    style: PropTypes.object,
    /** String or func that accepts row and should return string */
    rowClassName: StringOrFunc,
    /** Page number */
    page: PropTypes.number,
    /** Rows per page */
    rowsPerPage: PropTypes.number,
    /** Function that receives the row object and should return jsx */
    onExpand: PropTypes.func
  }
  state = {}

  componentDidMount () {
    if (this.props.defaultOrderColumn) {
      this.setOrderColumn(this.props.defaultOrderColumn)
    }

    this.setOrderDir(this.props.defaultOrderDir)
  }

  setOrderColumn = (column) => {
    this.setState({orderColumn: column})
  }

  setOrderDir = (dir = 'desc') => {
    this.setState({orderDir: dir})
  }

  getColumns () {
    return flattenColumns(this.props.children)
  }

  getData () {
    const {orderColumn, orderDir} = this.state
    let {data} = this.props
    const column = findColumn(this.props.children, orderColumn)
    if (!column) return data

    data = data.map(row => {
      return {row, orderValue: tdOrderValue(column, row)}
    })

    return data.sort((a, b) => {
      const defaultValue = typeof (a.orderValue) === 'string' ? '' : 0
      a = a.orderValue || defaultValue
      b = b.orderValue || defaultValue
      if (orderDir === 'asc') {
        if (a > b) return 1
        if (a < b) return -1
      } else {
        if (a < b) return 1
        if (a > b) return -1
      }
      return 0
    }).map(obj => obj.row)
  }

  getPagedData = () => {
    const data = this.getData()
    if (this.props.page === undefined || this.props.rowsPerPage === undefined) return data
    const begin = (this.props.page * this.props.rowsPerPage)
    const end = begin + this.props.rowsPerPage
    return data.slice(begin, end)
  }

  render () {
    const tableProps = {
      className: this.props.className,
      id: this.props.id,
      style: this.props.style
    }
    const data = this.getData()
    const pagedData = this.getPagedData()
    return (
      <table {...tableProps}>
        <Thead
          {...this.props}
          orderColumn={this.state.orderColumn}
          orderDir={this.state.orderDir}
          setOrderColumn={this.setOrderColumn}
          setOrderDir={this.setOrderDir}
        />
        <Tbody
          {...this.props}
          data={pagedData}
        />
        <Tfoot {...this.props} data={data} />
      </table>
    )
  }
}

class Tfoot extends Component {
  static defaultProps = {data: []}
  static propTypes = {
    children: PropTypes.node,
    onExpand: PropTypes.func,
    data: PropTypes.array
  }

  render () {
    if (!this.props.children) return null
    const columns = flattenColumns(this.props.children)
    const footerValues = columns.reduce((last, column) => {
      return last || column.props.footer
    }, false)

    if (!footerValues || !(this.props.data.length)) return null

    return (
      <tfoot>
        <tr>
          {this.props.onExpand ? <td /> : null}
          {flattenColumns(this.props.children).map(column => (
            <td key={column.props.id} className={column.props.footerClassName || ''}>
              {column.props.footer ? column.props.footer(this.props.data) : null}
            </td>
          ))}
        </tr>
      </tfoot>
    )
  }
}

export {
  Table,
  Column,
  ColumnGroup
}
