import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Alert from 'react-bootstrap/Alert'
import Weather from './components/Weather';
import Movies from './components/Movies';
 
let KeyLocal = process.env.KEY_LOCAL



export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      latitude: '',
      longitude: '',
      weatherData: [],
      show: false,
      error: '',
      moviesData: [],
    }
  }

  nameChangeHandler = (e) => { this.setState({ displayName: e.target.value }) };

  submitData = async (e) => {
    e.preventDefault()

    try {
      let axiResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.54c5bcb87e24270823ee985ff91c6f9c&city=${this.state.displayName}&format=json`);
      // console.log('axiosResponse', axiResponse);

      let lat = axiResponse.data[0].lat;
      let lon = axiResponse.data[0].lon;
      let KeyLocal = process.env.REACT_APP_BACKEND_URL

      console.log("2");

      this.setState({
        displayName: axiosResponse.data[0].display_name,
        longitude: axiosResponse.data[0].lon,
        latitude: axiosResponse.data[0].lat,

      })

      // =========================================================

      let axiosWeatherResponse = await axios.get(`${KeyLocal}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&city=${this.state.displayName}`)

      console.log("3");
      console.log('axiosResponse', axiosWeatherResponse);

      // =========================================================
      let axiosMoviesResponse = await axios.get(`${KeyLocal}/movies?city=${this.state.displayName}`)

      // =========================================================

      let axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.3bda2d41fe8feadb05c61e7ffe7be774&q=${this.state.displayName}&format=json`)



      this.setState({
        displayName: axiosResponse.data[0].display_name,
        longitude: axiosResponse.data[0].lon,
        latitude: axiosResponse.data[0].lat,
        display: true,
        alert: false,
        weatherData: axiosWeatherResponse.data,
        show: !this.state.show,
        error: '',
        moviesData: axiosMoviesResponse.data
      })


     


    } catch (error) {
      this.setState({
        error: error.message,
        alert: true
      })
    }
  }


  render() {
    return (

      <>

        <div>
          {this.state.alert &&
            <Alert variant={'danger'}>
              Error: 'Wrong Input! Enter City Name'
            </Alert>
          }
        </div>

        <div id="image">
          <form onSubmit={this.submitData}>
            <h1>City Explorer</h1>
            <input type='text' placeholder="Enter Your City Name" onChange={(e) => { this.nameChangeHandler(e) }} required />
            <br />
            <br />
            <button>Explore!</button>
          </form>

          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.3bda2d41fe8feadb05c61e7ffe7be774&center=${this.state.latitude},${this.state.longitude}&zoom=10`} alt="sasa" />

          <h2>{this.state.displayName}</h2>
          <h2>{this.state.longitude}</h2>
          <h2>{this.state.latitude}</h2>
        </div>



        {this.state.weatherData.map(value => {
          return <Weather desc={value.description} date={value.date} />
        })
        }{
          this.state.moviesData.map(value => {
            return <Movies average_votes={value.average_votes} image_url={value.image_url}
              popularity={value.popularity} released_on={value.released_on} total_votes={value.total_votes} />
          })}
        {
          <p>{this.state.error}</p>
        }

      </>

    )
  }
}

export default App
// import React, { Component } from 'react'
// import './App.css';
// import axios from 'axios';
// import Image from 'react-bootstrap/Image'
// import Alert from 'react-bootstrap/Alert'


// // ===============================================
// export class App extends Component {

//   constructor() {
//     super(); {
//       this.state = {
//         displayName: " ",
//         lat_: " ",
//         lon_: " ",

//       }
//     }
//   };
//   // ===============================================
//   showCity = (e) => {

//     this.setState({
//       displayName: e.target.value
//     }
//     )
//   }
//   // ===============================================
//   submitter = async (e) => {
//     e.preventDefault()

//     try {

//       let axRes = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.3bda2d41fe8feadb05c61e7ffe7be774&q=${this.state.displayName}&format=json`)
//       // console.log(axRes);
//       let lat = axRes.data[0].lat
//       let lon = axRes.data[0].lon

//       // console.log(this.state.displayName);
//       // console.log(lat);
//       // console.log(lon);


//       this.setState({
//         displayName: axRes.data[0].display_name,
//         lat_: axRes.data[0].lat,
//         lon_: axRes.data[0].lon,
//         alert: false,


//       })


//     } catch (error) {
//       this.setState({
//         error: error.message,
//         alert: true
//       })
//     }
//   }
//   // ===============================================

//   render() {
//     return (

//       <>
//         {this.state.alert &&
//           <Alert variant={'danger'}>
//             The City Not Found , Enter Another City
//           </Alert>
//         }

//         <div id="theDev">

//           <form onSubmit={(e) => { this.submitter(e) }}>
//             <input type="text" placeholder="Enter Your City Name " onChange={(e) => { this.showCity(e) }} required />
//             <br />
//             <button >Explore !</button>
//           </form>
//           <br />
//           <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.3bda2d41fe8feadb05c61e7ffe7be774&center=${this.state.lat_},${this.state.lon_}&zoom=12&format=png`} width="400px" height="400px" />
//           <h2>{`City Name : ${this.state.displayName}`}</h2>
//           <h2>{`latitude : ${this.state.lat_}`}</h2>
//           <h2>{`longitude :${this.state.lon_}`}</h2>

//         </div>
//       </>
//     )
//   }
// }

// export default App
