const pdf = require("html-pdf");
const PDFTemplate = require("./PDFTemplate");

exports.PDFHandler = (attendance) => {
    pdf.create(PDFTemplate(attendance), {
        orientation: "landscape",
        type: "pdf",
    }).toFile("result.pdf", (err) => {
        if (err) return false;
        return true;
    });
};
