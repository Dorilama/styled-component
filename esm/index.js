import { html, render } from "uhtml";
import { css, glob } from "@dorilama/nano-css";

const styled = new Proxy(
  /**@type {Object.<string,any>} */ {},
  {
    get(t, p, r) {
      return (template, ...values) => {
        let tag = String(p);
        let htmlTemplate = /**@type {*} */ ([
          `<${tag} class=`,
          `>`,
          `</${tag}>`,
        ]);
        return (content, props = {}) => {
          let className = css(
            template,
            ...values.map((v) => (typeof v === "function" ? v(props) : v))
          );
          return html(htmlTemplate, className, content);
        };
      };
    },
  }
);

export { render, html, css, glob, styled };
