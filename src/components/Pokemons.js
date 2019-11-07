import React, { Component } from "react";
import PokeCard from './PokeCard';
export default class Pokemons extends Component {
    constructor() {
        super();
        this.state = {
            dexNum: null,
            data: [],
            abilities: [],
            types: [],
            stats: [],
            list: []
        }
        this.getPokeByDexNum = this.getPokeByDexNum.bind(this);
        this.fetchData = this.fetchData.bind(this);
        // this.addFav = this.addFav.bind(this);
    }
    // onChange
    getPokeByDexNum = function (e) {
        //console.log(`input value: `, e.target.value)
        return this.setState({
            dexNum: e.target.value
        })
    }
    //onClick
    fetchData = function (n) {
        // console.log(`CLICKED`)
        fetch(`/pokemon/${n}`)
            .then(res => res.json())
            .then(data => {
                // console.log(`REACT DATA: `, data);
                const info = Object.assign({}, data);
                const { abilities, types, stats } = data;
                return this.setState({
                    data: info,
                    abilities,
                    types,
                    stats
                })
            })
            .catch(err => console.log(err))
    }


    // componentDidMount() {
    //     fetch('/pokemon')
    //         .then(res => res.json())
    //         .then(data => this.setState({
    //             list: [...data.results]
    //         }))
    // }
    render() {


        const { data } = this.state;
        const { id, name, height, weight, sprites } = data;
        const imgUrls = [];
        const statsArr = this.state.stats.map(obj => [obj.stat.name, obj.base_stat]);
        const typesArr = this.state.types.map(item => item.type.name);
        const abilArr = this.state.abilities.map(ab => ab.ability.name);
        for (let key in sprites) {
            imgUrls.push(sprites[key])
        }


        console.log(`this.state - data `, this.state)
        return <div className="main">

            <div className="searchbar">
                <input type="text" onChange={this.getPokeByDexNum} />
                <input type="button" value="Search Pokemon By Pokedex Number" onClick={() => this.fetchData(this.state.dexNum)} />
            </div>

            <div className="pokecard-container"> {/* abilities={abilities} types={types} sprites={sprites} */}
                <PokeCard className="pokecard" id={id} name={name} height={height} weight={weight} imgUrls={imgUrls} typesArr={typesArr} abilArr={abilArr} statsArr={statsArr} />
            </div>

        </div >
    }

}