import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'


// ===============================================
export class App extends Component {

  constructor() {
    super(); {
      this.state = {
        displayName: " ",
        lat_: " ",
        lon_: " ",

      }
    }
  };
  // ===============================================
  showCity = (e) => {

    this.setState({
      displayName: e.target.value
    }
    )
  }
  // ===============================================
  submitter = async (e) => {
    e.preventDefault()

    try {

      let axRes = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.3bda2d41fe8feadb05c61e7ffe7be774&q=${this.state.displayName}&format=json`)
      // console.log(axRes);
      let lat = axRes.data[0].lat
      let lon = axRes.data[0].lon

      // console.log(this.state.displayName);
      // console.log(lat);
      // console.log(lon);


      this.setState({
        displayName: axRes.data[0].display_name,
        lat_: axRes.data[0].lat,
        lon_: axRes.data[0].lon,
        alert: false,


      })


    } catch (error) {
      this.setState({
        error: error.message,
        alert: true
      })
    }
  }
  // ===============================================


  // ===============================================



  render() {
    return (

      <>
        {this.state.alert &&
          <Alert variant={'danger'}>
            The City Not Found , Enter Another City
          </Alert>
        }

        <div id="theDev">

          <form onSubmit={(e) => { this.submitter(e) }}>
            <input type="text" placeholder="Enter Your City Name " onChange={(e) => { this.showCity(e) }} required />
            <br />
            <button >Explore !</button>
          </form>
          <br />
          <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.3bda2d41fe8feadb05c61e7ffe7be774&center=${this.state.lat_},${this.state.lon_}&zoom=12&format=png`} width="400px" height="400px" />
          <h2>{`City Name : ${this.state.displayName}`}</h2>
          <h2>{`latitude : ${this.state.lat_}`}</h2>
          <h2>{`longitude :${this.state.lon_}`}</h2>

        </div>
      </>
    )
  }
}

export default App
