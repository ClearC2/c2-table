import React, {Component, PropTypes} from 'react'

const defaultClickableClass = 'clickable'

const ColumnOrColumnGroup = PropTypes.arrayOf((propValue, key) => {
  const type = propValue[key].type
  if (type !== Column && type !== ColumnGroup) {
    throw new Error('<Table> can only have <Column> and <ColumnGroup> as children. ')
  }
})

const StringOrFunc = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func
])

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
    className: PropTypes.string,
    isFirstRow: PropTypes.bool,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  }
  constructor (props) {
    super(props)
    this.onHeaderClick = this.onHeaderClick.bind(this)
  }

  headerContent () {
    switch (typeof(this.props.header)) {
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
    return this.isCurrentSortColumn(column) ?
      (this.props.orderDir === 'asc' ? <span>↑</span> : <span>↓</span>) :
      null
  }

  onHeaderClick () {
    this.props.setOrderColumn(this.props.id)
    this.props.setOrderDir(this.props.orderDir === 'asc' || !this.props.orderDir ? 'desc' : 'asc')
  }

  getClickableClass () {
    return this.props.sortOnHeaderClick === false ? null : (this.props.clickableClass || defaultClickableClass)
  }

  renderFirstRowHeader () {
    const colSpan = this.props.children ? this.props.children.length : 1

    return (
      <th
        colSpan={colSpan || 1}
        rowSpan={this.props.hasGroups && colSpan == 1 ? 2 : 1}
        onClick={() => this.props.sortOnHeaderClick === false ? null : this.onHeaderClick()}
        className={`${this.props.className} ${this.getClickableClass()}`}
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
        className={`${this.props.className} ${this.getClickableClass()}`}
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
    onExpand: PropTypes.func.isRequired,
    expandClassName: PropTypes.string
  }

  hasGroups () {
    let hasGroups = false
    React.Children.forEach(this.props.children, column => {
      if (column.type === ColumnGroup) hasGroups = true
    })

    return hasGroups
  }

  renderFirstRow () {
    const hasGroups = this.hasGroups()
    return (
      <tr>
        {this.props.onExpand ? <th rowSpan={hasGroups ? 2 : 1} className={this.props.expandClassName}/> : null}
        {React.Children.map(this.props.children, column => (
          <Header
            key={column.props.id}
            {...this.props}
            {...column.props}
            hasGroups={hasGroups}
            className={column.props.headerClassName}
            isFirstRow={true}
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
          if (column.type !== ColumnGroup) return null
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
    if (child.type === ColumnGroup) {
      childs = childs.concat(flattenColumns(child.props.children))
    } else {
      childs.push(child)
    }
  })

  return childs
}

class Tbody extends Component {
  static propTypes = {
    rowId: StringOrFunc.isRequired,
    expandClassName: PropTypes.string,
    clickableClass: PropTypes.string,
    children: ColumnOrColumnGroup.isRequired,
    id: PropTypes.string.isRequired,
    onExpand: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {expanded: {}}
  }

  cellClassName (column, row) {
    if (typeof(column.props.cellClassName) === 'function') {
      return column.props.cellClassName(row)
    }

    return column.props.cellClassName
  }

  expandCell (row) {
    const {rowId, expandClassName, clickableClass} = this.props
    const id = getRowId(rowId, row)
    const onClick = () => {
      const expanded = this.state.expanded
      expanded[id] = !expanded[id]

      this.setState({expanded})
    }

    return (
      <td className={`${expandClassName} ${clickableClass || defaultClickableClass}`} onClick={onClick}>
        {this.state.expanded[id] ? '-' : '+'}
      </td>
    )
  }

  render () {
    const {children, rowId, onExpand} = this.props
    const tableId = this.props.id
    const columns = flattenColumns(children)
    const data = this.props.data || []
    let rows = []

    data.forEach(row => {
      const id = getRowId(rowId, row)
      const rId = `${tableId}-${id}`
      rows.push(
        <tr key={`tr-${rId}`} id={`tr-${rId}`}>
          {onExpand ? this.expandCell(row) : null}
          {columns.map(column => (
            <td key={`td-${rId}-${column.props.id}`} className={this.cellClassName(column, row)}>
              {tdContent(column, row)}
            </td>
          ))}
        </tr>
      )
      if (this.state.expanded[id]) {
        rows.push(
          <tr key={`tr-${rId}-expanded`}>
            <td colSpan={columns.length + 1}>
              {React.createElement(onExpand, {row})}
            </td>
          </tr>
        )
      }
    })

    return (
      <tbody>
        {rows}
      </tbody>
    )
  }
}

function getRowId (rowId, row) {
  switch (typeof(rowId)) {
  case 'function':
    return rowId(row)
  default:
    return row[rowId]
  }
}


function tdContent (column, row) {
  switch (typeof(column.props.cell)) {
  case 'function':
    return column.props.cell(row)
  default:
    return row[column.props.cell || column.props.id]
  }
}

function tdOrderValue (column, row) {
  switch (typeof(column.props.orderValue)) {
  case 'function':
    return column.props.orderValue(row)
  default:
    return row[column.props.orderValue || column.props.id]
  }
}

export class Table extends Component {
  static propTypes = {
    defaultOrderColumn: PropTypes.string,
    defaultOrderDir: PropTypes.string,
    data: PropTypes.array.isRequired,
    children: ColumnOrColumnGroup.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.setOrderColumn = this.setOrderColumn.bind(this)
    this.setOrderDir = this.setOrderDir.bind(this)
    this.state = {}
  }

  componentDidMount () {
    if (this.props.defaultOrderColumn) {
      this.setOrderColumn(this.props.defaultOrderColumn)
    }

    this.setOrderDir(this.props.defaultOrderDir)
  }

  setOrderColumn (column) {
    this.setState({orderColumn: column})
  }

  setOrderDir (dir = 'desc') {
    this.setState({orderDir: dir})
  }

  getData () {
    const {orderColumn, orderDir} = this.state
    let {data} = this.props
    const column = flattenColumns(this.props.children)
      .filter(column => column.props.id === orderColumn)[0]

    if (!column) return data

    data = data.map(row => {
      return {row, orderValue: tdOrderValue(column, row)}
    })

    return data.sort((a, b) => {
      a = a.orderValue || 0
      b = b.orderValue || 0
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

  render () {
    this.props.children

    const tableProps = {
      className: this.props.className,
      id: this.props.id,
      style: this.props.style
    }

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
          data={this.getData()}
        />
      </table>
    )
  }
}

export class Column extends Component {
  render () {
    return null
  }
}

export class ColumnGroup extends Component {
  render () {
    return null
  }
}
