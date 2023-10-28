const express = require("express");
const ProductHandler = require("../dal/products.dal");
const router = express.Router();
const handler = new ProductHandler();

router.get('/', (req, res) => {
    handler.getAllProducts()
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    handler.getProductById(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.get('/c/:id', (req, res) => {
    handler.getProductsByCategory(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(500).send({} );
        })
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    handler.addProduct(req.body)
        .then(output => {
            if (output)
                res.status(200).send(output);
           else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {
    handler.updateProduct(req.params.id, req.body)
        .then(output => {
            if (output)
                res.status(200).send(output);
           else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    handler.deleteProductById(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
           else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

module.exports = router;