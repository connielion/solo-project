import React from 'react';
// import Sprites from './Sprites';
const PokeCard = props => {
    const { id, name, height, weight, imgUrls } = props;
    //console.log(`INSIDE POKECARD`, imgUrls)
    const images = imgUrls.map((url, i) => {
        if (url) return <img src={url} alt='pokemon sprite' key={i} />
    })

    return (
        <div>
            <ul>
                <li>Pokedex #: {id}</li>
                <li>Name: {name}</li>
                {/* <li>Type: {types}</li> */}
                {/* <li>Abilities: {abilities}</li> */}
                <li>Height: {height}</li>
                <li>Weight: {weight}</li>
                <li>
                    {images}
                </li>
            </ul>
        </div>
    )
}

export default PokeCard;