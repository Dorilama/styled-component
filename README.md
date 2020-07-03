Create functions that produce HTML content via [µhtml](https://github.com/WebReflection/uhtml) with style attached.
For styling it uses [@dorilama/nano-css](https://github.com/Dorilama/nano-css)
Inspired by [nano-css](https://github.com/streamich/nano-css), [goober](https://github.com/cristianbote/goober), and all the other famous libraries.

---

## Disclaimer

This is a demo project for learning purposes.

---

## Usage

```javascript
// for convenience the module export render and html from µhtml, see https://github.com/WebReflection/uhtml
// it also export css and glob from @dorilama/nano-css, see https://github.com/Dorilama/nano-css
import {render, html, glob, css, styled}

glob`:root{
    --font-size: 24px;
}`

const color = 'red'

const hello = styled.h1`
font-size: var(--font-size)
color: ${color}
background-color: ${props=>props.bkg}
`

render(document.body,hello('Hello world',{bkg:'yellow'}))

```

## Security

**This library allow to use arbitrary input as interpolations. User input used as style can lead to CSS injection.**
Read [here](https://frontarm.com/james-k-nelson/how-can-i-use-css-in-js-securely/) to have an idea of the problem.
