import React, { Component } from 'react'

export class Movies extends Component {
    render() {
        return (
            <div id="movies">
                <img src={this.props.image_url}  alt={this.props.released_on} />
                 <br/>
                 <p>popularity : {this.props.popularity} </p>
                 <p>released_on : {this.props.released_on}</p>
                 <p>total_votes : {this.props.total_votes}</p>
                 <p>average_votes : {this.props.average_votes}</p>
            </div>
        )
    }
}

export default Movies