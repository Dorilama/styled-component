const { JSDOM } = require("jsdom");
const dom = new JSDOM(``);
// @ts-ignore
global.window = dom.window;
global.document = window.document;
const test = require("tape");
const { render, html } = require("uhtml");
const { glob, css } = require("@dorilama/nano-css");
const { styled, setup } = require("../cjs");

glob`:root{--red:red}`;

const primary = "red";

// @ts-ignore
const h1 = styled.h1`
  color: ${primary};
`;

// @ts-ignore
const p = styled.p`
  color: purple;
  background-color: ${({ dark }) => (dark ? "black" : "yellow")};
`;

// @ts-ignore
const button = styled.button`
  color: var(--red);
  &:hover {
    color: blue;
  }
`;

// @ts-ignore
const button2 = styled("button")`
  @media only screen and (min-width: ${({ width = "400px" }) => width}) {
    & {
      color: red;
    }
  }
`;

const sheet = document.querySelector("style").sheet;
const getLastRule = (n = 0) =>
  sheet.cssRules[sheet.cssRules.length - 1 - n].cssText;

test("styled", (t) => {
  t.throws(() => h1("hello"), "call component before setup");
  t.throws(() => setup(), "call setup with no argument");
  t.throws(() => setup({ css }), "call setup only with css");
  // @ts-ignore
  setup({ css, html, theme: { color: "yellow" } });
  render(document.body, h1("hello world"));
  let element = document.body.firstElementChild;
  t.equal(element.textContent, "hello world");
  t.equal(window.getComputedStyle(element).color, "red");

  render(document.body, p("hello world"));
  element = document.body.firstElementChild;
  t.equal(window.getComputedStyle(element).color, "purple");
  t.equal(window.getComputedStyle(element).backgroundColor, "yellow");

  render(document.body, p("hello world", { dark: true }));
  element = document.body.firstElementChild;
  t.equal(window.getComputedStyle(element).color, "purple");
  t.equal(window.getComputedStyle(element).backgroundColor, "black");

  render(document.body, button("hello world"));
  element = document.body.firstElementChild;
  t.equal(getLastRule(1), "._pxc0q8 {color: var(--red);}");
  t.equal(getLastRule(), "._pxc0q8:hover {color: blue;}");

  render(document.body, button2("hello world"));
  element = document.body.firstElementChild;
  t.equal(
    getLastRule(),
    "@media only screen and (min-width: 400px) {._ui7pwd {color: red;}}"
  );

  render(
    document.body,
    button2(
      html`Hello
        <span
          class=${css`
            color: purple;
          `}
          >world</span
        >`,
      { width: "1500px" }
    )
  );
  element = document.body.firstElementChild;
  //   t.equal(window.getComputedStyle(element).color, "black");
  t.equal(
    getLastRule(),
    "@media only screen and (min-width: 1500px) {._azo86l {color: red;}}"
  );

  //   for (let r of sheet.cssRules) {
  //     console.log(r.cssText);
  //   }
  t.end();
});
