const { RESET } = require('./color');

function box(prefix, text) {
    const lines = String(text).split('\n');
    const maxLen = Math.max(...lines.map(l => l.length));
    const horizontal = '─'.repeat(maxLen + 2);

    console.log(`${prefix}┌${horizontal}┐${RESET}`);
    lines.forEach(line => {
        const pad = ' '.repeat(maxLen - line.length);
        console.log(`${prefix}│ ${line}${pad} │${RESET}`);
    });
    console.log(`${prefix}└${horizontal}┘${RESET}`);
}

module.exports = { box };