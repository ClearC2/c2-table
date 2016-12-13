import React, {Component, PropTypes} from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
    this.onHeaderClick = this.onHeaderClick.bind(this)
  }

  headerContent() {
    switch(typeof(this.props.header)) {
      case 'function':
        return this.props.header(this.getSortSymbol(), this.onHeaderClick)
      default:
        return <span>{this.props.header || this.props.id} {this.getSortSymbol()}</span>
    }
  }

  isCurrentSortColumn() {
    return this.props.orderColumn === this.props.id
  }

  getSortSymbol(column) {
    return this.isCurrentSortColumn(column) ?
      (this.props.orderDir === 'asc' ? <span>↑</span> : <span>↓</span>) :
      null
  }

  onHeaderClick() {
    this.props.setOrderColumn(this.props.id)
    this.props.setOrderDir(this.props.orderDir === 'asc' || !this.props.orderDir ? 'desc' : 'asc')
  }

  renderFirstRowHeader() {
    const colSpan = this.props.children ? this.props.children.length : 1

    return (
      <th
        colSpan={colSpan || 1}
        rowSpan={this.props.hasGroups && colSpan == 1 ? 2 : 1}
        onClick={() => this.props.sortOnHeaderClick === false ? null : this.onHeaderClick()}
        className={this.props.className}
      >
        {this.headerContent()}
      </th>
    )
  }

  renderSecondRowHeader() {
    return (
      <th
        key={this.props.id}
        onClick={() => this.props.sortOnHeaderClick === false ? null : this.onHeaderClick()}
        className={this.props.className}
      >
        {this.headerContent()}
      </th>
    )
  }

  render() {
    return this.props.isFirstRow ? this.renderFirstRowHeader() : this.renderSecondRowHeader()
  }
}

class Thead extends Component {
  hasGroups() {
    let hasGroups = false
    React.Children.forEach(this.props.children, column => {
      if (column.type === ColumnGroup) hasGroups = true
    })

    return hasGroups
  }

  renderFirstRow() {
    return (
      <tr>
        {React.Children.map(this.props.children, column => (
          <Header
            key={column.props.id}
            {...this.props}
            {...column.props}
            hasGroups={this.hasGroups()}
            className={column.props.headerClassName}
            isFirstRow={true}
          >
            {column.props.children}
          </Header>
        ))}
      </tr>
    )
  }

  renderSecondRow() {
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

  render() {
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
  render() {
    const {children, rowId, id} = this.props
    const columns = flattenColumns(children)
    const data = this.props.data || []

    return (
      <tbody>
        {data.map(row => {
          const rId = `${id}-${getRowId(rowId, row)}`
          return (
            <tr key={`tr-${rId}`}>
              {columns.map(column => (
                <td key={`td-${rId}-${column.props.id}`}>
                  {tdContent(column, row)}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    )
  }
}

function getRowId(rowId, row) {
  switch(typeof(rowId)) {
    case 'function':
      return rowId(row)
    default:
      return row[rowId]
  }
}


function tdContent(column, row) {
  switch(typeof(column.props.td)) {
    case 'function':
      return column.props.td(row)
    default:
      return row[column.props.td || column.props.id]
  }
}

function tdOrderValue(column, row) {
  switch(typeof(column.props.orderValue)) {
    case 'function':
      return column.props.orderValue(row)
    default:
      return row[column.props.orderValue || column.props.id]
  }
}

export class Table extends Component {
  constructor(props) {
    super(props)
    this.setOrderColumn = this.setOrderColumn.bind(this)
    this.setOrderDir = this.setOrderDir.bind(this)
    this.state = {}
  }

  componentDidMount() {
    if (this.props.defaultOrderColumn) {
      this.setOrderColumn(this.props.defaultOrderColumn)
    }

    this.setOrderDir(this.props.defaultOrderDir)
  }

  setOrderColumn(column) {
    this.setState({orderColumn: column})
  }

  setOrderDir(dir = 'desc') {
    this.setState({orderDir: dir})
  }

  getData() {
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

  render() {
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
        <Tbody {...this.props} data={this.getData()}/>
      </table>
    )
  }
}

export class Column extends Component {
  render() {
    return null
  }
}

export class ColumnGroup extends Component {
  render() {
    return null
  }
}
