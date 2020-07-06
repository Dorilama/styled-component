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
/**
 * @type {Object.<string,any>}
 */


let styled = new Proxy({}, {
  get(target, prop) {
    return (template, ...values) => {
      let tag = String(prop);
      let htmlTemplate = [`<${tag} class=`, `>`, `</${tag}>`];
      return (content, props = {}) => {
        let className = $css()(template, ...values.map(v => typeof v === "function" ? v(props) : v));
        return $html()(htmlTemplate, className, content);
      };
    };
  }

});
exports.styled = styled;