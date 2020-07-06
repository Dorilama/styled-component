"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports.styled = void 0;

let $css = (t, ...v) => null;

let $html = (t, ...v) => null;

let $theme = {};

function setup(options = {}) {
  let {
    css,
    html,
    theme
  } = options;
  css && ($css = () => css);
  html && ($html = () => html);
  theme && ($theme = theme);

  if (!$html() || !$css()) {
    throw "Please setup both css and html functions";
  }
}

function styledFN(tag) {
  let htmlTemplate = [`<${tag} class=`, `>`, `</${tag}>`];
  return (template, ...values) => {
    return (content, props = {}) => {
      let className = $css()(template, ...values.map(v => typeof v === "function" ? v(props) : v));
      return $html()(htmlTemplate, className, content);
    };
  };
}
/**
 * @type {Object.<string,any>}
 */


const styled = new Proxy(styledFN, {
  get(target, prop) {
    return styledFN(String(prop));
  }

});
exports.styled = styled;