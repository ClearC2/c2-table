'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnGroup = exports.Column = exports.Table = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultClickableClass = 'clickable';

function isColumnGroup(child) {
  return child.type && child.type._col_type && child.type._col_type === ColumnGroup._col_type;
}

function isColumn(child) {
  return child.type && child.type._col_type && child.type._col_type === Column._col_type;
}

function isValidTableChild(child) {
  return isColumnGroup(child) || isColumn(child);
}

var ColumnOrColumnGroup = _propTypes2.default.arrayOf(function (propValue, key) {
  if (!isValidTableChild(propValue[key])) {
    throw new Error('<Table> can only have <Column> and <ColumnGroup> as children. ');
  }
});

var StringOrFunc = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]);

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.onHeaderClick = _this.onHeaderClick.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'headerContent',
    value: function headerContent() {
      switch (_typeof(this.props.header)) {
        case 'function':
          return this.props.header(this.getSortSymbol(), this.onHeaderClick);
        default:
          return _react2.default.createElement(
            'span',
            null,
            this.props.header || this.props.id,
            ' ',
            this.getSortSymbol()
          );
      }
    }
  }, {
    key: 'isCurrentSortColumn',
    value: function isCurrentSortColumn() {
      return this.props.orderColumn === this.props.id;
    }
  }, {
    key: 'getSortSymbol',
    value: function getSortSymbol(column) {
      var _props = this.props,
          sortDescIcon = _props.sortDescIcon,
          sortAscIcon = _props.sortAscIcon;


      return this.isCurrentSortColumn(column) ? this.props.orderDir === 'asc' ? _react2.default.createElement(
        'span',
        null,
        sortAscIcon || '↑'
      ) : _react2.default.createElement(
        'span',
        null,
        sortDescIcon || '↓'
      ) : null;
    }
  }, {
    key: 'onHeaderClick',
    value: function onHeaderClick() {
      this.props.setOrderColumn(this.props.id);
      this.props.setOrderDir(this.props.orderDir === 'asc' || !this.props.orderDir ? 'desc' : 'asc');
    }
  }, {
    key: 'getClickableClass',
    value: function getClickableClass() {
      return this.props.sortOnHeaderClick === false ? null : this.props.clickableClass || defaultClickableClass;
    }
  }, {
    key: 'renderFirstRowHeader',
    value: function renderFirstRowHeader() {
      var _this2 = this;

      var colSpan = this.props.children ? this.props.children.length : 1;

      return _react2.default.createElement(
        'th',
        {
          colSpan: colSpan || 1,
          rowSpan: this.props.hasGroups && colSpan == 1 ? 2 : 1,
          onClick: function onClick() {
            return _this2.props.sortOnHeaderClick === false ? null : _this2.onHeaderClick();
          },
          className: this.props.className + ' ' + this.getClickableClass()
        },
        this.headerContent()
      );
    }
  }, {
    key: 'renderSecondRowHeader',
    value: function renderSecondRowHeader() {
      var _this3 = this;

      return _react2.default.createElement(
        'th',
        {
          key: this.props.id,
          onClick: function onClick() {
            return _this3.props.sortOnHeaderClick === false ? null : _this3.onHeaderClick();
          },
          className: this.props.className + ' ' + this.getClickableClass()
        },
        this.headerContent()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.isFirstRow ? this.renderFirstRowHeader() : this.renderSecondRowHeader();
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  id: _propTypes2.default.string.isRequired,
  orderColumn: _propTypes2.default.string,
  orderDir: _propTypes2.default.string,
  setOrderColumn: _propTypes2.default.func.isRequired,
  setOrderDir: _propTypes2.default.func.isRequired,
  sortOnHeaderClick: _propTypes2.default.bool,
  clickableClass: _propTypes2.default.string,
  children: ColumnOrColumnGroup,
  hasGroups: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  isFirstRow: _propTypes2.default.bool,
  header: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  sortDescIcon: _propTypes2.default.any,
  sortAscIcon: _propTypes2.default.any
};

var Thead = function (_Component2) {
  _inherits(Thead, _Component2);

  function Thead() {
    _classCallCheck(this, Thead);

    return _possibleConstructorReturn(this, (Thead.__proto__ || Object.getPrototypeOf(Thead)).apply(this, arguments));
  }

  _createClass(Thead, [{
    key: 'hasGroups',
    value: function hasGroups() {
      var hasGroups = false;
      _react2.default.Children.forEach(this.props.children, function (column) {
        if (isColumnGroup(column)) hasGroups = true;
      });

      return hasGroups;
    }
  }, {
    key: 'renderFirstRow',
    value: function renderFirstRow() {
      var _this5 = this;

      var hasGroups = this.hasGroups();
      return _react2.default.createElement(
        'tr',
        null,
        this.props.onExpand ? _react2.default.createElement('th', { rowSpan: hasGroups ? 2 : 1, className: this.props.expandClassName }) : null,
        _react2.default.Children.map(this.props.children, function (column) {
          return _react2.default.createElement(
            Header,
            _extends({
              key: column.props.id
            }, _this5.props, column.props, {
              hasGroups: hasGroups,
              className: column.props.headerClassName,
              isFirstRow: true
            }),
            column.props.children
          );
        })
      );
    }
  }, {
    key: 'renderSecondRow',
    value: function renderSecondRow() {
      var _this6 = this;

      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.Children.map(this.props.children, function (column) {
          if (!isColumnGroup(column)) return null;
          return _react2.default.Children.map(column.props.children, function (child) {
            return _react2.default.createElement(
              Header,
              _extends({
                key: child.props.id
              }, _this6.props, child.props, {
                className: child.props.headerClassName
              }),
              child.props.children
            );
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'thead',
        null,
        this.renderFirstRow(),
        this.hasGroups() ? this.renderSecondRow() : null
      );
    }
  }]);

  return Thead;
}(_react.Component);

Thead.propTypes = {
  children: ColumnOrColumnGroup,
  onExpand: _propTypes2.default.func,
  expandClassName: _propTypes2.default.string
};


function flattenColumns(columns) {
  var childs = [];

  _react2.default.Children.forEach(columns, function (child) {
    if (isColumnGroup(child)) {
      childs = childs.concat(flattenColumns(child.props.children));
    } else {
      childs.push(child);
    }
  });

  return childs;
}

var Tbody = function (_Component3) {
  _inherits(Tbody, _Component3);

  function Tbody(props) {
    _classCallCheck(this, Tbody);

    var _this7 = _possibleConstructorReturn(this, (Tbody.__proto__ || Object.getPrototypeOf(Tbody)).call(this, props));

    var expanded = {};
    if (props.expanded) {
      props.expanded.forEach(function (rowId) {
        expanded[rowId] = true;
      });
    }
    _this7.state = { expanded: expanded };
    return _this7;
  }

  _createClass(Tbody, [{
    key: 'cellClassName',
    value: function cellClassName(column, row) {
      if (typeof column.props.cellClassName === 'function') {
        return column.props.cellClassName(row);
      }

      return column.props.cellClassName;
    }
  }, {
    key: 'expandCell',
    value: function expandCell(row) {
      var _this8 = this;

      var _props2 = this.props,
          rowId = _props2.rowId,
          expandClassName = _props2.expandClassName,
          clickableClass = _props2.clickableClass,
          collapsedIcon = _props2.collapsedIcon,
          expandedIcon = _props2.expandedIcon;

      var id = getRowId(rowId, row);
      var onClick = function onClick() {
        var expanded = _this8.state.expanded;
        expanded[id] = !expanded[id];

        _this8.setState({ expanded: expanded });
      };

      return _react2.default.createElement(
        'td',
        { className: expandClassName + ' ' + (clickableClass || defaultClickableClass), onClick: onClick },
        this.state.expanded[id] ? expandedIcon || '-' : collapsedIcon || '+'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var _props3 = this.props,
          children = _props3.children,
          rowId = _props3.rowId,
          onExpand = _props3.onExpand,
          onEmpty = _props3.onEmpty;

      var tableId = this.props.id;
      var columns = flattenColumns(children);
      var data = this.props.data || [];
      var rows = [];

      data.forEach(function (row, index) {
        var id = getRowId(rowId, row);
        var rId = tableId + '-' + id;
        rows.push(_react2.default.createElement(
          'tr',
          { key: 'tr-' + rId, id: 'tr-' + rId },
          onExpand ? _this9.expandCell(row) : null,
          columns.map(function (column) {
            return _react2.default.createElement(
              'td',
              { key: 'td-' + rId + '-' + column.props.id, className: _this9.cellClassName(column, row) },
              tdContent(column, row, index)
            );
          })
        ));
        if (onExpand && _this9.state.expanded[id]) {
          rows.push(_react2.default.createElement(
            'tr',
            { key: 'tr-' + rId + '-expanded' },
            _react2.default.createElement(
              'td',
              { colSpan: columns.length + 1 },
              _react2.default.createElement(onExpand, { row: row })
            )
          ));
        }
      });

      if (rows.length === 0) {
        rows.push(_react2.default.createElement(
          'tr',
          { key: 'tr-empty' },
          _react2.default.createElement(
            'td',
            { colSpan: columns.length + (onExpand ? 1 : 0) },
            onEmpty ? onEmpty : _react2.default.createElement(
              'div',
              { className: 'text-center' },
              'No data...'
            )
          )
        ));
      }

      return _react2.default.createElement(
        'tbody',
        null,
        rows
      );
    }
  }]);

  return Tbody;
}(_react.Component);

Tbody.propTypes = {
  rowId: StringOrFunc.isRequired,
  expandClassName: _propTypes2.default.string,
  clickableClass: _propTypes2.default.string,
  children: ColumnOrColumnGroup.isRequired,
  id: _propTypes2.default.string.isRequired,
  onExpand: _propTypes2.default.func,
  data: _propTypes2.default.array.isRequired,
  expandedIcon: _propTypes2.default.any,
  collapsedIcon: _propTypes2.default.any,
  expanded: _propTypes2.default.array,
  onEmpty: _propTypes2.default.node
};


function getRowId(rowId, row) {
  switch (typeof rowId === 'undefined' ? 'undefined' : _typeof(rowId)) {
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

var Table = exports.Table = function (_Component4) {
  _inherits(Table, _Component4);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this10 = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this10.setOrderColumn = _this10.setOrderColumn.bind(_this10);
    _this10.setOrderDir = _this10.setOrderDir.bind(_this10);
    _this10.state = {};
    return _this10;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.defaultOrderColumn) {
        this.setOrderColumn(this.props.defaultOrderColumn);
      }

      this.setOrderDir(this.props.defaultOrderDir);
    }
  }, {
    key: 'setOrderColumn',
    value: function setOrderColumn(column) {
      this.setState({ orderColumn: column });
    }
  }, {
    key: 'setOrderDir',
    value: function setOrderDir() {
      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'desc';

      this.setState({ orderDir: dir });
    }
  }, {
    key: 'getColumns',
    value: function getColumns() {
      return flattenColumns(this.props.children);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _state = this.state,
          orderColumn = _state.orderColumn,
          orderDir = _state.orderDir;
      var data = this.props.data;

      var column = flattenColumns(this.props.children).filter(function (column) {
        return column.props.id === orderColumn;
      })[0];

      if (!column) return data;

      data = data.map(function (row) {
        return { row: row, orderValue: tdOrderValue(column, row) };
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
    key: 'render',
    value: function render() {
      this.props.children;

      var tableProps = {
        className: this.props.className,
        id: this.props.id,
        style: this.props.style
      };
      var data = this.getData();
      return _react2.default.createElement(
        'table',
        tableProps,
        _react2.default.createElement(Thead, _extends({}, this.props, {
          orderColumn: this.state.orderColumn,
          orderDir: this.state.orderDir,
          setOrderColumn: this.setOrderColumn,
          setOrderDir: this.setOrderDir
        })),
        _react2.default.createElement(Tbody, _extends({}, this.props, {
          data: data
        })),
        _react2.default.createElement(Tfoot, _extends({}, this.props, { data: data }))
      );
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = {
  defaultOrderColumn: _propTypes2.default.string,
  defaultOrderDir: _propTypes2.default.string,
  data: _propTypes2.default.array.isRequired,
  children: ColumnOrColumnGroup.isRequired,
  id: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};

var Tfoot = function (_Component5) {
  _inherits(Tfoot, _Component5);

  function Tfoot() {
    _classCallCheck(this, Tfoot);

    return _possibleConstructorReturn(this, (Tfoot.__proto__ || Object.getPrototypeOf(Tfoot)).apply(this, arguments));
  }

  _createClass(Tfoot, [{
    key: 'render',
    value: function render() {
      var _this12 = this;

      if (!this.props.children) return null;
      var columns = flattenColumns(this.props.children);
      var footerValues = columns.reduce(function (last, column) {
        return last || column.props.footer;
      }, false);

      if (!footerValues || !this.props.data.length) return null;

      return _react2.default.createElement(
        'tfoot',
        null,
        _react2.default.createElement(
          'tr',
          null,
          this.props.onExpand ? _react2.default.createElement('td', null) : null,
          flattenColumns(this.props.children).map(function (column) {
            return _react2.default.createElement(
              'td',
              { key: column.props.id, className: column.props.footerClassName || '' },
              column.props.footer ? column.props.footer(_this12.props.data) : null
            );
          })
        )
      );
    }
  }]);

  return Tfoot;
}(_react.Component);

Tfoot.defaultProps = { data: [] };
Tfoot.propTypes = {
  children: _propTypes2.default.node,
  onExpand: _propTypes2.default.func,
  data: _propTypes2.default.array
};

var Column = exports.Column = function (_Component6) {
  _inherits(Column, _Component6);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
  }

  _createClass(Column, [{
    key: 'render',
    value: function render() {
      throw new Error('<Column> is not meant to be rendered.');
    }
  }]);

  return Column;
}(_react.Component);

Column._col_type = 'c2-table-column';
Column.propTypes = {
  id: _propTypes2.default.string.isRequired,
  headerClassName: _propTypes2.default.any,
  cellClassName: _propTypes2.default.any,
  footerClassName: _propTypes2.default.string,
  header: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  footer: _propTypes2.default.func,
  cell: StringOrFunc,
  orderValue: StringOrFunc
};

var ColumnGroup = exports.ColumnGroup = function (_Component7) {
  _inherits(ColumnGroup, _Component7);

  function ColumnGroup() {
    _classCallCheck(this, ColumnGroup);

    return _possibleConstructorReturn(this, (ColumnGroup.__proto__ || Object.getPrototypeOf(ColumnGroup)).apply(this, arguments));
  }

  _createClass(ColumnGroup, [{
    key: 'render',
    value: function render() {
      throw new Error('<ColumnGroup> is not meant to be rendered.');
    }
  }]);

  return ColumnGroup;
}(_react.Component);

ColumnGroup._col_type = 'c2-table-column-group';
ColumnGroup.propTypes = {
  id: _propTypes2.default.string.isRequired,
  headerClassName: _propTypes2.default.any,
  children: _propTypes2.default.arrayOf(function (propValue, key) {
    if (!isColumn(propValue[key])) {
      throw new Error('<ColumnGroup> can only have <Column>\'s as children. ');
    }
  })
};