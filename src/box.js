const { RESET } = require('./color');

function getWidth(str) {
    let width = 0;
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        // 한글 및 전각 문자 범위 체크 (대략적인 범위)
        if (code >= 0x1100 && (
            code <= 0x11ff || 
            (code >= 0x3130 && code <= 0x318f) || 
            (code >= 0xac00 && code <= 0xd7af) ||
            (code >= 0xff01 && code <= 0xff60)
        )) {
            width += 2;
        } else {
            width += 1;
        }
    }
    return width;
}

function box(prefix, text) {
    const lines = String(text).split('\n');
    const maxLen = Math.max(...lines.map(l => getWidth(l)));
    const horizontal = '─'.repeat(maxLen + 2);

    console.log(`${prefix}┌${horizontal}┐${RESET}`);
    lines.forEach(line => {
        const currentWidth = getWidth(line);
        const pad = ' '.repeat(maxLen - currentWidth);
        console.log(`${prefix}│ ${line}${pad} │${RESET}`);
    });
    console.log(`${prefix}└${horizontal}┘${RESET}`);
}

module.exports = { box };