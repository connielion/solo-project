const db = require('../models/pokeModels');
const Pokedex = require('pokedex-promise-v2');

const options = {
    protocol: 'http',
    // hostName: 'localhost:8080',
    // versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

const pokeController = {};

// get
pokeController.getPoke = (req, res, next) => {
    console.log('here inside middleware, CONTROLLER', req.params);
    const id = req.params.id;
    P.getPokemonByName(id, (response, error) => { // with callback
        if (!error) {
            // console.log('response', id, response);

            res.locals.dexNum = response.id; // num
            res.locals.pokemonName = response.species.name; // string
            res.locals.types = response.types; // array of objects
            res.locals.height = response.height; // num
            res.locals.weight = response.weight; // num
            res.locals.abilities = response.abilities; // array of objects
            res.locals.sprites = response.sprites; // object .front_default

            const pokemon = {
                id: res.locals.dexNum,
                name: res.locals.pokemonName,
                types: [...res.locals.types],
                abilities: res.locals.abilities,
                height: res.locals.height,
                weight: res.locals.weight,
                sprites: res.locals.sprites
            }
            res.locals.pokemon = pokemon;
            return next();
        } else {
            console.log('error', id, error);
            res.send('error');
            return next(error)
        }
    });
    // const queryString = 'SELECT *, people.name, species.name AS species, planets.name AS homeworld FROM public.people INNER JOIN public.species ON public.people.species_id = public.species._id INNER JOIN public.planets ON public.people.homeworld_id = public.planets._id';
    //   db
    //     .query(queryString)
    //     .then(data => {
    //       res.locals.characters = data.rows;
    //       console.log('RES LOCALS CHARACTERS ---> ', res.locals.characters);
    //       return next();
    //     })
    //     .catch(e => next(e))
}
// add
pokeController.addPoke = (req, res, next) => {

}
// delete
pokeController.removePoke = (req, res, next) => {

}
module.exports = pokeController;