import React, { Component } from 'react';


export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objArr: []
        }

    }
    componentDidMount() {
        console.log(`this: `, this)
        console.log(`THIS.PROPS.LIST: `, this.props.list)
        // // //console.log(`list: `, list)
        // const req = this.props.list.map(url => fetch(url));
        // console.log(`req`, req)
        // Promise.all(req)
        //     .then(responses => {
        //         console.log(`RESPONSES: `, responses)
        //         // return this.setState({
        //         //     objArr: [...responses]
        //         // })
        //     })
    }


    render() {
        //console.log(`LIST STATE`, this.props.list)

        return <div className="list">
            <h3>List Component</h3>
            <ul>
                {/* {items} */}
            </ul>
        </div >
    }

}