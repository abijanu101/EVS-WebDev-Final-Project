const express = require("express");
const router = express.Router();
const authenticate = require("../controllers/authentication.js");
const UserHandler = require("../dal/users.dal.js");
const handler = new UserHandler();

router.post("/login", (req, res) => handler.login(req, res));
router.post("/signup", (req, res) => handler.signup(req, res));
router.get("/getUsername", (req, res) => handler.getUserByToken(req,res));
router.get("/isLoggedIn", async (req, res) => {
    await authenticate(req,res); 
    if (res.destroyed == false)
        res.status(200).send({"success": true, "msg": "User Logged In"});
});

module.exports = router;