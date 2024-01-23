const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 3;

module.exports = class UserHandler {
    constructor() {
        this.client = new MongoClient(url);
        this.client.connect().then
            (() => process.on("exit", () => this.client.close()));
    }

    async getUserById(id) {
        const database = client.db("EVS");
        const collection = database.collection("Users");

        const output = await collection.findOne({ "_id": new ObjectId(id) });

        return output;
    }

    async getUserByToken(req, res) {
        const token = jwt.verify(req.headers['x-auth-token'], process.env.JWTKEY);
        if (!token) 
            return res.status(400).send({"success": false, "msg": "Token Missing"});

        const database = client.db("EVS");
        const collection = database.collection("Users");

        const output = await collection.findOne({ "_id": new ObjectId(token.userId) });
        if (output === null)
            res.status(400).send({ "success": false, "msg": "User Not Found" });
        else
            res.status(200).send({ "success": true, "username": output.username });
    }

    async login(req, res) {
        const database = client.db("EVS");
        const collection = database.collection("Users");

        // validation 
        if (!req.body.username || !req.body.password || !(req.body.username === String(req.body.username)) || !(req.body.password === String(req.body.password)))
            return res.status(400).send({ "success": false, "msg": "Bad Request :/" });

        const corrUser = await collection.findOne({ "username": req.body.username });
        if (!corrUser)
            return res.status(400).send({ "success": false, "msg": "Invalid Username" });

        if (await bcrypt.compare(req.body.password, corrUser.password)) {
            const token = jwt.sign({ "userId": corrUser._id }, process.env.JWTKEY, { expiresIn: 60 * 60 });
            res.status(200).send({ "success": true, "username": corrUser.username, "token": token });
        }
        else
            return res.status(400).send({ "success": false, "msg": "Incorrect Password" });
    }

    async signup(req, res) {
        const database = client.db("EVS");
        const collection = database.collection("Users");

        // validation    
        if (!req.body.username || !req.body.password || !(req.body.username === String(req.body.username)) || !(req.body.password === String(req.body.password)))
            return res.status(400).send({ "success": false, "msg": "All fields must be filled" });

        const corrUser = await collection.findOne({ "username": req.body.username });
        if (corrUser)
            return res.status(400).send({ "success": false, "msg": "Username Already in Use" });;

        // encryption
        bcrypt.hash(req.body.password, saltRounds)
            .then((hash) => {
                collection.insertOne({ 'username': req.body.username, 'password': hash })
                    .then(out => res.status(200).send(Object.assign({ "success": true }, out)))
                    .catch(err => res.status(500).send(Object.assign({ "success": false }, err)));
            })
            .catch((err) => {
                res.status(500).send({ "success": false }, err);
            });
    }
}   