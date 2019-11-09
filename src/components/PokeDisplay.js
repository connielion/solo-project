import React from 'react';

const PokeDisplay = props => {
    const { id, name, spriteUrl } = props;
    return <div>
        <ul>
            <li>PokeDex No.: {id}</li>
            <li>Name: {name}</li>
            <img src={spriteUrl} alt="sprite" />
        </ul>
    </div>
}

export default PokeDisplay;