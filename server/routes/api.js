const express = require('express');
const pokeController = require('../controllers/pokeController');
const router = express.Router();

router.get('/:id', pokeController.getPoke, (req, res) => {
    res.status(200).json({ ...res.locals.pokemon });
});

router.get('/:offset', pokeController.getList, (req, res) => {
    res.status(200).json(res.locals.list);
})

module.exports = router;