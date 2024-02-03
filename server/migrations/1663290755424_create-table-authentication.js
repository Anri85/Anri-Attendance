/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("tokens", {
        refresh_token: {
            type: "TEXT",
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("tokens");
};
