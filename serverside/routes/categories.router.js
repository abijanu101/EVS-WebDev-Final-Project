const express = require("express");
const router = express.Router();
const CategoryHandler = require("../dal/categories.dal");
const handler = new CategoryHandler();

router.get('/', (req, res) => {
    handler.getAllCategories()
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.get('/toplevel', (req, res) => {
        handler.getTopMostCategories()

        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    handler.getCategory(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
            else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    handler.addCategory(req.body)
        .then(output => {
            if (output)
                res.status(200).send(output);
           else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {
    handler.updateCategory(req.params.id, req.body)
        .then(output => {
            if (output)
                res.status(200).send(output);
           else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    handler.deleteCategoryById(req.params.id)
        .then(output => {
            if (output)
                res.status(200).send(output);
           else
                res.status(500).send("Error??");
        })
        .catch(err => console.log(err));
});

module.exports = router;