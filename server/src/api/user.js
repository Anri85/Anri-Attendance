const ClientError = require("../exceptions/ClientError");

const { addUser, selectUsers, selectSingleUser, selectSingleAnotherUser, deleteUser, updateUser, changeProfile } = require("../services/userService");
const { base64FileHandler } = require("../utils/base64Handler");

exports.getAllUsers = async (req, res) => {
    try {
        const { fullname } = req.query;
        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 5;
        const offset = limit * page;

        // jika user yang mengakses adalah super admin atau admin maka akses tersebut diberikan
        if (req.decoded.role === "Super admin" || req.decoded.role === "Admin") {
            const { users, totalRows } = await selectUsers(fullname, limit, offset);
            const totalPage = Math.ceil(totalRows / limit);
            return res.status(200).json({ message: "Success", status: true, data: users, page, limit, totalPage });
        }
        // jika user yang mengakses bukan super admin atau admin maka akses dilarang
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

exports.getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.decoded.id;
        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 5;
        const offset = limit * page;

        // jika terdapat parameter id maka cari user berdasarkan id tersebut
        if (id) {
            const { data, totalRows } = await selectSingleAnotherUser(id, limit, offset);
            const totalPage = Math.ceil(totalRows / limit);
            return res.status(200).json({ message: "Success", status: true, data, page, limit, totalPage });
        } else {
            // jika tidak ada maka cari user berdasarkan user yang sedang login
            const user = await selectSingleUser(userId);
            return res.status(200).json({ message: "Success", status: true, data: user });
        }
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

exports.createUser = async (req, res) => {
    try {
        // jika user yang mengakses bukan super admin maka akses tersebut dilarang
        if (req.decoded.role !== "Super admin") {
            return res.status(403).json({ message: "Forbidden to access this resource", status: false });
        }
        // jika user merupakan super admin maka diperbolehkan mengakses resource
        const userId = await addUser(req.decoded.role, req.body, req.file.filename);
        return res.status(201).json({ message: "Success", status: true, data: userId });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};

exports.editUser = async (req, res) => {
    try {
        if (req.decoded.role === "Super admin" || req.decoded.role === "Admin") {
            // jika user yang melakukan update adalah super admin
            const { fullname, role, division, position, gender } = req.body;
            // ambil id user lain
            const { id } = req.params;
            // maka user tersebut dapat mengupdate sebagian besar data dan user lain
            await updateUser(id, req.decoded.id, req.decoded.role, { fullname, role, division, position, gender });
            return res.status(200).json({ message: "Success", status: true });
        }
        // jika user yang melakukan pengeditan bukan super admin hanya bisa melakukan update terhadap dirinya sendiri dan mengganti gambar
        const { image_url } = req.body;
        await updateUser(req.decoded.id, req.decoded.role, image_url);
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

exports.removeUser = async (req, res) => {
    try {
        // jika user yang mengakses bukan super admin maka akses tersebut dilarang
        if (req.decoded.role !== "Super admin") {
            return res.status(403).json({ message: "Forbidden to access this resource", status: false });
        }
        // jika user merupakan super admin maka diperbolehkan mengakses resource dan menghapus user
        const { id } = req.params;
        await deleteUser(id);
        return res.status(200).json({ message: "Success", status: true });
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

exports.uploadImage = async (req, res) => {
    try {
        const { id } = req.decoded;
        // jika ada file yang diupload berasal dari webcam
        if (req.body.base64) {
            const filename = base64FileHandler(req.body.base64, req.body.action);
            await changeProfile(id, filename);
            return res.status(200).json({ message: "Success", status: true });
        }
        // jika ada file yang diupload bukan berasal dari webcam
        if (req.file) {
            const image = req.file.filename;
            // update imagge_url user yang melakukan upload tersebut
            await changeProfile(id, image);
            return res.status(200).json({ message: "Success", status: true });
        }
        return res.status(400).json({ message: "No file uploaded", status: false });
    } catch (error) {
        // jika error merupakan kesalahan pengguna
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({ message: error.message, status: false });
        }
        // jika server mengalami error
        return res.status(500).json({ message: "Something went wrong", status: false });
    }
};
