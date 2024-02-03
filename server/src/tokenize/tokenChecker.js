const Jwt = require("jsonwebtoken");

const tokenChecker = (req, res, next) => {
    // ambil access token pada request headers
    const access_token = req.headers.authorization.split(" ")[1];
    // jika terdapat access token maka verifikasi access token
    if (access_token) {
        Jwt.verify(access_token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
            // jika access token expired maka kembalikan sebuah error
            if (err) {
                return res.status(401).json({ message: "Unauthorized access.", status: false });
            }
            // jika access token tidak expired maka decode access token tersebut
            req.decoded = decoded;
            next();
        });
    } else {
        // jika tidak terdapat access token pada request header
        return res.status(403).send({
            message: "No token provided.",
            status: false,
        });
    }
};

module.exports = tokenChecker;
