const express = require('express');
const pokeController = require('../controllers/pokeController');
const router = express.Router();

router.get('/pokedex', pokeController.getList, (req, res) => {
    console.log(`LIST ROUTER: `, res.locals.list)
    res.status(200).json({
        list: [...res.locals.list]
    });
})
router.get('/:id', pokeController.getPoke, (req, res) => {
    res.status(200).json({ ...res.locals.pokemon });
});



module.exports = router;