# @kljj04/cli-kit

All-in-one terminal styling library for Node.js.  
RGB truecolor, gradients, boxes, tables, spinners, and progress bars — all in one package.

## Install

```bash
npm install @kljj04/cli-kit
```

## Usage

All styling follows the same chain pattern:

```js
kit.color(R, G, B).style(...styles).context(value)
kit.gradient([R, G, B], [R, G, B]).style(...styles).context(value)
```

- **`color(r, g, b)`** — RGB truecolor (0–255 each)
- **`gradient([r,g,b], [r,g,b])`** — gradient from start color to end color
- **`style(...args)`** — one or more text styles, plus an output type
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

Multiple styles can be combined:

```js
kit.color(200, 100, 255).style('bold', 'italic', 'underline').context('combined!')
```

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

#### Options for `progress`

| Option | Description |
|---|---|
| `override` | Overwrites the current line (for live updates) |
| `fixedgradient` | Fills the entire bar with the gradient upfront; progress reveals it left to right |

```js
// Live gradient progress bar
let i = 0;
const iv = setInterval(() => {
    i++;
    kit.gradient([255, 0, 0], [0, 255, 255]).style('progress', 'override', 'fixedgradient').context(i);
    if (i >= 100) clearInterval(iv);
}, 50);
```

**`fixedgradient` vs default gradient behavior:**

- Default: the gradient range grows as progress increases (50% progress shows only the first half of the gradient)
- `fixedgradient`: the full gradient is mapped across the entire bar at all times; progress is shown by how much of the bar is filled

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

## Gradient

Use `kit.gradient()` instead of `kit.color()` to apply a color gradient.  
Works with `progress` and `print` output types.

```js
kit.gradient([255, 30, 0], [180, 0, 255]).style('progress').context(75)
```

---

## License

MIT