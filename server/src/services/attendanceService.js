const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const fs = require("fs");
const pool = new Pool();

// import exceptions
const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");

// select attendance
const selectAttendance = async (id, limit, offset) => {
    // jika terdapat parameter id ambil detail attendance beserta user yang melakukannya
    if (id !== null) {
        // merancang perintah query
        const order1 = {
            text: `SELECT * FROM attendance WHERE user_id = $1 ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
            values: [id],
        };
        // mengeksekusi query
        const result = await pool.query(order1);
        const order2 = {
            text: `SELECT COUNT(id) FROM attendance WHERE user_id = $1`,
            values: [id],
        };
        const countRows = await pool.query(order2);
        if (!result.rowCount) {
            throw new NotFoundError("Attendance not found");
        }
        return { attendance: result.rows, totalRows: countRows.rows[0].count };
    } else {
        // jika tidak terdapat id maka ambil seluruh data attendance
        const countRows = await pool.query("SELECT COUNT(id) FROM attendance");
        const result = await pool.query(`SELECT * FROM attendance ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
        return { attendance: result.rows, totalRows: countRows.rows[0].count };
    }
};

// mencari attendance berdasarkan id
const findAttendance = async (id) => {
    const order = {
        text: `SELECT users.id AS user_id, users.fullname, users.division, users.position, users.role, attendance.id, attendance.date, attendance.status, attendance.time_in,
        attendance.time_out, attendance.attendance_image_in, attendance.attendance_image_out, attendance.number_of_working_hours FROM attendance JOIN users ON users.id = attendance.user_id WHERE attendance.id = $1`,
        values: [id],
    };
    const result = await pool.query(order);
    if (!result.rowCount) {
        throw new NotFoundError("Attendance not found");
    }
    return result.rows[0];
};

const filterAttendance = async (arr, limit, offset) => {
    const order1 = {
        text: `SELECT * FROM attendance WHERE ${arr[0]} = $1 ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`,
        values: [arr[1]],
    };
    const order2 = {
        text: `SELECT COUNT(id) FROM attendance WHERE ${arr[0]} = $1`,
        values: [arr[1]],
    };
    const result = await pool.query(order1);
    const countRows = await pool.query(order2);
    return { attendance: result.rows, totalRows: countRows.rows[0].count };
};

// membuat attendance
const insertAttendance = async (data) => {
    const id = `attendance-${nanoid(16)}`;
    // merancang perintah query
    const order = {
        text: "INSERT INTO attendance VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        values: [id, data.fullname, data.status, data.time_in, data.time_out, data.attendance_image_in, data.attendance_image_out, data.user_id],
    };
    // mengeksekusi query
    const result = await pool.query(order);
    if (!result.rows[0].id) {
        throw new InvariantError("Attendace creation failed");
    }
    return result.rows[0];
};

// mengubah attendance sebelumnya
const updateAttendance = async (id, data, { isUpdate }) => {
    // jika isUpdate bernilai true maka attendance tersebut dirubah oleh seorang admin atau super admin
    if (isUpdate) {
        // jika data status tidak bernilai sama dengan data prevStatus
        if (data.status !== data.prevStatus) {
            // maka artinya status attendance dirubah oleh admin dan akan menggenerate time_out secara otomatis
            data.time_out = new Date().toLocaleString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
        }
        // jika terjadi perubahan status unattended ke status attended
        if (data.time_out === "") {
            data.status = "Attended";
            // hapus file gambar time out
            fs.unlink(`${process.cwd()}/public/attendance/time_out/${data.attendance_image_out}`, (err) => {
                if (err) throw new InvariantError("Attendance change failed");
            });
            data.attendance_image_out = "";
            data.workingHours = null;
        }
        // merancang perintah query
        const order = {
            text: "UPDATE attendance SET status = $1, time_in = $2, time_out = $3, attendance_image_out = $4, number_of_working_hours = $5 WHERE id = $6 RETURNING id",
            values: [data.status, data.time_in, data.time_out, data.attendance_image_out, data.workingHours, id],
        };
        // mengeksekusi query
        const result = await pool.query(order);
        if (!result.rows[0].id) {
            throw new InvariantError("Attendance change failed");
        }
        return result.rows[0];
        // jika isUpdate tidak bernilai true maka user melakukan time_out
    } else {
        // merancang perintah query
        const order = {
            text: "UPDATE attendance SET status = $1, time_out = $2, attendance_image_out = $3, number_of_working_hours = $4 WHERE id = $5 RETURNING id",
            values: [data.status, data.time_out, data.attendance_image_out, data.workingHours, id],
        };
        // mengeksekusi query
        const result = await pool.query(order);
        if (!result.rows[0].id) {
            throw new InvariantError("Attendance change failed");
        }
        return result.rows[0].id;
    }
};

// delete attendance
const removeAttendance = async (id, role) => {
    // hanya admin dan super admin yang dapat menghapus attendance
    if (role === "admin" || role === "super admin") {
        const order = {
            text: "DELETE FROM attendance WHERE id = $1 RETURNING id",
            values: [id],
        };
        const result = await pool.query(order);
        if (!result.rowCount) {
            throw new InvariantError("Attendance removal failed");
        }
    }
    throw new AuthorizationError("Forbidden to access this resource");
};

const getAttendanceStatistic = async () => {
    const numberOfUsers = await pool.query("SELECT COUNT(id) FROM users");
    const numberOfAbsences = await pool.query("SELECT COUNT(id) FROM attendance WHERE date = CURRENT_DATE");
    const numberOfCompleted = await pool.query("SELECT COUNT(id) FROM attendance WHERE time_out != '' AND date = CURRENT_DATE");

    return { users: numberOfUsers.rows[0].count, absences: numberOfAbsences.rows[0].count, completed: numberOfCompleted.rows[0].count };
};

const getAttendanceCreatedAt = async (id) => {
    const order = {
        text: "SELECT created_at FROM attendance WHERE id = $1",
        values: [id],
    };
    const result = await pool.query(order);
    if (!result.rowCount) {
        throw new NotFoundError("Attendance not found");
    }
    return result.rows[0].created_at;
};

const exportAttendance = async () => {
    const result = await pool.query(
        "SELECT id, fullname, status, time_in, time_out, attendance_image_in, attendance_image_out, user_id, date, number_of_working_hours FROM attendance ORDER BY created_at DESC"
    );
    if (!result.rowCount) {
        throw new NotFoundError("Attendance not found");
    }
    return result.rows;
};

module.exports = {
    selectAttendance,
    insertAttendance,
    updateAttendance,
    findAttendance,
    removeAttendance,
    getAttendanceStatistic,
    filterAttendance,
    getAttendanceCreatedAt,
    exportAttendance,
};
