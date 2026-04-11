const { RESET } = require('./color');

function renderBar(prefix, pct) {
    const width = 30;
    const filled = Math.round((pct / 100) * width);
    const empty = width - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return `${prefix}[${bar}] ${pct}%${RESET}`;
}

function progress(prefix, value) {
    if (typeof value === 'object' && value !== null && value.live) {
        const pct = Math.min(100, Math.max(0, Number(value.value)));
        process.stdout.write(`\r${renderBar(prefix, pct)}`);
        if (pct >= 100) process.stdout.write('\n');
    } else {
        const pct = Math.min(100, Math.max(0, Number(value)));
        console.log(renderBar(prefix, pct));
    }
}

module.exports = { progress };