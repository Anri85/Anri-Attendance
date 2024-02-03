/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("users", {
        id: {
            type: "VARCHAR(50)",
            primaryKey: true,
        },
        fullname: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        username: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        password: {
            type: "TEXT",
            notNull: true,
        },
        recovery_pass: {
            type: "VARCHAR(50)",
        },
        role: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        division: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        position: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        gender: {
            type: "VARCHAR(50)",
            notNull: true,
        },
        image_url: {
            type: "TEXT",
        },
        created_at: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "TIMESTAMP",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("users");
};
