"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowContext = exports.ColumnGroup = exports.Column = exports.Table = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactHotLoader = require("react-hot-loader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var defaultClickableClass = 'clickable';

var StringOrFunc = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);

var StringOrObject = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]);

var StringObjectOrFunc = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object, _propTypes.default.func]);

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
}(_react.Component);

exports.Column = Column;

_defineProperty(Column, "_colType", 'c2-table-column');

_defineProperty(Column, "propTypes", {
  /** Unique column id */
  id: _propTypes.default.string.isRequired,

  /** Header label or func that accepts sort direction and sort function that should return jsx */
  header: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /** Class to apply to header th */
  headerClassName: StringObjectOrFunc,

  /** Class to apply to body td */
  cellClassName: _propTypes.default.any,

  /** Class to apply to footer td */
  footerClassName: StringOrObject,

  /** Func that accepts all rows and should return string/jsx */
  footer: _propTypes.default.func,

  /** String or func that accepts row and should return string/jsx */
  cell: StringOrFunc,

  /** String id of column or func that accepts row and should return string */
  orderValue: StringOrFunc,

  /** Add sort click handler to column header */
  sortOnHeaderClick: _propTypes.default.bool,

  /** Custom sort function: (data, orderDir) => data */
  sort: _propTypes.default.func
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
}(_react.Component);

exports.ColumnGroup = ColumnGroup;

_defineProperty(ColumnGroup, "_colType", 'c2-table-column-group');

_defineProperty(ColumnGroup, "propTypes", {
  /** Unique column id */
  id: _propTypes.default.string.isRequired,

  /** Columns */
  children: _propTypes.default.arrayOf(function (propValue, key) {
    if (propValue[key] && !isColumn(propValue[key])) {
      throw new Error('<ColumnGroup> can only have <Column>\'s as children. ');
    }
  }).isRequired,

  /** Class to apply to header th */
  headerClassName: StringObjectOrFunc,

  /** Add sort click handler to column group header */
  sortOnHeaderClick: _propTypes.default.bool,

  /** Custom sort function: (data, orderDir) => data */
  sort: _propTypes.default.func
});

_defineProperty(ColumnGroup, "defaultProps", {
  sortOnHeaderClick: true
});

function isColumnGroup(child) {
  child = child || {};
  return (0, _reactHotLoader.areComponentsEqual)(child.type, ColumnGroup);
}

function isColumn(child) {
  child = child || {};
  return (0, _reactHotLoader.areComponentsEqual)(child.type, Column);
}

function getColumns(children) {
  return _react.default.Children.toArray(children).filter(function (child) {
    return !!child;
  });
}

var ColumnOrColumnGroup = function ColumnOrColumnGroup(props, propName) {
  var error;

  _react.default.Children.forEach(props[propName], function (value) {
    var validType = isColumnGroup(value) || isColumn(value);

    if (!validType) {
      error = new Error('Invalid Table children.');
    }

    return error;
  });
};

var RowContext = _react.default.createContext({
  row: null,
  index: null,
  rowId: null,
  expanded: null,
  expand: function expand() {},
  collapse: function collapse() {},
  toggleExpanded: function toggleExpanded() {}
});

exports.RowContext = RowContext;

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
      if (_this.props.sortOnHeaderClick === false) return;
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
          return _react.default.createElement("span", null, this.props.header || this.props.id, " ", this.getSortSymbol());
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
      return this.isCurrentSortColumn(column) ? this.props.orderDir === 'asc' ? _react.default.createElement("span", null, sortAscIcon || '↑') : _react.default.createElement("span", null, sortDescIcon || '↓') : null;
    }
  }, {
    key: "getClickableClass",
    value: function getClickableClass() {
      return this.props.sortOnHeaderClick === false ? null : this.props.clickableClass || defaultClickableClass;
    }
  }, {
    key: "renderFirstRowHeader",
    value: function renderFirstRowHeader() {
      var colSpan = this.props.children ? this.props.children.length : 1;
      return _react.default.createElement("th", {
        colSpan: colSpan || 1,
        rowSpan: this.props.hasGroups && colSpan === 1 ? 2 : 1,
        onClick: this.onHeaderClick,
        className: "".concat(this.props.className || '', " ").concat(this.getClickableClass()).trim(),
        "data-testid": "header-".concat(this.props.id)
      }, this.headerContent());
    }
  }, {
    key: "renderSecondRowHeader",
    value: function renderSecondRowHeader() {
      return _react.default.createElement("th", {
        key: this.props.id,
        onClick: this.onHeaderClick,
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
}(_react.Component);

_defineProperty(Header, "propTypes", {
  id: _propTypes.default.string.isRequired,
  orderColumn: _propTypes.default.string,
  orderDir: _propTypes.default.string,
  setOrderColumn: _propTypes.default.func.isRequired,
  setOrderDir: _propTypes.default.func.isRequired,
  sortOnHeaderClick: _propTypes.default.bool,
  clickableClass: _propTypes.default.string,
  children: ColumnOrColumnGroup,
  hasGroups: _propTypes.default.bool,
  className: StringOrObject,
  isFirstRow: _propTypes.default.bool,
  header: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  sortDescIcon: _propTypes.default.any,
  sortAscIcon: _propTypes.default.any,
  onSort: _propTypes.default.func
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

      _react.default.Children.forEach(this.props.children, function (column) {
        if (isColumnGroup(column)) hasGroups = true;
      });

      return hasGroups;
    }
  }, {
    key: "renderFirstRow",
    value: function renderFirstRow() {
      var _this2 = this;

      var hasGroups = this.hasGroups();
      return _react.default.createElement("tr", null, this.props.onExpand ? _react.default.createElement("th", {
        rowSpan: hasGroups ? 2 : 1,
        className: this.props.expandClassName
      }) : null, getColumns(this.props.children).map(function (column) {
        return _react.default.createElement(Header, {
          key: column.props.id,
          orderColumn: _this2.props.orderColumn,
          orderDir: _this2.props.orderDir,
          setOrderColumn: _this2.props.setOrderColumn,
          setOrderDir: _this2.props.setOrderDir,
          clickableClass: _this2.props.clickableClass,
          onSort: _this2.props.onSort,
          sortDescIcon: _this2.props.sortDescIcon,
          sortAscIcon: _this2.props.sortAscIcon,
          id: column.props.id,
          header: column.props.header,
          className: column.props.headerClassName,
          sortOnHeaderClick: column.props.sortOnHeaderClick,
          hasGroups: hasGroups,
          isFirstRow: true
        }, column.props.children);
      }));
    }
  }, {
    key: "renderSecondRow",
    value: function renderSecondRow() {
      var _this3 = this;

      return _react.default.createElement("tr", null, getColumns(this.props.children).map(function (column) {
        if (!isColumnGroup(column)) return null;
        return getColumns(column.props.children).map(function (child) {
          return _react.default.createElement(Header, {
            key: child.props.id,
            orderColumn: _this3.props.orderColumn,
            orderDir: _this3.props.orderDir,
            setOrderColumn: _this3.props.setOrderColumn,
            setOrderDir: _this3.props.setOrderDir,
            clickableClass: _this3.props.clickableClass,
            onSort: _this3.props.onSort,
            sortDescIcon: _this3.props.sortDescIcon,
            sortAscIcon: _this3.props.sortAscIcon,
            id: child.props.id,
            header: child.props.header,
            className: child.props.headerClassName,
            sortOnHeaderClick: child.props.sortOnHeaderClick,
            children: child.props.children
          });
        });
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("thead", null, this.renderFirstRow(), this.hasGroups() ? this.renderSecondRow() : null);
    }
  }]);

  return Thead;
}(_react.Component);

_defineProperty(Thead, "propTypes", {
  children: ColumnOrColumnGroup,
  onExpand: _propTypes.default.func,
  expandClassName: StringOrObject,
  orderColumn: _propTypes.default.string,
  orderDir: _propTypes.default.string,
  setOrderColumn: _propTypes.default.func.isRequired,
  setOrderDir: _propTypes.default.func.isRequired,
  clickableClass: _propTypes.default.string,
  sortDescIcon: _propTypes.default.any,
  sortAscIcon: _propTypes.default.any,
  onSort: _propTypes.default.func
});

function flattenColumns(columns) {
  var childs = [];
  getColumns(columns).forEach(function (child) {
    if (isColumnGroup(child)) {
      childs = childs.concat(flattenColumns(child.props.children));
    } else {
      childs.push(child);
    }
  });
  return childs.filter(function (c) {
    return !!c;
  });
}

function findColumn(columns, id) {
  var found = getColumns(columns).find(function (column) {
    return column.props.id === id;
  });
  if (found) return found;
  return flattenColumns(columns).find(function (column) {
    return column.props.id === id;
  });
}

function Row(_ref) {
  var rowId = _ref.rowId,
      row = _ref.row,
      index = _ref.index,
      expanded = _ref.expanded,
      setExpanded = _ref.setExpanded,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["rowId", "row", "index", "expanded", "setExpanded", "children"]);

  // eslint-disable-line
  var value = _react.default.useMemo(function () {
    return {
      rowId: rowId,
      row: row,
      index: index,
      expanded: expanded,
      toggleExpanded: function toggleExpanded() {
        return setExpanded(rowId, !expanded);
      },
      expand: function expand() {
        return setExpanded(rowId, true);
      },
      collapse: function collapse() {
        return setExpanded(rowId, false);
      }
    };
  }, [rowId, row, index, expanded, setExpanded]);

  return _react.default.createElement(RowContext.Provider, {
    value: value
  }, _react.default.createElement("tr", props, children));
}

var Tbody =
/*#__PURE__*/
function (_Component5) {
  _inherits(Tbody, _Component5);

  function Tbody(props) {
    var _this4;

    _classCallCheck(this, Tbody);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Tbody).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "setExpanded", function (rowId, expanded) {
      _this4.setState({
        expanded: _objectSpread({}, _this4.state.expanded, _defineProperty({}, rowId, expanded))
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "getRowClassName", function (row, index) {
      var rowClassName = _this4.props.rowClassName;
      if (typeof rowClassName === 'string') return rowClassName;
      if (typeof rowClassName === 'function') return rowClassName(row, index);
      return '';
    });

    var _expanded = {};

    if (props.expanded) {
      props.expanded.forEach(function (rowId) {
        _expanded[rowId] = true;
      });
    }

    _this4.state = {
      expanded: _expanded
    };
    return _this4;
  }

  _createClass(Tbody, [{
    key: "cellClassName",
    value: function cellClassName(column, row, index) {
      if (typeof column.props.cellClassName === 'function') {
        return column.props.cellClassName(row, index);
      }

      return column.props.cellClassName;
    }
  }, {
    key: "expandCell",
    value: function expandCell(row, index) {
      var _this5 = this;

      var _this$props2 = this.props,
          rowId = _this$props2.rowId,
          expandClassName = _this$props2.expandClassName,
          clickableClass = _this$props2.clickableClass,
          collapsedIcon = _this$props2.collapsedIcon,
          expandedIcon = _this$props2.expandedIcon;
      var id = getRowId(rowId, row, index);

      var onClick = function onClick() {
        var expanded = _this5.state.expanded;
        expanded[id] = !expanded[id];

        _this5.setState({
          expanded: expanded
        });
      };

      return _react.default.createElement("td", {
        className: "".concat(expandClassName || '', " ").concat(clickableClass || defaultClickableClass).trim(),
        onClick: onClick
      }, this.state.expanded[id] ? expandedIcon || '-' : collapsedIcon || '+');
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props3 = this.props,
          children = _this$props3.children,
          rowId = _this$props3.rowId,
          onExpand = _this$props3.onExpand,
          onEmpty = _this$props3.onEmpty,
          isFullLength = _this$props3.isFullLength,
          fullLengthCell = _this$props3.fullLengthCell;
      var tableId = this.props.id;
      var columns = flattenColumns(children);
      var data = this.props.data || [];
      var rows = [];
      data.forEach(function (row, index) {
        var rowClassName = _this6.getRowClassName(row, index);

        var id = getRowId(rowId, row, index);
        var rId = "".concat(tableId, "-").concat(id);
        var expanded = _this6.state.expanded[id] || false;

        if (isFullLength && isFullLength(row, index)) {
          rows.push(_react.default.createElement(Row, {
            key: "tr-".concat(rId),
            id: "tr-".concat(rId),
            rowId: id,
            row: row,
            index: index,
            expanded: expanded,
            setExpanded: _this6.setExpanded,
            className: rowClassName
          }, _react.default.createElement("td", {
            colSpan: columns.length + (onExpand ? 1 : 0)
          }, fullLengthCell(row, index))));
        } else {
          rows.push(_react.default.createElement(Row, {
            key: "tr-".concat(rId),
            id: "tr-".concat(rId),
            rowId: id,
            row: row,
            index: index,
            expanded: expanded,
            setExpanded: _this6.setExpanded,
            className: rowClassName
          }, onExpand ? _this6.expandCell(row, index) : null, columns.map(function (column) {
            return _react.default.createElement("td", {
              key: "td-".concat(rId, "-").concat(column.props.id),
              className: _this6.cellClassName(column, row, index)
            }, tdContent(column, row, index));
          })));
        }

        if (onExpand && _this6.state.expanded[id]) {
          rows.push(_react.default.createElement(Row, {
            key: "tr-".concat(rId, "-expanded"),
            rowId: id,
            row: row,
            index: index,
            expanded: expanded,
            setExpanded: _this6.setExpanded,
            className: "".concat(rowClassName, "-expanded")
          }, _react.default.createElement("td", {
            colSpan: columns.length + 1
          }, _react.default.createElement(onExpand, {
            row: row
          }))));
        }
      });

      if (rows.length === 0) {
        rows.push(_react.default.createElement("tr", {
          key: "tr-empty"
        }, _react.default.createElement("td", {
          colSpan: columns.length + (onExpand ? 1 : 0)
        }, onEmpty || _react.default.createElement("div", {
          className: "text-center"
        }, "No data..."))));
      }

      return _react.default.createElement("tbody", null, rows);
    }
  }]);

  return Tbody;
}(_react.Component);

_defineProperty(Tbody, "propTypes", {
  rowId: StringOrFunc.isRequired,
  expandClassName: StringOrObject,
  clickableClass: _propTypes.default.string,
  children: ColumnOrColumnGroup,
  id: _propTypes.default.string.isRequired,
  onExpand: _propTypes.default.func,
  data: _propTypes.default.array.isRequired,
  expandedIcon: _propTypes.default.any,
  collapsedIcon: _propTypes.default.any,
  expanded: _propTypes.default.array,
  onEmpty: _propTypes.default.node,
  rowClassName: StringOrFunc,
  isFullLength: _propTypes.default.func,
  fullLengthCell: _propTypes.default.func
});

function getRowId(rowId, row, index) {
  switch (_typeof(rowId)) {
    case 'function':
      return rowId(row, index);

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

    var _this7;

    _classCallCheck(this, Table);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this7 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Table)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "setOrderColumn", function (column) {
      if (!_this7.props.sortEnabled) return;

      _this7.setState({
        orderColumn: column
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "setOrderDir", function () {
      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'desc';
      if (!_this7.props.sortEnabled) return;

      _this7.setState({
        orderDir: dir
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this7)), "getPagedData", function () {
      var data = _this7.getData();

      if (_this7.props.page === undefined || _this7.props.rowsPerPage === undefined) return data;
      var begin = _this7.props.page * _this7.props.rowsPerPage;
      var end = begin + _this7.props.rowsPerPage;
      return data.slice(begin, end);
    });

    return _this7;
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
      var data = this.getData();
      var pagedData = this.getPagedData();
      return _react.default.createElement("table", {
        className: this.props.className,
        id: this.props.id,
        style: this.props.style
      }, _react.default.createElement(Thead, {
        id: this.props.id,
        orderColumn: this.state.orderColumn,
        orderDir: this.state.orderDir,
        setOrderColumn: this.setOrderColumn,
        setOrderDir: this.setOrderDir,
        children: this.props.children,
        onExpand: this.props.onExpand,
        expandClassName: this.props.expandClassName,
        clickableClass: this.props.sortEnabled ? this.props.clickableClass : 'c2-table-disabled',
        sortDescIcon: this.props.sortDescIcon,
        sortAscIcon: this.props.sortAscIcon,
        onSort: this.props.onSort
      }), _react.default.createElement(Tbody, {
        id: this.props.id,
        rowId: this.props.rowId,
        expandClassName: this.props.expandClassName,
        clickableClass: this.props.clickableClass,
        children: this.props.children,
        expandedIcon: this.props.expandedIcon,
        collapsedIcon: this.props.collapsedIcon,
        onExpand: this.props.onExpand,
        expanded: this.props.expanded,
        onEmpty: this.props.onEmpty,
        rowClassName: this.props.rowClassName,
        isFullLength: this.props.isFullLength,
        fullLengthCell: this.props.fullLengthCell,
        data: pagedData
      }), _react.default.createElement(Tfoot, {
        children: this.props.children,
        onExpand: this.props.onExpand,
        data: data
      }));
    }
  }]);

  return Table;
}(_react.Component);

exports.Table = Table;

_defineProperty(Table, "propTypes", {
  /** Unique table id */
  id: _propTypes.default.string.isRequired,

  /** String or func that accepts row and should return a unique row id string */
  rowId: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,

  /** The array of table data */
  data: _propTypes.default.array.isRequired,

  /** The default column to order by */
  defaultOrderColumn: _propTypes.default.string,

  /** The default column direction */
  defaultOrderDir: _propTypes.default.oneOf(['asc', 'desc']),

  /** If sorting should be enabled */
  sortEnabled: _propTypes.default.bool,

  /** Columns/ColumnGroups */
  children: ColumnOrColumnGroup,

  /** Style object */
  style: _propTypes.default.object,

  /** Can be string or object(glamor) */
  className: StringOrObject,

  /** String or func that accepts row and should return string */
  rowClassName: StringOrFunc,

  /** Expanded td's className */
  expandClassName: StringOrObject,

  /** Class to apply to clickable elements */
  clickableClass: _propTypes.default.string,

  /** Page number */
  page: _propTypes.default.number,

  /** Rows per page */
  rowsPerPage: _propTypes.default.number,

  /** Function that receives the row object and should return jsx */
  onExpand: _propTypes.default.func,

  /** Array of rowIds that should be expanded on mount */
  expanded: _propTypes.default.array,

  /** Icon to show for expanded rows */
  expandedIcon: _propTypes.default.any,

  /** Icon to show for collapsed rows */
  collapsedIcon: _propTypes.default.any,

  /** Show elements when no rows */
  onEmpty: _propTypes.default.node,

  /** Icon to show when column is desc sorted */
  sortDescIcon: _propTypes.default.any,

  /** Icon to show when column is asc sorted */
  sortAscIcon: _propTypes.default.any,

  /** Function that is called on sort, (columnId, dir) => {}  */
  onSort: _propTypes.default.func,

  /** Function that receives the row object and should bool for is full length */
  isFullLength: _propTypes.default.func,

  /** Full length cell renderer */
  fullLengthCell: _propTypes.default.func
});

_defineProperty(Table, "defaultProps", {
  sortEnabled: true
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
      var _this8 = this;

      if (!this.props.children) return null;
      var columns = flattenColumns(this.props.children);
      var footerValues = columns.reduce(function (last, column) {
        return last || column.props.footer;
      }, false);
      if (!footerValues || !this.props.data.length) return null;
      return _react.default.createElement("tfoot", null, _react.default.createElement("tr", null, this.props.onExpand ? _react.default.createElement("td", null) : null, flattenColumns(this.props.children).map(function (column) {
        return _react.default.createElement("td", {
          key: column.props.id,
          className: column.props.footerClassName || ''
        }, column.props.footer ? column.props.footer(_this8.props.data) : null);
      })));
    }
  }]);

  return Tfoot;
}(_react.Component);

_defineProperty(Tfoot, "defaultProps", {
  data: []
});

_defineProperty(Tfoot, "propTypes", {
  children: _propTypes.default.node,
  onExpand: _propTypes.default.func,
  data: _propTypes.default.array
});