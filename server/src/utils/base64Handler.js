const fs = require("fs");

// fungsi yang digunakan untuk merubah request base64 menjadi sebuah file
exports.base64FileHandler = (base64, action) => {
    let path;
    let filename;

    // bersihkan data base64 dari string yang tidak valid
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
    // tentukan lokasi penyimpanan file
    if (action === "Out") {
        path = `${process.cwd()}/public/attendance/time_out`;
    } else if (action === "In") {
        path = `${process.cwd()}/public/attendance/time_in`;
    } else {
        path = `${process.cwd()}/public/images`;
    }

    if (action === "Upload") {
        filename = `images-${Date.now().toString()}.jpeg`;
    } else {
        filename = `attendance-${Date.now().toString()}.jpeg`;
    }

    // jika lokasi penyimpanan tidak tersedia maka buat lokasi penyimpanan file tersebut
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    // rubah string base64 menjadi sebuah file dengan module fs.writeFile
    fs.writeFile(`${path}/${filename}`, base64Data, "base64", (error) => {
        if (error) console.log(error);
    });
    return filename;
};
