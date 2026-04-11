const { RESET } = require('./color');

function progress(prefix, value) {
    const pct = Math.min(100, Math.max(0, Number(value)));
    const width = 30;
    const filled = Math.round((pct / 100) * width);
    const empty = width - filled;

    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    console.log(`${prefix}[${bar}] ${pct}%${RESET}`);
}

module.exports = { progress };