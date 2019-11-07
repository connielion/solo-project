import React from 'react';

const PokeCard = props => {
    const { id, name, height, weight, imgUrls, typesArr, abilArr, statsArr, addFav } = props;
    const images = imgUrls.map((url, i) => {
        if (url) return <img src={url} alt='pokemon sprite' key={i} />
    })
    const types = typesArr.map((t, i) => {
        if (t) return <span key={i}> {t} </span>
    })
    const abils = abilArr.map((a, i) => {
        if (a) return <span key={i}> {a} </span>
    })
    const stats = statsArr.reverse().map((arr, i) => {
        if (arr) return <li key={i}>{arr[0]} : {arr[1]}</li>
    })

    return (
        <div className="contents">
            <div>
                <ul>
                    <li>Pokedex #: {id}  <span className="favBtn" onClick={addFav}><i className="fas fa-star"></i></span></li>
                    <li>Pokemon Name: {name}</li>
                    <li>Type(s):
                        {types}
                    </li>
                    <li>Abilities:
                        {abils}
                    </li>
                    <li>Height: {height} & Weight: {weight}</li>
                </ul>
                <div className="sprites">{images}</div>
            </div>
            <div className="stats-div">
                Base Stats:
                 <ul className="stats">{stats}</ul>
            </div>
        </div>
    )
}

export default PokeCard;