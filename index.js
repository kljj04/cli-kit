const { KitBuilder } = require('./src/color');

const kit = {
    color(r, g, b) {
        return new KitBuilder().color(r, g, b);
    },
    style(...args) {
        return new KitBuilder().style(...args);
    }
};

module.exports = kit;