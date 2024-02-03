const { Pool } = require("pg");
const pool = new Pool();

// import exceptions
const InvariantError = require("../exceptions/InvariantError");
const ClientError = require("../exceptions/ClientError");

// menyimpan refresh token kedalam database
const saveRefreshToken = async (refresh_token) => {
    const order = {
        text: "INSERT INTO tokens VALUES($1) RETURNING refresh_token",
        values: [refresh_token],
    };
    const result = await pool.query(order);
    if (!result.rowCount) {
        throw new InvariantError("Failed to save access token");
    }
};

// mencari ketersediaan refresh token dalam database untuk pembuatan jwt yang baru
const findRefreshToken = async (refresh_token) => {
    const order = {
        text: "SELECT refresh_token FROM tokens WHERE refresh_token = $1",
        values: [refresh_token],
    };
    const result = await pool.query(order);
    if (!result.rowCount) {
        throw new ClientError("Refresh token not found", 406);
    }
};

// jika pengguna telah logout, hapus refresh token pada database
const deleteRefreshToken = async (refresh_token) => {
    // cek ketersediaan token
    await findRefreshToken(refresh_token);
    // hapus token
    const order = {
        text: "DELETE FROM tokens WHERE refresh_token = $1",
        values: [refresh_token],
    };
    await pool.query(order);
};

module.exports = { saveRefreshToken, findRefreshToken, deleteRefreshToken };
