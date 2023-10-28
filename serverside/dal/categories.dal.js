const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

module.exports = class CategoryHandler {
    constructor() {
        this.client = new MongoClient(uri);
        this.client.connect()
            .then(()=> process.on("exit", () => this.client.close()))
    }

    async getCategory(id) {
        const database = this.client.db("EVS");
        const collection = database.collection("Categories");

        const output = await collection.findOne({ "_id": new ObjectId(id) });

        return output;
    }

    async getAllCategories() {
        const database = this.client.db("EVS");
        const collection = database.collection("Categories");

        let output = [];
        const cursor = collection.aggregate();
        for await (const c of cursor)
            output.push(c);

        return output;
    }

    async getCategoryByName(name = '\0') {

        const database = this.client.db("EVS");
        const collection = database.collection("Categories");

        const output = await collection.aggregate({ "name": name });

        return output;
    }

    async getChildren(id) {

        const database = this.client.db("EVS");
        const collection = database.collection("Categories");

        const parent = await collection.findOne({ "_id": new ObjectId(id) });

        let output;
        if (parent)
            output = await collection.aggregate({ "parentID": new ObjectId(id) });
        else
            output = null;

        return output;
    }

    async getTopMostCategories() {

        const database = this.client.db("EVS");
        const collection = database.collection("Categories");

        let output = []
        const cursor = await collection.aggregate([{ $match: { "parent": null } }]);
        for await (const c of cursor)
            output.push(c);

        return output;
    }

    async addCategory(c) {
        const database = this.client.db("EVS");
        const collection = database.collection("Categories");
        
        const output = await collection.insertOne({ "name": c.name, "parent": c.parent });

        return output;
    }

    async updateCategory(id, c) {

        const database = this.client.db("EVS");
        const collection = database.collection("Categories");

        const output = await collection.updateOne({ "_id": new ObjectId(id) }, { $set: { "name": c.name, "parent": c.parent } });

        return output;
    }

    async deleteCategoryById(id) {

        const database = this.client.db("EVS");
        const collection = database.collection("Categories");

        const output = await collection.deleteOne({ "_id": new ObjectId(id) });

        return output;
    }
}