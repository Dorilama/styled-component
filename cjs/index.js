"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _uhtml.html;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _uhtml.render;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _nanoCss.css;
  }
});
Object.defineProperty(exports, "glob", {
  enumerable: true,
  get: function () {
    return _nanoCss.glob;
  }
});
exports.styled = void 0;

var _uhtml = require("uhtml");

var _nanoCss = require("@dorilama/nano-css");

const styled = new Proxy(
/**@type {Object.<string,any>} */
{}, {
  get(t, p, r) {
    return (template, ...values) => {
      let tag = String(p);
      let htmlTemplate =
      /**@type {*} */
      [`<${tag} class=`, `>`, `</${tag}>`];
      return (content, props = {}) => {
        let className = (0, _nanoCss.css)(template, ...values.map(v => typeof v === "function" ? v(props) : v));
        return (0, _uhtml.html)(htmlTemplate, className, content);
      };
    };
  }

});
exports.styled = styled;