const readline = require('readline');
const kit = require('../index');

/**
 * Advanced Example: Interactive Menu Inside a Box
 * Features:
 * - Fancy double cursor (" >> ") only on selected item
 * - Background color applied ONLY to the label text
 * - Perfect box alignment (5-character offset)
 */

function getWidth(str) {
    let width = 0;
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code >= 0xD800 && code <= 0xDBFF) { width += 2; i++; continue; }
        if ((code >= 0x1100 && code <= 0x11ff) || (code >= 0x2e80 && code <= 0xa4cf) || (code >= 0xac00 && code <= 0xd7af) || (code >= 0xf900 && code <= 0xfaff) || (code >= 0xff00 && code <= 0xff60) || (code >= 0x2000 && code <= 0x32ff)) {
            width += 2;
        } else { width += 1; }
    }
    return width;
}

async function showBoxedMenu(title, options) {
    return new Promise((resolve) => {
        let currentIndex = 0;
        const stdout = process.stdout;
        const stdin = process.stdin;

        // "  >> " (5 chars) + label + " " (1 char)
        const contentWidths = [title, ...options.map(o => `     ${o.label} `)].map(getWidth);
        const maxContentWidth = Math.max(...contentWidths);
        const boxWidth = maxContentWidth + 2;

        const topBorder    = `┌${'─'.repeat(boxWidth)}┐`;
        const middleBorder = `├${'─'.repeat(boxWidth)}┤`;
        const bottomBorder = `└${'─'.repeat(boxWidth)}┘`;

        console.log('\n');
        
        // 1. Draw Header
        kit.color(100, 200, 255).style('bold').context(topBorder);
        const titlePadding = ' '.repeat(boxWidth - getWidth(title) - 1);
        kit.color(100, 200, 255).style('bold').context(`│ ${title}${titlePadding}│`);
        kit.color(100, 200, 255).style('bold').context(middleBorder);

        stdout.write('\x1b[?25l');
        readline.emitKeypressEvents(stdin);
        if (stdin.isTTY) stdin.setRawMode(true);

        const render = (first = false) => {
            if (!first) readline.moveCursor(stdout, 0, -options.length);

            options.forEach((opt, index) => {
                readline.clearLine(stdout, 0);
                readline.cursorTo(stdout, 0);

                const isSelected = index === currentIndex;
                const cursor = isSelected ? ' > ' : '   '; // 5 characters total
                const label = `${opt.label} `;
                
                const currentWidth = getWidth(cursor + label);
                const padding = ' '.repeat(boxWidth - currentWidth - 1);

                // Left Border (Blue)
                stdout.write(`\x1b[1m\x1b[38;2;100;200;255m│ \x1b[0m`);

                if (isSelected) {
                    const bg = opt.bg;
                    // Cursor (No Background)
                    stdout.write(cursor);
                    // Label (With Background)
                    stdout.write(`\x1b[1m\x1b[38;2;40;40;40m\x1b[48;2;${bg[0]};${bg[1]};${bg[2]}m${label}\x1b[0m`);
                } else {
                    stdout.write(cursor + label);
                }

                // Padding + Right Border
                stdout.write(`${padding}\x1b[1m\x1b[38;2;100;200;255m│\x1b[0m\n`);
            });
        };

        render(true);
        kit.color(100, 200, 255).style('bold').context(bottomBorder);

        const onKeypress = (str, key) => {
            if (!key) return;
            if (key.name === 'up') {
                currentIndex = (currentIndex - 1 + options.length) % options.length;
                readline.moveCursor(stdout, 0, -1);
                render();
                stdout.write('\n');
            } else if (key.name === 'down') {
                currentIndex = (currentIndex + 1) % options.length;
                readline.moveCursor(stdout, 0, -1);
                render();
                stdout.write('\n');
            } else if (key.name === 'return') {
                stdout.write('\x1b[?25h');
                cleanup();
                resolve(options[currentIndex]);
            } else if (key.ctrl && key.name === 'c') {
                stdout.write('\x1b[?25h');
                process.exit();
            }
        };

        const cleanup = () => {
            stdin.removeListener('keypress', onKeypress);
            if (stdin.isTTY) stdin.setRawMode(false);
            stdin.pause();
        };

        stdin.on('keypress', onKeypress);
        stdin.resume();
    });
}

async function start() {
    const paletteOptions = [
        { label: 'Pastel Blue (Aesthetic)', bg: [173, 216, 230] },
        { label: 'Mint Green (Fresh)',       bg: [152, 255, 152] },
        { label: 'Soft Pink (Cherry)',      bg: [255, 182, 193] },
        { label: 'Lavender (Calm)',         bg: [230, 190, 255] }
    ];

    const choice = await showBoxedMenu('SELECT YOUR THEME', paletteOptions);

    console.log('\n');
    kit
      .bgColor(choice.bg[0], choice.bg[1], choice.bg[2])
      .color(40, 40, 40)
      .style('bold', 'box')
      .context(` Applied: ${choice.label} `);
}

start();
