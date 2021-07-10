import React, { Component } from 'react'

class Weather extends Component {
    render() {
        return (
            <div id="weather">
                <h2 >{this.props.desc}</h2>
                <h2>{this.props.date}</h2>
            </div>
        )
    }
}

export default Weather