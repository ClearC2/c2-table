import React, {Component} from 'react'
import PropTypes from 'prop-types'

const defaultClickableClass = 'clickable'

const noop = () => {}

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
    sortOnHeaderClick: PropTypes.bool,
    /** Custom sort function: (data, orderDir) => data */
    sort: PropTypes.func
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
      if (propValue[key] && !isColumn(propValue[key])) {
        throw new Error('<ColumnGroup> can only have <Column>\'s as children. ')
      }
    }).isRequired,
    /** Class to apply to header th */
    headerClassName: StringObjectOrFunc,
    /** Add sort click handler to column group header */
    sortOnHeaderClick: PropTypes.bool,
    /** Custom sort function: (data, orderDir) => data */
    sort: PropTypes.func
  }

  static defaultProps = {
    sortOnHeaderClick: true
  }

  render () {
    throw new Error('<ColumnGroup> is not meant to be rendered.')
  }
}

function isColumnGroup (child) {
  child = child || {}
  return child?.type === ColumnGroup
  // return areComponentsEqual(child.type, ColumnGroup)
}

function isColumn (child) {
  child = child || {}
  return child?.type === Column
  // return areComponentsEqual(child.type, Column)
}

function getColumns (children) {
  return React.Children.toArray(children).filter(child => !!child)
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

const RowContext = React.createContext({
  row: null,
  index: null,
  rowId: null,
  expanded: null,
  expand: () => {},
  collapse: () => {},
  toggleExpanded: () => {}
})

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
        onClick={this.props.sortOnHeaderClick === false ? noop : this.onHeaderClick}
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
        onClick={this.onHeaderClick}
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
    expandClassName: StringOrObject,
    orderColumn: PropTypes.string,
    orderDir: PropTypes.string,
    setOrderColumn: PropTypes.func.isRequired,
    setOrderDir: PropTypes.func.isRequired,
    clickableClass: PropTypes.string,
    sortDescIcon: PropTypes.any,
    sortAscIcon: PropTypes.any,
    onSort: PropTypes.func
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
        {getColumns(this.props.children).map(column => (
          <Header
            key={column.props.id}
            orderColumn={this.props.orderColumn}
            orderDir={this.props.orderDir}
            setOrderColumn={this.props.setOrderColumn}
            setOrderDir={this.props.setOrderDir}
            clickableClass={this.props.clickableClass}
            onSort={this.props.onSort}
            sortDescIcon={this.props.sortDescIcon}
            sortAscIcon={this.props.sortAscIcon}
            id={column.props.id}
            header={column.props.header}
            className={column.props.headerClassName}
            sortOnHeaderClick={column.props.sortOnHeaderClick}
            hasGroups={hasGroups}
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
        {getColumns(this.props.children).map(column => {
          if (!isColumnGroup(column)) return null
          return getColumns(column.props.children).map(child => (
            <Header
              key={child.props.id}
              orderColumn={this.props.orderColumn}
              orderDir={this.props.orderDir}
              setOrderColumn={this.props.setOrderColumn}
              setOrderDir={this.props.setOrderDir}
              clickableClass={this.props.clickableClass}
              onSort={this.props.onSort}
              sortDescIcon={this.props.sortDescIcon}
              sortAscIcon={this.props.sortAscIcon}
              id={child.props.id}
              header={child.props.header}
              className={child.props.headerClassName}
              sortOnHeaderClick={child.props.sortOnHeaderClick}
              children={child.props.children}
            />
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

  getColumns(columns).forEach(child => {
    if (isColumnGroup(child)) {
      childs = childs.concat(flattenColumns(child.props.children))
    } else {
      childs.push(child)
    }
  })

  return childs.filter(c => !!c)
}

function findColumn (columns, id) {
  const found = getColumns(columns).find(column => column.props.id === id)
  if (found) return found
  return flattenColumns(columns).find(column => column.props.id === id)
}

function Row ({rowId, row, index, expanded, setExpanded, children, ...props}) { // eslint-disable-line
  const expand = React.useCallback(() => setExpanded(rowId, true), [rowId, setExpanded])
  const collapse = React.useCallback(() => setExpanded(rowId, false), [rowId, setExpanded])
  const value = React.useMemo(() => {
    return {
      rowId,
      row,
      index,
      expanded,
      toggleExpanded: () => setExpanded(rowId, !expanded),
      expand,
      collapse
    }
  }, [rowId, row, index, expanded, setExpanded, expand, collapse])
  return (
    <RowContext.Provider value={value}>
      <tr {...props}>
        {children}
      </tr>
    </RowContext.Provider>
  )
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
    rowClassName: StringOrFunc,
    isFullLength: PropTypes.func,
    fullLengthCell: PropTypes.func
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

  setExpanded = (rowId, expanded) => {
    this.setState({
      expanded: {
        ...this.state.expanded,
        [rowId]: expanded
      }
    })
  }

  cellClassName (column, row, index) {
    if (typeof (column.props.cellClassName) === 'function') {
      return column.props.cellClassName(row, index)
    }

    return column.props.cellClassName
  }

  expandCell (row, index) {
    const {rowId, expandClassName, clickableClass, collapsedIcon, expandedIcon} = this.props
    const id = getRowId(rowId, row, index)
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

  getRowClassName = (row, index) => {
    const {rowClassName} = this.props
    if (typeof (rowClassName) === 'string') return rowClassName
    if (typeof (rowClassName) === 'function') return rowClassName(row, index)
    return ''
  }

  render () {
    const {children, rowId, onExpand, onEmpty, isFullLength, fullLengthCell} = this.props
    const tableId = this.props.id
    const columns = flattenColumns(children)
    const data = this.props.data || []
    const rows = []

    data.forEach((row, index) => {
      const rowClassName = this.getRowClassName(row, index)
      const id = getRowId(rowId, row, index)
      const rId = `${tableId}-${id}`
      const expanded = this.state.expanded[id] || false
      if (isFullLength && isFullLength(row, index)) {
        rows.push((
          <Row
            key={`tr-${rId}`}
            id={`tr-${rId}`}
            rowId={id}
            row={row}
            index={index}
            expanded={expanded}
            setExpanded={this.setExpanded}
            className={rowClassName}
          >
            <td colSpan={columns.length + (onExpand ? 1 : 0)}>
              {fullLengthCell(row, index)}
            </td>
          </Row>
        ))
      } else {
        rows.push(
          <Row
            key={`tr-${rId}`}
            id={`tr-${rId}`}
            rowId={id}
            row={row}
            index={index}
            expanded={expanded}
            setExpanded={this.setExpanded}
            className={rowClassName}
          >
            {onExpand ? this.expandCell(row, index) : null}
            {columns.map(column => (
              <td key={`td-${rId}-${column.props.id}`} className={this.cellClassName(column, row, index)}>
                {tdContent(column, row, index)}
              </td>
            ))}
          </Row>
        )
      }
      if (onExpand && this.state.expanded[id]) {
        rows.push(
          <Row
            key={`tr-${rId}-expanded`}
            rowId={id}
            row={row}
            index={index}
            expanded={expanded}
            setExpanded={this.setExpanded}
            className={`${rowClassName}-expanded`}
          >
            <td colSpan={columns.length + 1}>
              {React.createElement(onExpand, {row})}
            </td>
          </Row>
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

function getRowId (rowId, row, index) {
  switch (typeof (rowId)) {
    case 'function':
      return rowId(row, index)
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
    /** If sorting should be enabled */
    sortEnabled: PropTypes.bool,
    /** Columns/ColumnGroups */
    children: ColumnOrColumnGroup,
    /** Style object */
    style: PropTypes.object,
    /** Can be string or object(glamor) */
    className: StringOrObject,
    /** String or func that accepts row and should return string */
    rowClassName: StringOrFunc,
    /** Expanded td's className */
    expandClassName: StringOrObject,
    /** Class to apply to clickable elements */
    clickableClass: PropTypes.string,
    /** Page number */
    page: PropTypes.number,
    /** Rows per page */
    rowsPerPage: PropTypes.number,
    /** Function that receives the row object and should return jsx */
    onExpand: PropTypes.func,
    /** Array of rowIds that should be expanded on mount */
    expanded: PropTypes.array,
    /** Icon to show for expanded rows */
    expandedIcon: PropTypes.any,
    /** Icon to show for collapsed rows */
    collapsedIcon: PropTypes.any,
    /** Show elements when no rows */
    onEmpty: PropTypes.node,
    /** Icon to show when column is desc sorted */
    sortDescIcon: PropTypes.any,
    /** Icon to show when column is asc sorted */
    sortAscIcon: PropTypes.any,
    /** Function that is called on sort, (columnId, dir) => {}  */
    onSort: PropTypes.func,
    /** Function that receives the row object and should bool for is full length */
    isFullLength: PropTypes.func,
    /** Full length cell renderer */
    fullLengthCell: PropTypes.func
  }

  static defaultProps = {
    sortEnabled: true
  }

  state = {}

  componentDidMount () {
    if (this.props.defaultOrderColumn) {
      this.setOrderColumn(this.props.defaultOrderColumn)
    }

    this.setOrderDir(this.props.defaultOrderDir)
  }

  setOrderColumn = (column) => {
    if (!this.props.sortEnabled) return
    this.setState({orderColumn: column})
  }

  setOrderDir = (dir = 'desc') => {
    if (!this.props.sortEnabled) return
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
    if (typeof column.props.sort === 'function') {
      return column.props.sort(data, orderDir)
    }

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
    const data = this.getData()
    const pagedData = this.getPagedData()
    return (
      <table
        className={this.props.className}
        id={this.props.id}
        style={this.props.style}
      >
        <Thead
          id={this.props.id}
          orderColumn={this.state.orderColumn}
          orderDir={this.state.orderDir}
          setOrderColumn={this.setOrderColumn}
          setOrderDir={this.setOrderDir}
          children={this.props.children}
          onExpand={this.props.onExpand}
          expandClassName={this.props.expandClassName}
          clickableClass={this.props.sortEnabled ? this.props.clickableClass : 'c2-table-disabled'}
          sortDescIcon={this.props.sortDescIcon}
          sortAscIcon={this.props.sortAscIcon}
          onSort={this.props.onSort}
        />
        <Tbody
          id={this.props.id}
          rowId={this.props.rowId}
          expandClassName={this.props.expandClassName}
          clickableClass={this.props.clickableClass}
          children={this.props.children}
          expandedIcon={this.props.expandedIcon}
          collapsedIcon={this.props.collapsedIcon}
          onExpand={this.props.onExpand}
          expanded={this.props.expanded}
          onEmpty={this.props.onEmpty}
          rowClassName={this.props.rowClassName}
          isFullLength={this.props.isFullLength}
          fullLengthCell={this.props.fullLengthCell}
          data={pagedData}
        />
        <Tfoot
          children={this.props.children}
          onExpand={this.props.onExpand}
          data={data}
        />
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
  ColumnGroup,
  RowContext
}
