import React, { Component } from 'react';
import PokeDisplay from './PokeDisplay'
export default class List extends Component {
    constructor(props) {
        super(props)
        const { pokeObjList } = props;
        const obj = Object.assign({}, pokeObjList)
        this.state = {
            objArr: obj
        }
        //this.changeState = this.changeState.bind(this)
    }

    // changeState = function () {
    //     console.log(this.state.objArr)

    //     // return this.setState({
    //     //     objArr: [...pokeObjList]
    //     // })
    // }
    // componentDidMount() {
    //     this.changeState()
    // }

    render() {
        //const { objArr } = this.state;
        console.log(`pokeObjList: `, Array.isArray(this.props.pokeObjList))

        // const displays = (this.props.pokeObjList !== null) ? this.props.pokeObjList.map((obj, i) => {

        //     return <PokeDisplay key={i} id={obj.id} name={obj.name} spriteUrl={obj.sprites.front_default} />
        // }) : <div>Loading...</div>

        return <div className="list">
            <h3>List Component</h3>
            {/* <ul>
                {displays}
            </ul> */}
        </div >
    }

}