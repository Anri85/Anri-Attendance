const router = require("express").Router();

const { authenticateUser, updateAccessToken, removeRefreshToken } = require("../api/authenticate");

router.post("/authentication", authenticateUser);
router.put("/authentication", updateAccessToken);
router.delete("/authentication/", removeRefreshToken);

module.exports = router;
