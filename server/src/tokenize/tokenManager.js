const Jwt = require("jsonwebtoken");

const tokenManager = {
    // fungsi membuat access token
    generateAccessToken(payload) {
        return Jwt.sign({ id: payload.id, fullname: payload.fullname, role: payload.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "10000" });
    },

    // fungsi membuat refresh token
    generateRefreshToken(payload) {
        return Jwt.sign({ id: payload.id, fullname: payload.fullname, role: payload.role }, process.env.JWT_REFRESH_SECRET);
    },

    // verifikasi refresh token
    verifyRefreshToken(refresh_token) {
        const decoded = Jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
        return decoded;
    },
};

module.exports = tokenManager;
