const { verifyUser } = require("../services/userService");
const { saveRefreshToken, findRefreshToken, deleteRefreshToken } = require("../services/authenticationService");
const ClientError = require("../exceptions/ClientError");
const tokenManager = require("../tokenize/tokenManager");

// ketika user melakukan LOGIN
exports.authenticateUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // cek kredensial user berdasarkan username dan password
        const { id, fullname, role } = await verifyUser({ username, password });
        // kemudian buat accessToken dan refreshToken
        const access_token = tokenManager.generateAccessToken({ id, fullname, role });
        const refresh_token = tokenManager.generateRefreshToken({ id, fullname, role });
        // simpan refresh token kedalam database
        await saveRefreshToken(refresh_token);
        return res.status(200).json({ message: "Success", status: true, data: { access_token, refresh_token, role, id, fullname } });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ status: false, message: error.message });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// ketika user meminta acccess token baru berdasarkan refresh_token
exports.updateAccessToken = async (req, res) => {
    try {
        // ambil data headers
        const refresh_token = req.headers.refresh_token;
        // verifikasi apakah refresh token tersimpan dalam database
        await findRefreshToken(refresh_token);
        // jika tersedia, decode refresh token sehingga menghasilkan data user
        const userData = tokenManager.verifyRefreshToken(refresh_token);
        const access_token = tokenManager.generateAccessToken(userData);
        return res.status(201).json({ message: "Success generate new access token", access_token });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ status: false, message: error.message });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// ketika user melakukan LOGOUT
exports.removeRefreshToken = async (req, res) => {
    try {
        // ambil data headers
        const refresh_token = req.headers.refresh_token;
        // verifikasi apakah refresh token tersedia dalam database
        await findRefreshToken(refresh_token);
        // jika refresh token tersedia maka hapus dalam database
        await deleteRefreshToken(refresh_token);
        return res.status(200).json({ message: "Success delete refresh token", status: true });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};
