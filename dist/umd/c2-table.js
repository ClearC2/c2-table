!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.c2table=t(require("react")):e.c2table=t(e.react)}(window,function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(t,r){t.exports=e},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,t,r){return t&&l(e.prototype,t),r&&l(e,r),e}function c(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?h(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e){return e.type&&e.type._colType&&e.type._colType===S._colType}var C=function(e){function t(){var e,r;i(this,t);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return m(h(h(r=c(this,(e=p(t)).call.apply(e,[this].concat(o))))),"onHeaderClick",function(){r.props.setOrderColumn(r.props.id),r.props.setOrderDir("asc"!==r.props.orderDir&&r.props.orderDir?"asc":"desc")}),r}return d(t,n["Component"]),u(t,[{key:"headerContent",value:function(){switch(s(this.props.header)){case"function":return this.props.header(this.getSortSymbol(),this.onHeaderClick);default:return o.a.createElement("span",null,this.props.header||this.props.id," ",this.getSortSymbol())}}},{key:"isCurrentSortColumn",value:function(){return this.props.orderColumn===this.props.id}},{key:"getSortSymbol",value:function(e){var t=this.props,r=t.sortDescIcon,n=t.sortAscIcon;return this.isCurrentSortColumn(e)?"asc"===this.props.orderDir?o.a.createElement("span",null,n||"↑"):o.a.createElement("span",null,r||"↓"):null}},{key:"getClickableClass",value:function(){return!1===this.props.sortOnHeaderClick?null:this.props.clickableClass||"clickable"}},{key:"renderFirstRowHeader",value:function(){var e=this,t=this.props.children?this.props.children.length:1;return o.a.createElement("th",{colSpan:t||1,rowSpan:this.props.hasGroups&&1===t?2:1,onClick:function(){return!1===e.props.sortOnHeaderClick?null:e.onHeaderClick()},className:"".concat(this.props.className," ").concat(this.getClickableClass())},this.headerContent())}},{key:"renderSecondRowHeader",value:function(){var e=this;return o.a.createElement("th",{key:this.props.id,onClick:function(){return!1===e.props.sortOnHeaderClick?null:e.onHeaderClick()},className:"".concat(this.props.className," ").concat(this.getClickableClass())},this.headerContent())}},{key:"render",value:function(){return this.props.isFirstRow?this.renderFirstRowHeader():this.renderSecondRowHeader()}}]),t}(),v=function(e){function t(){return i(this,t),c(this,p(t).apply(this,arguments))}return d(t,n["Component"]),u(t,[{key:"hasGroups",value:function(){var e=!1;return o.a.Children.forEach(this.props.children,function(t){y(t)&&(e=!0)}),e}},{key:"renderFirstRow",value:function(){var e=this,t=this.hasGroups();return o.a.createElement("tr",null,this.props.onExpand?o.a.createElement("th",{rowSpan:t?2:1,className:this.props.expandClassName}):null,o.a.Children.map(this.props.children,function(r){return o.a.createElement(C,a({key:r.props.id},e.props,r.props,{hasGroups:t,className:r.props.headerClassName,isFirstRow:!0}),r.props.children)}))}},{key:"renderSecondRow",value:function(){var e=this;return o.a.createElement("tr",null,o.a.Children.map(this.props.children,function(t){return y(t)?o.a.Children.map(t.props.children,function(t){return o.a.createElement(C,a({key:t.props.id},e.props,t.props,{className:t.props.headerClassName}),t.props.children)}):null}))}},{key:"render",value:function(){return o.a.createElement("thead",null,this.renderFirstRow(),this.hasGroups()?this.renderSecondRow():null)}}]),t}();function b(e){var t=[];return o.a.Children.forEach(e,function(e){y(e)?t=t.concat(b(e.props.children)):t.push(e)}),t}var k=function(e){function t(e){var r;i(this,t),m(h(h(r=c(this,p(t).call(this,e)))),"getRowClassName",function(e){var t=r.props.rowClassName;return"string"==typeof t?t:"function"==typeof t?t(e):""});var n={};return e.expanded&&e.expanded.forEach(function(e){n[e]=!0}),r.state={expanded:n},r}return d(t,n["Component"]),u(t,[{key:"cellClassName",value:function(e,t){return"function"==typeof e.props.cellClassName?e.props.cellClassName(t):e.props.cellClassName}},{key:"expandCell",value:function(e){var t=this,r=this.props,n=r.rowId,a=r.expandClassName,s=r.clickableClass,i=r.collapsedIcon,l=r.expandedIcon,u=w(n,e);return o.a.createElement("td",{className:"".concat(a," ").concat(s||"clickable"),onClick:function(){var e=t.state.expanded;e[u]=!e[u],t.setState({expanded:e})}},this.state.expanded[u]?l||"-":i||"+")}},{key:"render",value:function(){var e=this,t=this.props,r=t.children,n=t.rowId,a=t.onExpand,i=t.onEmpty,l=this.props.id,u=b(r),c=[];return(this.props.data||[]).forEach(function(t,r){var i=e.getRowClassName(t),p=w(n,t),d="".concat(l,"-").concat(p);c.push(o.a.createElement("tr",{key:"tr-".concat(d),id:"tr-".concat(d),className:i},a?e.expandCell(t):null,u.map(function(n){return o.a.createElement("td",{key:"td-".concat(d,"-").concat(n.props.id),className:e.cellClassName(n,t)},function(e,t,r){switch(s(e.props.cell)){case"function":return e.props.cell(t,r);default:return t[e.props.cell||e.props.id]}}(n,t,r))}))),a&&e.state.expanded[p]&&c.push(o.a.createElement("tr",{key:"tr-".concat(d,"-expanded"),className:"".concat(i,"-expanded")},o.a.createElement("td",{colSpan:u.length+1},o.a.createElement(a,{row:t}))))}),0===c.length&&c.push(o.a.createElement("tr",{key:"tr-empty"},o.a.createElement("td",{colSpan:u.length+(a?1:0)},i||o.a.createElement("div",{className:"text-center"},"No data...")))),o.a.createElement("tbody",null,c)}}]),t}();function w(e,t){switch(s(e)){case"function":return e(t);default:return t[e]}}var E=function(e){function t(){var e,r;i(this,t);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return m(h(h(r=c(this,(e=p(t)).call.apply(e,[this].concat(o))))),"state",{}),m(h(h(r)),"setOrderColumn",function(e){r.setState({orderColumn:e})}),m(h(h(r)),"setOrderDir",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"desc";r.setState({orderDir:e})}),r}return d(t,n["Component"]),u(t,[{key:"componentDidMount",value:function(){this.props.defaultOrderColumn&&this.setOrderColumn(this.props.defaultOrderColumn),this.setOrderDir(this.props.defaultOrderDir)}},{key:"getColumns",value:function(){return b(this.props.children)}},{key:"getData",value:function(){var e=this.state,t=e.orderColumn,r=e.orderDir,n=this.props.data,o=b(this.props.children).filter(function(e){return e.props.id===t})[0];return o?(n=n.map(function(e){return{row:e,orderValue:function(e,t){switch(s(e.props.orderValue)){case"function":return e.props.orderValue(t);default:return t[e.props.orderValue||e.props.id]}}(o,e)}})).sort(function(e,t){var n="string"==typeof e.orderValue?"":0;if(e=e.orderValue||n,t=t.orderValue||n,"asc"===r){if(e>t)return 1;if(e<t)return-1}else{if(e<t)return 1;if(e>t)return-1}return 0}).map(function(e){return e.row}):n}},{key:"render",value:function(){var e={className:this.props.className,id:this.props.id,style:this.props.style},t=this.getData();return o.a.createElement("table",e,o.a.createElement(v,a({},this.props,{orderColumn:this.state.orderColumn,orderDir:this.state.orderDir,setOrderColumn:this.setOrderColumn,setOrderDir:this.setOrderDir})),o.a.createElement(k,a({},this.props,{data:t})),o.a.createElement(O,a({},this.props,{data:t})))}}]),t}(),O=function(e){function t(){return i(this,t),c(this,p(t).apply(this,arguments))}return d(t,n["Component"]),u(t,[{key:"render",value:function(){var e=this;return this.props.children&&b(this.props.children).reduce(function(e,t){return e||t.props.footer},!1)&&this.props.data.length?o.a.createElement("tfoot",null,o.a.createElement("tr",null,this.props.onExpand?o.a.createElement("td",null):null,b(this.props.children).map(function(t){return o.a.createElement("td",{key:t.props.id,className:t.props.footerClassName||""},t.props.footer?t.props.footer(e.props.data):null)}))):null}}]),t}();m(O,"defaultProps",{data:[]});var g=function(e){function t(){return i(this,t),c(this,p(t).apply(this,arguments))}return d(t,n["Component"]),u(t,[{key:"render",value:function(){throw new Error("<Column> is not meant to be rendered.")}}]),t}();m(g,"_colType","c2-table-column");var S=function(e){function t(){return i(this,t),c(this,p(t).apply(this,arguments))}return d(t,n["Component"]),u(t,[{key:"render",value:function(){throw new Error("<ColumnGroup> is not meant to be rendered.")}}]),t}();m(S,"_colType","c2-table-column-group"),r.d(t,"Table",function(){return E}),r.d(t,"Column",function(){return g}),r.d(t,"ColumnGroup",function(){return S})}])});