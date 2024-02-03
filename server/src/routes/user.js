const router = require("express").Router();
// import upload handler
const upload = require("../utils/uploadHandler");
// import access token checker
const tokenChecker = require("../tokenize/tokenChecker");
// import handler request
const { getAllUsers, createUser, editUser, removeUser, uploadImage, getSingleUser } = require("../api/user");

router.get("/list/", tokenChecker, getAllUsers);
router.get("/single/:id?", tokenChecker, getSingleUser);
router.post("/create", tokenChecker, upload.single("images"), createUser);
router.put("/update/:id?", tokenChecker, editUser);
router.delete("/delete/:id?", tokenChecker, removeUser);

// upload image users
router.post("/upload", tokenChecker, upload.single("images"), uploadImage);

module.exports = router;
