const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);



module.exports = class ProductHandler {

    constructor() {
        this.client = new MongoClient(uri);
        this.client.connect()
            .then(() => process.on("exit", () => this.client.close()))
    }


    async getAllProducts() {
        const database = client.db("EVS");
        const collection = database.collection("Products");

        const cursor = await collection.aggregate();
        let output = [];

        for await (let i of cursor) {
            output.push(i);
        }

        return output;
    }

    async getProductById(id) {
        const database = client.db("EVS");
        const collection = database.collection("Products");

        const output = await collection.findOne({ "_id": new ObjectId(id) });

        return output;
    }

    async getProductsByCategory(id = '\0') {
        const database = client.db("EVS");
        const collection = database.collection("Products");

        const cursor = await collection.aggregate();
        let output = [];


        for await (let i of cursor) {
            for (let p in i.categories) {
                if (String(i.categories[p]) == id)
                  output.push(i);
            }
        }

        return output;
    }

    async addProduct(c) {
        const database = client.db("EVS");
        const collection = database.collection("Products");

        const output = await collection.insertOne({ "name": c.name, "price": c.price, "details": c.details, "categories": c.categories });

        return output;
    }

    async updateProduct(id, c) {
        const database = client.db("EVS");
        const collection = database.collection("Products");

        const output = await collection.updateOne(
            { "_id": new ObjectId(id) },
            { $set: { "name": c.name, "price": c.price, "details": c.details, "categories": c.categories, "reviews": c.reviews } }
        );

        return output;
    }

    async deleteProductById(id) {

        const database = client.db("EVS");
        const collection = database.collection("Products");

        const output = await collection.deleteOne({ "_id": new ObjectId(id) });

        return output;
    }

}