# @kljj04/cli-kit — AI Reference

This file is structured for AI assistants to quickly understand the API.

## Package

- Name: `@kljj04/cli-kit`
- Install: `npm install @kljj04/cli-kit`
- Require: `const kit = require('@kljj04/cli-kit')`
- Zero dependencies.

---

## API Pattern

Every call follows this exact chain:

```
kit.color(r, g, b).style(...args).context(value)
```

- `color(r, g, b)` — RGB integers 0–255
- `style(...args)` — any mix of text styles + one output type
- `context(value)` — the content to render

---

## style() arguments

### Text styles (combinable)
- `'bold'`
- `'dim'`
- `'italic'`
- `'underline'`
- `'inverse'`
- `'strikethrough'`

### Output types (pick one)
- `'print'` — default, plain styled text
- `'box'` — Unicode border box
- `'spinner'` — animated spinner, returns `{ stop(text?) }`
- `'progress'` — progress bar, accepts number 0–100
- `'table'` — table from array of objects
- `'override'` — modifier for progress, overwrites current line (use with `'progress'`)

---

## Usage Examples

### print
```js
kit.color(255, 100, 50).style('bold').context('Hello!')
kit.color(255, 100, 50).style('italic', 'print').context('Hello!')
```

### box
```js
kit.color(100, 200, 255).style('box').context('Hello!')
kit.color(100, 200, 255).style('bold', 'box').context('Line 1\nLine 2')
```

### spinner
```js
const s = kit.color(0, 255, 200).style('spinner').context('Loading...')
s.stop('Done!')  // stop and print final message
s.stop()         // stop silently
```

### progress
```js
// static
kit.color(255, 200, 0).style('progress').context(72)

// live (overwrites same line)
kit.color(255, 200, 0).style('progress', 'override').context(i)
```

### table
```js
kit.color(200, 150, 255).style('table').context([
    { name: 'Alice', score: 100 },
    { name: 'Bob',   score: 80  },
])
```

### multiline chaining
```js
kit
  .color(0, 255, 100)
  .style('bold', 'box')
  .context('Hello!')
```

---

## Common Patterns

### Spinner with async task
```js
const s = kit.color(100, 200, 255).style('spinner').context('Fetching...')
await someAsyncTask()
s.stop('Fetched!')
```

### Animated progress bar
```js
let i = 0
const iv = setInterval(() => {
    i++
    kit.color(0, 255, 150).style('progress', 'override').context(i)
    if (i >= 100) clearInterval(iv)
}, 30)
```

### Boot sequence style UI
```js
kit.color(0, 255, 100).style('bold', 'box').context('Starting...')
const s = kit.color(100, 200, 255).style('spinner').context('Loading...')
setTimeout(() => {
    s.stop('Done!')
    kit.color(0, 255, 100).style('table').context([
        { module: 'core', status: 'OK' }
    ])
}, 1500)
```

---

## Notes for AI

- There is no standalone `kit.print()` shorthand — always use the full chain.
- `style()` with no output type defaults to `'print'`.
- `spinner` returns an object — always store the return value to call `.stop()`.
- `progress` with `'override'` uses `\r` to overwrite — do not mix with other console output mid-progress.
- All colors are RGB truecolor — no hex, no named colors.
- No external dependencies — safe to use anywhere.
