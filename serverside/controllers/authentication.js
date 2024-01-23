const jwt = require("jsonwebtoken");
const UserHandler = require("../dal/users.dal");
const handler = new UserHandler();
require("dotenv").config();

module.exports = async function authenticate(req, res) {
    const token = req.headers['x-auth-token'];
    if (token)
        try {
            const tokenContents = jwt.verify(token, process.env.JWTKEY);
            const user = await handler.getUserById(tokenContents.userId)
                .catch(err => res.status(500).send({ "success": false, "msg": "Invalid User ID" }));

            if (user === null)
                res.status(400).send({ "success": false, "msg": "User not Found" });
        }
        catch
        {
            res.status(400).send({ "success": false, "msg": "Invalid Token" });
        }
    else
        res.status(400).send({ "success": false, "msg": "Token Missing" });
};