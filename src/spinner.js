const { RESET } = require('./color');

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function spinner(prefix, text) {
    let i = 0;
    process.stdout.write('\x1b[?25l'); // 커서 숨기기

    const interval = setInterval(() => {
        process.stdout.write(`\r${prefix}${FRAMES[i % FRAMES.length]} ${text}${RESET}`);
        i++;
    }, 80);

    return {
        stop(finalText = '') {
            clearInterval(interval);
            process.stdout.write(`\r${' '.repeat(text.length + 4)}\r`);
            if (finalText) console.log(`${prefix}✔ ${finalText}${RESET}`);
            process.stdout.write('\x1b[?25h'); // 커서 복원
        }
    };
}

module.exports = { spinner };