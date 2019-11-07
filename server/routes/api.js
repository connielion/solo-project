const express = require('express');
const pokeController = require('../controllers/pokeController');
const router = express.Router();

router.get('/:id', pokeController.getPoke, (req, res) => {
    res.status(200).json({ ...res.locals.pokemon });
});

module.exports = router;