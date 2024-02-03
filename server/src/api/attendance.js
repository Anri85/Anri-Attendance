const ClientError = require("../exceptions/ClientError");

const {
    insertAttendance,
    selectAttendance,
    updateAttendance,
    removeAttendance,
    findAttendance,
    getAttendanceStatistic,
    filterAttendance,
    getAttendanceCreatedAt,
    exportAttendance,
} = require("../services/attendanceService");

const { base64FileHandler } = require("../utils/base64Handler");
const { PDFHandler } = require("../utils/PDFHandler");

// mengambil list attendance oleh user
exports.getAttendanceList = async (req, res) => {
    try {
        if (req.decoded.role === "Super admin" || req.decoded.role === "Admin") {
            const page = Number(req.query.page) || 0;
            const limit = Number(req.query.limit) || 5;
            const offset = limit * page;

            if (req.params.filter !== "nothing") {
                const arr = req.params.filter.split(",");
                const { attendance, totalRows } = await filterAttendance(arr, limit, offset);
                const totalPage = Math.ceil(totalRows / limit);
                return res.status(200).json({ message: "Success", status: true, data: attendance, page, limit, totalPage });
            }

            const { attendance, totalRows } = await selectAttendance(null, limit, offset);
            const totalPage = Math.ceil(totalRows / limit);
            return res.status(200).json({ message: "Success", status: true, data: attendance, page, limit, totalPage });
        }
        return res.status(403).json({ message: "Forbidden to access this resource", status: false });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

exports.getDetailAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const detailAttendance = await findAttendance(id);
        return res.status(200).json({ message: "Success", status: true, data: detailAttendance });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// get detail attendance by specific user
exports.getUserAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 5;
        const offset = limit * page;

        const { attendance, totalRows } = await selectAttendance(id, limit, offset);
        const totalPage = Math.ceil(totalRows / limit);
        return res.status(200).json({ message: "Success", status: true, data: attendance, page, limit, totalPage });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// membuat kehadiran atau mengupdate kehadiran yang ada
exports.createAttendance = async (req, res) => {
    let filename;

    const { id } = req.params;
    const rawDate = new Date();
    try {
        // cek jika id attendance tersedia (sudah pernah absen time_in)
        if (id) {
            // jika tersedia maka lakukan update attendance berdasarkan id tersebut
            filename = base64FileHandler(req.body.base64, req.body.action);
            const attendanceCreatedAt = await getAttendanceCreatedAt(id);

            // membuat perhitungan lamanya jam kerja karyawan dalam satu hari
            const start = new Date(attendanceCreatedAt);
            const end = new Date();
            const millsec = end - start;
            const hours = Math.floor((millsec % 86400000) / 3600000);
            const minutes = Math.round(((millsec % 86400000) % 3600000) / 60000);
            const workingHours = `${hours} Hours ${minutes} Minutes`;

            const attendanceId = await updateAttendance(
                id,
                {
                    status: "Unattended",
                    time_out: rawDate.toLocaleString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    }),
                    attendance_image_out: filename,
                    workingHours,
                },
                { isUpdate: false }
            );
            return res.status(201).json({ message: "Success", status: true, data: { id: attendanceId } });
        }
        // jika tidak tersedia maka create attendance baru (belum absen pada hari itu) juga proses string base64 dari frontend
        filename = base64FileHandler(req.body.base64, req.body.action);
        const data = await insertAttendance({
            status: "Attended",
            fullname: req.decoded.fullname,
            time_in: rawDate.toLocaleString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }),
            time_out: "",
            attendance_image_in: filename,
            attendance_image_out: "",
            user_id: req.decoded.id,
        });
        return res.status(201).json({ message: "Success", status: true, data });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// admin dan super admin dapat mengupdate attendance
exports.editAttendance = async (req, res) => {
    try {
        const { role } = req.decoded;
        // cek apakah user yang mengedit attendance merupakan admin atau super admin
        if (role === "Admin" || role === "Super admin") {
            // ambil id attendance
            const { id } = req.params;
            // update attendance berdasarkan id
            await updateAttendance(id, req.body, { isUpdate: true });
            return res.status(200).json({ message: "Success", status: true });
        }
        return res.status(403).json({ message: "Forbidden to access this resource", status: false });
    } catch (error) {
        console.log(error);
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

// admin dan seuper admin dapat menghapus attendance
exports.deleteAttendance = async (req, res) => {
    try {
        // ambil id attendance dan role user
        const { id } = req.params;
        const { role } = req.decoded;
        // hapus attendance berdasarkan id
        await removeAttendance(id, role);
        return res.status(200).json({ message: "Success", status: true });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

exports.attendanceAnalysis = async (req, res) => {
    try {
        const { users, absences, completed } = await getAttendanceStatistic();
        const withoutExp = Number(users) - Number(absences);
        return res.status(200).json({ message: "success", status: true, data: { users, absences, completed, withoutExp } });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

exports.createpdf = async (req, res) => {
    try {
        const attendance = await exportAttendance();
        PDFHandler(attendance);
        return res.status(201).json({ message: "PDF berhasil dibuat", status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};
