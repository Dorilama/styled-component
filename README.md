Create functions that produce HTML content via with style attached.
Currently uses [µhtml](https://github.com/WebReflection/uhtml) and [@dorilama/nano-css](https://github.com/Dorilama/nano-css).
Inspired by [nano-css](https://github.com/streamich/nano-css), [goober](https://github.com/cristianbote/goober), and all the other famous libraries.

![Travis (.com)](https://img.shields.io/travis/com/Dorilama/styled-component) ![Coveralls github](https://img.shields.io/coveralls/github/Dorilama/styled-component) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@dorilama/styled-component) ![David](https://img.shields.io/david/Dorilama/styled-component)

---

## Disclaimer

This is a demo project for learning purposes.

---

## Usage

```javascript
import { render, html } from "uhtml";
import { glob, css } from "@dorilama/nano-css";
import { setup, styled } from "@dorilama/styled-components";

setup({ css, html });

glob`:root{
    --font-size: 24px;
}`;

const color = "red";

const hello = styled.h1`
font-size: var(--font-size)
color: ${color}
background-color: ${(props) => props.bkg}
`;

render(document.body, hello("Hello world", { bkg: "yellow" }));
```

## Security

**This library allow to use arbitrary input as interpolations. User input used as style can lead to CSS injection.**
Read [here](https://frontarm.com/james-k-nelson/how-can-i-use-css-in-js-securely/) to have an idea of the problem.
