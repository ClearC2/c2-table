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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultClickableClass = 'clickable';

var ColumnOrColumnGroup = _react.PropTypes.arrayOf(function (propValue, key) {
  var type = propValue[key].type;
  if (type !== Column && type !== ColumnGroup) {
    throw new Error('<Table> can only have <Column> and <ColumnGroup> as children. ');
  }
});

var StringOrFunc = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]);

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
  id: _react.PropTypes.string.isRequired,
  orderColumn: _react.PropTypes.string,
  orderDir: _react.PropTypes.string,
  setOrderColumn: _react.PropTypes.func.isRequired,
  setOrderDir: _react.PropTypes.func.isRequired,
  sortOnHeaderClick: _react.PropTypes.bool,
  clickableClass: _react.PropTypes.string,
  children: ColumnOrColumnGroup,
  hasGroups: _react.PropTypes.bool,
  className: _react.PropTypes.string,
  isFirstRow: _react.PropTypes.bool,
  header: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  sortDescIcon: _react.PropTypes.any,
  sortAscIcon: _react.PropTypes.any
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
        if (column.type === ColumnGroup) hasGroups = true;
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
          if (column.type !== ColumnGroup) return null;
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
  onExpand: _react.PropTypes.func,
  expandClassName: _react.PropTypes.string
};


function flattenColumns(columns) {
  var childs = [];

  _react2.default.Children.forEach(columns, function (child) {
    if (child.type === ColumnGroup) {
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

    _this7.state = { expanded: {} };
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
          onExpand = _props3.onExpand;

      var tableId = this.props.id;
      var columns = flattenColumns(children);
      var data = this.props.data || [];
      var rows = [];

      data.forEach(function (row) {
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
              tdContent(column, row)
            );
          })
        ));
        if (_this9.state.expanded[id]) {
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
  expandClassName: _react.PropTypes.string,
  clickableClass: _react.PropTypes.string,
  children: ColumnOrColumnGroup.isRequired,
  id: _react.PropTypes.string.isRequired,
  onExpand: _react.PropTypes.func,
  data: _react.PropTypes.array.isRequired,
  expandedIcon: _react.PropTypes.any,
  collapsedIcon: _react.PropTypes.any
};


function getRowId(rowId, row) {
  switch (typeof rowId === 'undefined' ? 'undefined' : _typeof(rowId)) {
    case 'function':
      return rowId(row);
    default:
      return row[rowId];
  }
}

function tdContent(column, row) {
  switch (_typeof(column.props.cell)) {
    case 'function':
      return column.props.cell(row);
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
        a = a.orderValue || 0;
        b = b.orderValue || 0;
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
          data: this.getData()
        }))
      );
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = {
  defaultOrderColumn: _react.PropTypes.string,
  defaultOrderDir: _react.PropTypes.string,
  data: _react.PropTypes.array.isRequired,
  children: ColumnOrColumnGroup.isRequired,
  id: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object
};

var Column = exports.Column = function (_Component5) {
  _inherits(Column, _Component5);

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

Column.propTypes = {
  id: _react.PropTypes.string.isRequired,
  headerClassName: _react.PropTypes.string,
  cellClassName: StringOrFunc,
  cell: StringOrFunc,
  orderValue: StringOrFunc
};

var ColumnGroup = exports.ColumnGroup = function (_Component6) {
  _inherits(ColumnGroup, _Component6);

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

ColumnGroup.propTypes = {
  id: _react.PropTypes.string.isRequired,
  headerClassName: _react.PropTypes.string,
  children: _react.PropTypes.arrayOf(function (propValue, key) {
    var type = propValue[key].type;
    if (type !== Column) {
      throw new Error('<ColumnGroup> can only have <Column>\'s as children. ');
    }
  })
};