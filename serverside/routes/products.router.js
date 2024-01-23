const express = require("express");
const ProductHandler = require("../dal/products.dal");
const authenticate = require("../controllers/authentication.js");
const router = express.Router();
const handler = new ProductHandler();

router.get('/', async (req, res) => {
    handler.getAllProducts()
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(400).send({ "msg": "Not found" });
        })
        .catch(err => console.log(err));
});

router.get('/:id', async (req, res) => {
    handler.getProductById(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(400).send({ "msg": "Not found" });
        })
        .catch(err => res.status(400).send({"success": false, "msg": err}));
});

router.get('/c/:id', async (req, res) => {
    handler.getProductsByCategory(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(400).send({ "msg": "Not found" });
        })
        .catch(err => console.log(err));
});

router.post('/', async (req, res) => {
    await authenticate(req,res);
    handler.addProduct(req.body)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(500).send({ "msg": "Unknown Error" });
        })
        .catch(err => console.log(err));
});

router.put('/:id', async (req, res) => {
    await authenticate(req,res);
    handler.updateProduct(req.params.id, req.body)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(400).send({ "msg": "Not found" });
        })
        .catch(err => console.log(err));
});

router.delete('/:id', async (req, res) => {
    await authenticate(req,res);
    handler.deleteProductById(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(400).send({ "msg": "Not found" });
        })
        .catch(err => console.log(err));
});

module.exports = router;