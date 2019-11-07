import React, { Component } from "react";
import PokeCard from './PokeCard';
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            dexNum: null,
            data: []
        }

        this.getPokeByDexNum = this.getPokeByDexNum.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }


    getPokeByDexNum = function (e) {
        console.log(`input value: `, e.target.value)
        return this.setState({
            dexNum: e.target.value
        })
    }

    fetchData = function (n) {
        console.log(`CLICKED`)
        fetch(`/pokemon/${n}`)
            .then(res => res.json())
            .then(data => {
                console.log(`REACT DATA: `, data);

                const info = Object.assign({}, data);
                return this.setState({
                    data: info
                })
            })
            .catch(err => console.log(err))
    }

    render() {

        const { data } = this.state;
        const { id, name, height, weight, abilities, types, sprites } = data;
        console.log(`SPRITES: `, sprites)
        const imgUrls = [], typesArr = [], abilitiesArr = [];
        for (let key in sprites) {
            imgUrls.push(sprites[key])
        }
        // for (let typeObj of types) {
        //     typesArr.push(typeObj.type.name);
        // }
        // for (let ab of abilities) {
        //     abilitiesArr.push(ab.ability.name);
        // }

        //console.log(imgUrls)
        //console.log(`this.state - data `, data)
        return <div>
            {/* <h1>POKEMON, GOTTA CATCH'EM ALL!</h1> */}

            <input type="text" onChange={this.getPokeByDexNum} />
            <input type="button" value="Search Pokemon By Pokedex Number" onClick={() => this.fetchData(this.state.dexNum)} />

            <div className="pokecard-container"> {/* abilities={abilities} types={types} sprites={sprites} */}
                <PokeCard id={id} name={name} height={height} weight={weight} imgUrls={imgUrls} />
            </div>
            {/* FORM > INPUT TAG, e.target.value */}
        </div>
    }

}