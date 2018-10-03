!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("prop-types"),require("react")):"function"==typeof define&&define.amd?define(["prop-types","react"],r):"object"==typeof exports?exports.C2Table=r(require("prop-types"),require("react")):e.C2Table=r(e.PropTypes,e.React)}(window,function(__WEBPACK_EXTERNAL_MODULE__0__,__WEBPACK_EXTERNAL_MODULE__1__){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=4)}([function(e,r){e.exports=__WEBPACK_EXTERNAL_MODULE__0__},function(e,r){e.exports=__WEBPACK_EXTERNAL_MODULE__1__},function(module,exports,__webpack_require__){"use strict";var evalAllowed=!1;try{eval("evalAllowed = true")}catch(e){}var platformSupported=!!Object.setPrototypeOf&&evalAllowed;module.exports=__webpack_require__(3)},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=function(e){return e&&"object"==typeof e&&"default"in e?e.default:e}(t(1)),o=function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")},a=function(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r},s=function(e){function r(){return o(this,r),a(this,e.apply(this,arguments))}return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}(r,e),r.prototype.render=function(){return n.Children.only(this.props.children)},r}(n.Component);r.AppContainer=s,r.hot=function(){return function(e){return e}},r.areComponentsEqual=function(e,r){return e===r},r.setConfig=function(){},r.cold=function(e){return e}},function(e,r,t){"use strict";t.r(r);var n=t(1),o=t.n(n),a=t(0),s=t.n(a),i=t(2);function u(){return(u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function p(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function d(e,r,t){return r&&p(e.prototype,r),t&&p(e,t),e}function f(e,r){return!r||"object"!==l(r)&&"function"!=typeof r?h(e):r}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&C(e,r)}function C(e,r){return(C=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}function b(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var v=s.a.oneOfType([s.a.string,s.a.func]),E=s.a.oneOfType([s.a.string,s.a.object]),w=s.a.oneOfType([s.a.string,s.a.object,s.a.func]),g=function(e){function r(){return c(this,r),f(this,m(r).apply(this,arguments))}return y(r,n["Component"]),d(r,[{key:"render",value:function(){throw new Error("<Column> is not meant to be rendered.")}}]),r}();b(g,"_colType","c2-table-column"),b(g,"propTypes",{id:s.a.string.isRequired,headerClassName:w,cellClassName:s.a.any,footerClassName:E,header:s.a.oneOfType([s.a.string,s.a.func]),footer:s.a.func,cell:v,orderValue:v});var _=function(e){function r(){return c(this,r),f(this,m(r).apply(this,arguments))}return y(r,n["Component"]),d(r,[{key:"render",value:function(){throw new Error("<ColumnGroup> is not meant to be rendered.")}}]),r}();function O(e){return Object(i.areComponentsEqual)(e.type,_)}function k(e){return Object(i.areComponentsEqual)(e.type,g)}b(_,"_colType","c2-table-column-group"),b(_,"propTypes",{id:s.a.string.isRequired,headerClassName:w,children:s.a.arrayOf(function(e,r){if(!k(e[r]))throw new Error("<ColumnGroup> can only have <Column>'s as children. ")})});var N=function(e,r){var t;o.a.Children.forEach(e[r],function(e){return O(e)||k(e)||(t=new Error("Invalid Table children.")),t})},x=function(e){function r(){var e,t;c(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return b(h(h(t=f(this,(e=m(r)).call.apply(e,[this].concat(o))))),"onHeaderClick",function(){var e="asc"!==t.props.orderDir&&t.props.orderDir?"asc":"desc";t.props.setOrderColumn(t.props.id),t.props.setOrderDir(e),t.props.onSort(t.props.id,e)}),t}return y(r,n["Component"]),d(r,[{key:"headerContent",value:function(){switch(l(this.props.header)){case"function":return this.props.header(this.getSortSymbol(),this.onHeaderClick);default:return o.a.createElement("span",null,this.props.header||this.props.id," ",this.getSortSymbol())}}},{key:"isCurrentSortColumn",value:function(){return this.props.orderColumn===this.props.id}},{key:"getSortSymbol",value:function(e){var r=this.props,t=r.sortDescIcon,n=r.sortAscIcon;return this.isCurrentSortColumn(e)?"asc"===this.props.orderDir?o.a.createElement("span",null,n||"↑"):o.a.createElement("span",null,t||"↓"):null}},{key:"getClickableClass",value:function(){return!1===this.props.sortOnHeaderClick?null:this.props.clickableClass||"clickable"}},{key:"renderFirstRowHeader",value:function(){var e=this,r=this.props.children?this.props.children.length:1;return o.a.createElement("th",{colSpan:r||1,rowSpan:this.props.hasGroups&&1===r?2:1,onClick:function(){return!1===e.props.sortOnHeaderClick?null:e.onHeaderClick()},className:"".concat(this.props.className||""," ").concat(this.getClickableClass()).trim()},this.headerContent())}},{key:"renderSecondRowHeader",value:function(){var e=this;return o.a.createElement("th",{key:this.props.id,onClick:function(){return!1===e.props.sortOnHeaderClick?null:e.onHeaderClick()},className:"".concat(this.props.className||""," ").concat(this.getClickableClass()).trim()},this.headerContent())}},{key:"render",value:function(){return this.props.isFirstRow?this.renderFirstRowHeader():this.renderSecondRowHeader()}}]),r}();b(x,"propTypes",{id:s.a.string.isRequired,orderColumn:s.a.string,orderDir:s.a.string,setOrderColumn:s.a.func.isRequired,setOrderDir:s.a.func.isRequired,sortOnHeaderClick:s.a.bool,clickableClass:s.a.string,children:N,hasGroups:s.a.bool,className:E,isFirstRow:s.a.bool,header:s.a.oneOfType([s.a.string,s.a.func]),sortDescIcon:s.a.any,sortAscIcon:s.a.any,onSort:s.a.func}),b(x,"defaultProps",{onSort:function(){}});var S=function(e){function r(){return c(this,r),f(this,m(r).apply(this,arguments))}return y(r,n["Component"]),d(r,[{key:"hasGroups",value:function(){var e=!1;return o.a.Children.forEach(this.props.children,function(r){O(r)&&(e=!0)}),e}},{key:"renderFirstRow",value:function(){var e=this,r=this.hasGroups();return o.a.createElement("tr",null,this.props.onExpand?o.a.createElement("th",{rowSpan:r?2:1,className:this.props.expandClassName}):null,o.a.Children.map(this.props.children,function(t){return o.a.createElement(x,u({key:t.props.id},e.props,t.props,{hasGroups:r,className:t.props.headerClassName,isFirstRow:!0}),t.props.children)}))}},{key:"renderSecondRow",value:function(){var e=this;return o.a.createElement("tr",null,o.a.Children.map(this.props.children,function(r){return O(r)?o.a.Children.map(r.props.children,function(r){return o.a.createElement(x,u({key:r.props.id},e.props,r.props,{className:r.props.headerClassName}),r.props.children)}):null}))}},{key:"render",value:function(){return o.a.createElement("thead",null,this.renderFirstRow(),this.hasGroups()?this.renderSecondRow():null)}}]),r}();function P(e){var r=[];return o.a.Children.forEach(e,function(e){O(e)?r=r.concat(P(e.props.children)):r.push(e)}),r}b(S,"propTypes",{children:N,onExpand:s.a.func,expandClassName:E});var j=function(e){function r(e){var t;c(this,r),b(h(h(t=f(this,m(r).call(this,e)))),"getRowClassName",function(e){var r=t.props.rowClassName;return"string"==typeof r?r:"function"==typeof r?r(e):""});var n={};return e.expanded&&e.expanded.forEach(function(e){n[e]=!0}),t.state={expanded:n},t}return y(r,n["Component"]),d(r,[{key:"cellClassName",value:function(e,r){return"function"==typeof e.props.cellClassName?e.props.cellClassName(r):e.props.cellClassName}},{key:"expandCell",value:function(e){var r=this,t=this.props,n=t.rowId,a=t.expandClassName,s=t.clickableClass,i=t.collapsedIcon,u=t.expandedIcon,l=R(n,e);return o.a.createElement("td",{className:"".concat(a||""," ").concat(s||"clickable").trim(),onClick:function(){var e=r.state.expanded;e[l]=!e[l],r.setState({expanded:e})}},this.state.expanded[l]?u||"-":i||"+")}},{key:"render",value:function(){var e=this,r=this.props,t=r.children,n=r.rowId,a=r.onExpand,s=r.onEmpty,i=this.props.id,u=P(t),c=[];return(this.props.data||[]).forEach(function(r,t){var s=e.getRowClassName(r),p=R(n,r),d="".concat(i,"-").concat(p);c.push(o.a.createElement("tr",{key:"tr-".concat(d),id:"tr-".concat(d),className:s},a?e.expandCell(r):null,u.map(function(n){return o.a.createElement("td",{key:"td-".concat(d,"-").concat(n.props.id),className:e.cellClassName(n,r)},function(e,r,t){switch(l(e.props.cell)){case"function":return e.props.cell(r,t);default:return r[e.props.cell||e.props.id]}}(n,r,t))}))),a&&e.state.expanded[p]&&c.push(o.a.createElement("tr",{key:"tr-".concat(d,"-expanded"),className:"".concat(s,"-expanded")},o.a.createElement("td",{colSpan:u.length+1},o.a.createElement(a,{row:r}))))}),0===c.length&&c.push(o.a.createElement("tr",{key:"tr-empty"},o.a.createElement("td",{colSpan:u.length+(a?1:0)},s||o.a.createElement("div",{className:"text-center"},"No data...")))),o.a.createElement("tbody",null,c)}}]),r}();function R(e,r){switch(l(e)){case"function":return e(r);default:return r[e]}}b(j,"propTypes",{rowId:v.isRequired,expandClassName:E,clickableClass:s.a.string,children:N,id:s.a.string.isRequired,onExpand:s.a.func,data:s.a.array.isRequired,expandedIcon:s.a.any,collapsedIcon:s.a.any,expanded:s.a.array,onEmpty:s.a.node,rowClassName:v});var T=function(e){function r(){var e,t;c(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return b(h(h(t=f(this,(e=m(r)).call.apply(e,[this].concat(o))))),"state",{}),b(h(h(t)),"setOrderColumn",function(e){t.setState({orderColumn:e})}),b(h(h(t)),"setOrderDir",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"desc";t.setState({orderDir:e})}),b(h(h(t)),"getPagedData",function(){var e=t.getData();if(void 0===t.props.page||void 0===t.props.rowsPerPage)return e;var r=t.props.page*t.props.rowsPerPage,n=r+t.props.rowsPerPage;return e.slice(r,n)}),t}return y(r,n["Component"]),d(r,[{key:"componentDidMount",value:function(){this.props.defaultOrderColumn&&this.setOrderColumn(this.props.defaultOrderColumn),this.setOrderDir(this.props.defaultOrderDir)}},{key:"getColumns",value:function(){return P(this.props.children)}},{key:"getData",value:function(){var e=this.state,r=e.orderColumn,t=e.orderDir,n=this.props.data,o=P(this.props.children).filter(function(e){return e.props.id===r})[0];return o?(n=n.map(function(e){return{row:e,orderValue:function(e,r){switch(l(e.props.orderValue)){case"function":return e.props.orderValue(r);default:return r[e.props.orderValue||e.props.id]}}(o,e)}})).sort(function(e,r){var n="string"==typeof e.orderValue?"":0;if(e=e.orderValue||n,r=r.orderValue||n,"asc"===t){if(e>r)return 1;if(e<r)return-1}else{if(e<r)return 1;if(e>r)return-1}return 0}).map(function(e){return e.row}):n}},{key:"render",value:function(){var e={className:this.props.className,id:this.props.id,style:this.props.style},r=this.getData(),t=this.getPagedData();return o.a.createElement("table",e,o.a.createElement(S,u({},this.props,{orderColumn:this.state.orderColumn,orderDir:this.state.orderDir,setOrderColumn:this.setOrderColumn,setOrderDir:this.setOrderDir})),o.a.createElement(j,u({},this.props,{data:t})),o.a.createElement(D,u({},this.props,{data:r})))}}]),r}();b(T,"propTypes",{defaultOrderColumn:s.a.string,defaultOrderDir:s.a.oneOf(["asc","desc"]),data:s.a.array.isRequired,children:N,id:s.a.string.isRequired,className:E,style:s.a.object,rowClassName:v,page:s.a.number,rowsPerPage:s.a.number});var D=function(e){function r(){return c(this,r),f(this,m(r).apply(this,arguments))}return y(r,n["Component"]),d(r,[{key:"render",value:function(){var e=this;return this.props.children&&P(this.props.children).reduce(function(e,r){return e||r.props.footer},!1)&&this.props.data.length?o.a.createElement("tfoot",null,o.a.createElement("tr",null,this.props.onExpand?o.a.createElement("td",null):null,P(this.props.children).map(function(r){return o.a.createElement("td",{key:r.props.id,className:r.props.footerClassName||""},r.props.footer?r.props.footer(e.props.data):null)}))):null}}]),r}();b(D,"defaultProps",{data:[]}),b(D,"propTypes",{children:s.a.node,onExpand:s.a.func,data:s.a.array}),t.d(r,"Table",function(){return T}),t.d(r,"Column",function(){return g}),t.d(r,"ColumnGroup",function(){return _})}])});