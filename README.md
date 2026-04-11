> [!WARNING]
> This README is old and outdated. It will be updated as soon as possible.
> AI.md, README.long.md too.

# @kljj04/cli-kit

All-in-one terminal styling library for Node.js.  
RGB truecolor, boxes, tables, spinners, and progress bars — all in one package.

## Install

```bash
npm install @kljj04/cli-kit
```

## Usage

All styling follows the same chain pattern:

```js
kit.color(R, G, B).style(...styles).context(value)
```

- **`color(r, g, b)`** — RGB truecolor (0–255 each)
- **`style(...args)`** — one or more text styles, plus an optional output type
- **`context(value)`** — the content to render

---

## Text Styles

Pass any of these as arguments to `.style()`:

| Style | Description |
|---|---|
| `bold` | Bold text |
| `dim` | Dimmed text |
| `italic` | Italic text |
| `underline` | Underlined text |
| `inverse` | Inverted colors |
| `strikethrough` | Strikethrough text |

---

## Output Types

Pass one of these as an argument to `.style()` to change the output format.  
Default is `print` if omitted.

### `print` (default)

```js
kit.color(255, 100, 50).style('bold').context('Hello!')
kit.color(255, 100, 50).style('bold', 'print').context('Hello!')
```

### `box`

Wraps the text in a Unicode box. Supports multiline strings.

```js
kit.color(100, 200, 255).style('box').context('Hello!')
kit.color(100, 200, 255).style('bold', 'box').context('Line one\nLine two')
```

```
┌────────┐
│ Hello! │
└────────┘
```

### `spinner`

Returns a spinner object. Call `.stop(text)` to stop it.

```js
const s = kit.color(0, 255, 200).style('spinner').context('Loading...')
setTimeout(() => s.stop('Done!'), 2000)
```

### `progress`

Pass a number from 0 to 100.

```js
kit.color(255, 200, 0).style('progress').context(72)
// [██████████████████████░░░░░░░░] 72%
```

### `table`

Pass an array of objects. Keys become headers.

```js
kit.color(200, 150, 255).style('table').context([
    { name: 'Alice', age: 20, role: 'dev' },
    { name: 'Bob',   age: 25, role: 'designer' },
])
```

```
┌───────┬─────┬──────────┐
│ name  │ age │ role     │
┼───────┼─────┼──────────┼
│ Alice │ 20  │ dev      │
│ Bob   │ 25  │ designer │
└───────┴─────┴──────────┘
```

---

## License

MIT
