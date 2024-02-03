const fs = require("fs");

// fungsi untuk membaca file access.log
exports.readFileLog = (req, res) => {
    const data = fs.readFileSync(`${process.cwd()}/log/access.log`, "utf-8");
    const logs = data.split("|");
    logs.shift();
    return res.status(200).json({ message: "Success", status: true, data: logs });
};
