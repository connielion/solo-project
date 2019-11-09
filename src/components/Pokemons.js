import React, { Component } from "react";
import PokeCard from './PokeCard';
import List from './List';


export default class Pokemons extends Component {
    constructor() {
        super();
        this.state = {
            fetched: false,
            dexNum: null,
            data: [],
            abilities: [],
            types: [],
            stats: [],
            pokeObjList: {}
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
        //console.log(`CLICKED`)
        if (n === null) this.setState();

        fetch(`/pokemon/${n}`)
            .then(res => res.json())
            .then(data => {
                // console.log(`REACT DATA: `, data);
                const info = Object.assign({}, data);
                const { abilities, types, stats } = data;
                this.state.fetched = true;
                this.setState({
                    dexNum: n,
                    data: info,
                    abilities,
                    types,
                    stats
                })
            })
            .catch(err => console.log(err))
    }

    // addFav = function () {
    //     console.log(`clicked`)
    // }
    componentDidMount() {
        fetch('/pokemon/pokedex')
            .then(res => res.json())
            .then(data => {
                // console.log(`DATA FROM LIST: `, data.list)
                return this.setState({
                    pokeObjList: [...data.list]
                })
            })
            .catch(err => console.log(err))
    }

    render() {

        const { data, pokeObjList } = this.state;
        // console.log(`POKEMON LIST`, pokeObjList)
        const { id, name, height, weight, sprites } = data;
        const imgUrls = [];
        const statsArr = this.state.stats.map(obj => [obj.stat.name, obj.base_stat]);
        const typesArr = this.state.types.map(item => item.type.name);
        const abilArr = this.state.abilities.map(ab => ab.ability.name);
        for (let key in sprites) {
            imgUrls.push(sprites[key])
        }
        // console.log(`this.state - data `, this.state)
        const card = (!this.state.fetched) ? <div className="placeholder-div">Search for a pokemon!</div> : <div className="pokecard-container"> <PokeCard className="pokecard" id={id} name={name} height={height} weight={weight} imgUrls={imgUrls} typesArr={typesArr} abilArr={abilArr} statsArr={statsArr} /></div>
        return <div className="main">

            <div className="searchbar">
                <input type="text" placeholder="Enter dex number..." onChange={this.getPokeByDexNum} />
                <input className="btn btn-outline-success" type="button" value="Search Pokemon By Pokedex Number" onClick={() => this.fetchData(this.state.dexNum)} />
            </div>
            <div>
                {card}
            </div>

            <h3>List</h3>
            <List pokeObjList={pokeObjList} />
        </div >
    }

}