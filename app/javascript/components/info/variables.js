const bp = require("utility/bp");
const {micro, small, medium} = require("sizes");

module.exports = function() {
    return {
        HEADER_HEIGHT: bp({
            [small]: 50,
            [medium]: 58,
            defaults: 66
        }),
        FOOTER_HEIGHT: bp({
            [small]: 70,
            [medium]: 80,
            defaults: 90
        })
    };
};
