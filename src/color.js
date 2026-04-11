const STYLES = {
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    inverse: '\x1b[7m',
    strikethrough: '\x1b[9m',
};

const RESET = '\x1b[0m';

function rgb(r, g, b) {
    return `\x1b[38;2;${r};${g};${b}m`;
}

function bgRgb(r, g, b) {
    return `\x1b[48;2;${r};${g};${b}m`;
}

class KitBuilder {
    constructor() {
        this._r = 255;
        this._g = 255;
        this._b = 255;
        this._styles = [];
        this._outputType = 'print';
    }

    color(r, g, b) {
        this._r = r;
        this._g = g;
        this._b = b;
        return this;
    }

    style(...args) {
        const outputTypes = ['print', 'box', 'spinner', 'progress', 'table'];
        args.forEach(arg => {
            if (outputTypes.includes(arg)) {
                this._outputType = arg;
            } else if (STYLES[arg]) {
                this._styles.push(arg);
            }
        });
        return this;
    }

    _buildPrefix() {
        const colorCode = rgb(this._r, this._g, this._b);
        const styleCodes = this._styles.map(s => STYLES[s]).join('');
        return `${colorCode}${styleCodes}`;
    }

    context(value) {
        const prefix = this._buildPrefix();
        switch (this._outputType) {
            case 'print':
                require('./print').print(prefix, value);
                break;
            case 'box':
                require('./box').box(prefix, value);
                break;
            case 'spinner':
                return require('./spinner').spinner(prefix, value);
            case 'progress':
                require('./progress').progress(prefix, value);
                break;
            case 'table':
                require('./table').table(prefix, value);
                break;
        }
        // reset for next use
        this._styles = [];
        this._outputType = 'print';
    }
}

module.exports = { KitBuilder, rgb, bgRgb, STYLES, RESET };