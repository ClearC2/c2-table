function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { areComponentsEqual } from 'react-hot-loader';
var defaultClickableClass = 'clickable';
var StringOrFunc = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);
var StringOrObject = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);
var StringObjectOrFunc = PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]);

var Column =
/*#__PURE__*/
function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, _getPrototypeOf(Column).apply(this, arguments));
  }

  _createClass(Column, [{
    key: "render",
    value: function render() {
      throw new Error('<Column> is not meant to be rendered.');
    }
  }]);

  return Column;
}(Component);

_defineProperty(Column, "_colType", 'c2-table-column');

_defineProperty(Column, "propTypes", {
  /** Unique column id */
  id: PropTypes.string.isRequired,

  /** Header label or func that accepts sort direction and sort function that should return jsx */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

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
});

_defineProperty(Column, "defaultProps", {
  sortOnHeaderClick: true
});

var ColumnGroup =
/*#__PURE__*/
function (_Component2) {
  _inherits(ColumnGroup, _Component2);

  function ColumnGroup() {
    _classCallCheck(this, ColumnGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(ColumnGroup).apply(this, arguments));
  }

  _createClass(ColumnGroup, [{
    key: "render",
    value: function render() {
      throw new Error('<ColumnGroup> is not meant to be rendered.');
    }
  }]);

  return ColumnGroup;
}(Component);

_defineProperty(ColumnGroup, "_colType", 'c2-table-column-group');

_defineProperty(ColumnGroup, "propTypes", {
  /** Unique column id */
  id: PropTypes.string.isRequired,

  /** Columns */
  children: PropTypes.arrayOf(function (propValue, key) {
    if (!isColumn(propValue[key])) {
      throw new Error('<ColumnGroup> can only have <Column>\'s as children. ');
    }
  }).isRequired,

  /** Class to apply to header th */
  headerClassName: StringObjectOrFunc,

  /** Add sort click handler to column group header */
  sortOnHeaderClick: PropTypes.bool,

  /** Custom sort function: (data, orderDir) => data */
  sort: PropTypes.func
});

_defineProperty(ColumnGroup, "defaultProps", {
  sortOnHeaderClick: true
});

function isColumnGroup(child) {
  return areComponentsEqual(child.type, ColumnGroup);
}

function isColumn(child) {
  return areComponentsEqual(child.type, Column);
}

var ColumnOrColumnGroup = function ColumnOrColumnGroup(props, propName) {
  var error;
  React.Children.forEach(props[propName], function (value) {
    var validType = isColumnGroup(value) || isColumn(value);

    if (!validType) {
      error = new Error('Invalid Table children.');
    }

    return error;
  });
};

var Header =
/*#__PURE__*/
function (_Component3) {
  _inherits(Header, _Component3);

  function Header() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Header)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onHeaderClick", function () {
      var dir = _this.props.orderDir === 'asc' || !_this.props.orderDir ? 'desc' : 'asc';

      _this.props.setOrderColumn(_this.props.id);

      _this.props.setOrderDir(dir);

      _this.props.onSort(_this.props.id, dir);
    });

    return _this;
  }

  _createClass(Header, [{
    key: "headerContent",
    value: function headerContent() {
      switch (_typeof(this.props.header)) {
        case 'function':
          return this.props.header(this.getSortSymbol(), this.onHeaderClick);

        default:
          return React.createElement("span", null, this.props.header || this.props.id, " ", this.getSortSymbol());
      }
    }
  }, {
    key: "isCurrentSortColumn",
    value: function isCurrentSortColumn() {
      return this.props.orderColumn === this.props.id;
    }
  }, {
    key: "getSortSymbol",
    value: function getSortSymbol(column) {
      var _this$props = this.props,
          sortDescIcon = _this$props.sortDescIcon,
          sortAscIcon = _this$props.sortAscIcon;
      return this.isCurrentSortColumn(column) ? this.props.orderDir === 'asc' ? React.createElement("span", null, sortAscIcon || '↑') : React.createElement("span", null, sortDescIcon || '↓') : null;
    }
  }, {
    key: "getClickableClass",
    value: function getClickableClass() {
      return this.props.sortOnHeaderClick === false ? null : this.props.clickableClass || defaultClickableClass;
    }
  }, {
    key: "renderFirstRowHeader",
    value: function renderFirstRowHeader() {
      var _this2 = this;

      var colSpan = this.props.children ? this.props.children.length : 1;
      return React.createElement("th", {
        colSpan: colSpan || 1,
        rowSpan: this.props.hasGroups && colSpan === 1 ? 2 : 1,
        onClick: function onClick() {
          return _this2.props.sortOnHeaderClick === false ? null : _this2.onHeaderClick();
        },
        className: "".concat(this.props.className || '', " ").concat(this.getClickableClass()).trim(),
        "data-testid": "header-".concat(this.props.id)
      }, this.headerContent());
    }
  }, {
    key: "renderSecondRowHeader",
    value: function renderSecondRowHeader() {
      var _this3 = this;

      return React.createElement("th", {
        key: this.props.id,
        onClick: function onClick() {
          return _this3.props.sortOnHeaderClick === false ? null : _this3.onHeaderClick();
        },
        className: "".concat(this.props.className || '', " ").concat(this.getClickableClass()).trim()
      }, this.headerContent());
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.isFirstRow ? this.renderFirstRowHeader() : this.renderSecondRowHeader();
    }
  }]);

  return Header;
}(Component);

_defineProperty(Header, "propTypes", {
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
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  sortDescIcon: PropTypes.any,
  sortAscIcon: PropTypes.any,
  onSort: PropTypes.func
});

_defineProperty(Header, "defaultProps", {
  onSort: function onSort() {}
});

var Thead =
/*#__PURE__*/
function (_Component4) {
  _inherits(Thead, _Component4);

  function Thead() {
    _classCallCheck(this, Thead);

    return _possibleConstructorReturn(this, _getPrototypeOf(Thead).apply(this, arguments));
  }

  _createClass(Thead, [{
    key: "hasGroups",
    value: function hasGroups() {
      var hasGroups = false;
      React.Children.forEach(this.props.children, function (column) {
        if (isColumnGroup(column)) hasGroups = true;
      });
      return hasGroups;
    }
  }, {
    key: "renderFirstRow",
    value: function renderFirstRow() {
      var _this4 = this;

      var hasGroups = this.hasGroups();
      return React.createElement("tr", null, this.props.onExpand ? React.createElement("th", {
        rowSpan: hasGroups ? 2 : 1,
        className: this.props.expandClassName
      }) : null, React.Children.map(this.props.children, function (column) {
        return React.createElement(Header, _extends({
          key: column.props.id
        }, _this4.props, column.props, {
          hasGroups: hasGroups,
          className: column.props.headerClassName,
          isFirstRow: true
        }), column.props.children);
      }));
    }
  }, {
    key: "renderSecondRow",
    value: function renderSecondRow() {
      var _this5 = this;

      return React.createElement("tr", null, React.Children.map(this.props.children, function (column) {
        if (!isColumnGroup(column)) return null;
        return React.Children.map(column.props.children, function (child) {
          return React.createElement(Header, _extends({
            key: child.props.id
          }, _this5.props, child.props, {
            className: child.props.headerClassName
          }), child.props.children);
        });
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("thead", null, this.renderFirstRow(), this.hasGroups() ? this.renderSecondRow() : null);
    }
  }]);

  return Thead;
}(Component);

_defineProperty(Thead, "propTypes", {
  children: ColumnOrColumnGroup,
  onExpand: PropTypes.func,
  expandClassName: StringOrObject
});

function flattenColumns(columns) {
  var childs = [];
  React.Children.forEach(columns, function (child) {
    if (isColumnGroup(child)) {
      childs = childs.concat(flattenColumns(child.props.children));
    } else {
      childs.push(child);
    }
  });
  return childs;
}

function findColumn(columns, id) {
  var found = React.Children.toArray(columns).find(function (column) {
    return column.props.id === id;
  });
  if (found) return found;
  return flattenColumns(columns).find(function (column) {
    return column.props.id === id;
  });
}

var Tbody =
/*#__PURE__*/
function (_Component5) {
  _inherits(Tbody, _Component5);

  function Tbody(props) {
    var _this6;

    _classCallCheck(this, Tbody);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Tbody).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this6)), "getRowClassName", function (row) {
      var rowClassName = _this6.props.rowClassName;
      if (typeof rowClassName === 'string') return rowClassName;
      if (typeof rowClassName === 'function') return rowClassName(row);
      return '';
    });

    var expanded = {};

    if (props.expanded) {
      props.expanded.forEach(function (rowId) {
        expanded[rowId] = true;
      });
    }

    _this6.state = {
      expanded: expanded
    };
    return _this6;
  }

  _createClass(Tbody, [{
    key: "cellClassName",
    value: function cellClassName(column, row) {
      if (typeof column.props.cellClassName === 'function') {
        return column.props.cellClassName(row);
      }

      return column.props.cellClassName;
    }
  }, {
    key: "expandCell",
    value: function expandCell(row) {
      var _this7 = this;

      var _this$props2 = this.props,
          rowId = _this$props2.rowId,
          expandClassName = _this$props2.expandClassName,
          clickableClass = _this$props2.clickableClass,
          collapsedIcon = _this$props2.collapsedIcon,
          expandedIcon = _this$props2.expandedIcon;
      var id = getRowId(rowId, row);

      var onClick = function onClick() {
        var expanded = _this7.state.expanded;
        expanded[id] = !expanded[id];

        _this7.setState({
          expanded: expanded
        });
      };

      return React.createElement("td", {
        className: "".concat(expandClassName || '', " ").concat(clickableClass || defaultClickableClass).trim(),
        onClick: onClick
      }, this.state.expanded[id] ? expandedIcon || '-' : collapsedIcon || '+');
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var _this$props3 = this.props,
          children = _this$props3.children,
          rowId = _this$props3.rowId,
          onExpand = _this$props3.onExpand,
          onEmpty = _this$props3.onEmpty;
      var tableId = this.props.id;
      var columns = flattenColumns(children);
      var data = this.props.data || [];
      var rows = [];
      data.forEach(function (row, index) {
        var rowClassName = _this8.getRowClassName(row);

        var id = getRowId(rowId, row);
        var rId = "".concat(tableId, "-").concat(id);
        rows.push(React.createElement("tr", {
          key: "tr-".concat(rId),
          id: "tr-".concat(rId),
          className: rowClassName
        }, onExpand ? _this8.expandCell(row) : null, columns.map(function (column) {
          return React.createElement("td", {
            key: "td-".concat(rId, "-").concat(column.props.id),
            className: _this8.cellClassName(column, row)
          }, tdContent(column, row, index));
        })));

        if (onExpand && _this8.state.expanded[id]) {
          rows.push(React.createElement("tr", {
            key: "tr-".concat(rId, "-expanded"),
            className: "".concat(rowClassName, "-expanded")
          }, React.createElement("td", {
            colSpan: columns.length + 1
          }, React.createElement(onExpand, {
            row: row
          }))));
        }
      });

      if (rows.length === 0) {
        rows.push(React.createElement("tr", {
          key: "tr-empty"
        }, React.createElement("td", {
          colSpan: columns.length + (onExpand ? 1 : 0)
        }, onEmpty || React.createElement("div", {
          className: "text-center"
        }, "No data..."))));
      }

      return React.createElement("tbody", null, rows);
    }
  }]);

  return Tbody;
}(Component);

_defineProperty(Tbody, "propTypes", {
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
});

function getRowId(rowId, row) {
  switch (_typeof(rowId)) {
    case 'function':
      return rowId(row);

    default:
      return row[rowId];
  }
}

function tdContent(column, row, index) {
  switch (_typeof(column.props.cell)) {
    case 'function':
      return column.props.cell(row, index);

    default:
      return row[column.props.cell || column.props.id];
  }
}

function tdOrderValue(column, row) {
  switch (_typeof(column.props.orderValue)) {
    case 'function':
      return column.props.orderValue(row);

    default:
      return row[column.props.orderValue || column.props.id];
  }
}

var Table =
/*#__PURE__*/
function (_Component6) {
  _inherits(Table, _Component6);

  function Table() {
    var _getPrototypeOf3;

    var _this9;

    _classCallCheck(this, Table);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this9 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Table)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this9)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this9)), "setOrderColumn", function (column) {
      _this9.setState({
        orderColumn: column
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this9)), "setOrderDir", function () {
      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'desc';

      _this9.setState({
        orderDir: dir
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this9)), "getPagedData", function () {
      var data = _this9.getData();

      if (_this9.props.page === undefined || _this9.props.rowsPerPage === undefined) return data;
      var begin = _this9.props.page * _this9.props.rowsPerPage;
      var end = begin + _this9.props.rowsPerPage;
      return data.slice(begin, end);
    });

    return _this9;
  }

  _createClass(Table, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.defaultOrderColumn) {
        this.setOrderColumn(this.props.defaultOrderColumn);
      }

      this.setOrderDir(this.props.defaultOrderDir);
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      return flattenColumns(this.props.children);
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this$state = this.state,
          orderColumn = _this$state.orderColumn,
          orderDir = _this$state.orderDir;
      var data = this.props.data;
      var column = findColumn(this.props.children, orderColumn);
      if (!column) return data;

      if (typeof column.props.sort === 'function') {
        return column.props.sort(data, orderDir);
      }

      data = data.map(function (row) {
        return {
          row: row,
          orderValue: tdOrderValue(column, row)
        };
      });
      return data.sort(function (a, b) {
        var defaultValue = typeof a.orderValue === 'string' ? '' : 0;
        a = a.orderValue || defaultValue;
        b = b.orderValue || defaultValue;

        if (orderDir === 'asc') {
          if (a > b) return 1;
          if (a < b) return -1;
        } else {
          if (a < b) return 1;
          if (a > b) return -1;
        }

        return 0;
      }).map(function (obj) {
        return obj.row;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var tableProps = {
        className: this.props.className,
        id: this.props.id,
        style: this.props.style
      };
      var data = this.getData();
      var pagedData = this.getPagedData();
      return React.createElement("table", tableProps, React.createElement(Thead, _extends({}, this.props, {
        orderColumn: this.state.orderColumn,
        orderDir: this.state.orderDir,
        setOrderColumn: this.setOrderColumn,
        setOrderDir: this.setOrderDir
      })), React.createElement(Tbody, _extends({}, this.props, {
        data: pagedData
      })), React.createElement(Tfoot, _extends({}, this.props, {
        data: data
      })));
    }
  }]);

  return Table;
}(Component);

_defineProperty(Table, "propTypes", {
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
});

var Tfoot =
/*#__PURE__*/
function (_Component7) {
  _inherits(Tfoot, _Component7);

  function Tfoot() {
    _classCallCheck(this, Tfoot);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tfoot).apply(this, arguments));
  }

  _createClass(Tfoot, [{
    key: "render",
    value: function render() {
      var _this10 = this;

      if (!this.props.children) return null;
      var columns = flattenColumns(this.props.children);
      var footerValues = columns.reduce(function (last, column) {
        return last || column.props.footer;
      }, false);
      if (!footerValues || !this.props.data.length) return null;
      return React.createElement("tfoot", null, React.createElement("tr", null, this.props.onExpand ? React.createElement("td", null) : null, flattenColumns(this.props.children).map(function (column) {
        return React.createElement("td", {
          key: column.props.id,
          className: column.props.footerClassName || ''
        }, column.props.footer ? column.props.footer(_this10.props.data) : null);
      })));
    }
  }]);

  return Tfoot;
}(Component);

_defineProperty(Tfoot, "defaultProps", {
  data: []
});

_defineProperty(Tfoot, "propTypes", {
  children: PropTypes.node,
  onExpand: PropTypes.func,
  data: PropTypes.array
});

export { Table, Column, ColumnGroup };