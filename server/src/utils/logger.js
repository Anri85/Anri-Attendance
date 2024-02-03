const winston = require("winston");
const InvariantError = require("../exceptions/InvariantError");
const fs = require("fs");

// lakukan setinterval setiap 10 menit sekali untuk menjalankan fungsi checkLogFile
setInterval(checkLogFile, 120000);

// fungsi pengecekan log file
function checkLogFile() {
    // jika terdapat log file
    if (fs.existsSync(`${process.cwd}/log/access.log`)) {
        // maka hapus log file tersebut
        fs.unlink(`${process.cwd()}/log/access.log`, (err) => {
            if (err) throw new InvariantError("Delete log file failed");
        });
    }
    // kemudian buat ulang log file baru
    fs.writeFile(`${process.cwd()}/log/access.log`, "", "utf-8", (err) => {
        if (err) throw new InvariantError("Create log file failed");
    });
}

// membuat konfigurasi winston
const logConfig = {
    // hanya menerima level http keatas
    level: "http",
    // penentuan pilihan transport
    transports: [
        // konfigurasi transport file access.log yang secara otomatis menghandle Exception dan Rejection
        new winston.transports.File({
            filename: `${process.cwd()}/log/access.log`,
            handleExceptions: true,
            prettyPrint: true,
            handleRejections: true,
        }),
    ],
    // mencegah server close saat terjadi error
    exitOnError: false,
    // konfigurasi format winston
    format: winston.format.combine(
        winston.format.timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        winston.format.printf(
            (info) =>
                `| 🏷️ LEVEL: ${info.level}%TIMESTAMP: ${[info.timestamp]}%METHOD: ${info.message[1]}%URL: ${info.message[2]}%STATUS_CODE: ${info.message[3]}%ACCESS_BY: ${
                    info.message[4]
                }`
        )
    ),
};

// membuat fungsi logger yang akan dipasangkan pada middleware server
const logger = winston.createLogger(logConfig);

module.exports = logger;
