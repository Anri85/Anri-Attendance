const multer = require("multer");
const path = require("path");

const InvariantError = require("../exceptions/InvariantError");

// setting lokasi penyimpanan gambar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now().toString() + "-" + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return cb(new InvariantError("Only images are allowed"));
        }
        cb(null, true);
    },
});

module.exports = upload;
