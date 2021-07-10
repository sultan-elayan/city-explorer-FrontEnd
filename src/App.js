import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Alert from 'react-bootstrap/Alert'
import Weather from './components/Weather';
import Movies from './components/Movies';

export class App extends Component {

  // defining the props and made the initial data
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

  // getting name from input 
  nameChangeHandler = (e) => { this.setState({ displayName: e.target.value }) };

  // submitting data from the form 
  submitData = async (e) => {
    e.preventDefault()

    try {
      let axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.54c5bcb87e24270823ee985ff91c6f9c&city=${this.state.displayName}&format=json`);
      // console.log('axiosResponse', axiResponse);

      let lat = axiosResponse.data[0].lat;
      let lon = axiosResponse.data[0].lon;

      // getting weather data from backend
      // =========================================================

      let axiosWeatherResponse = await axios.get(`http://localhost:8000/weather?lat=${lat}&lon=${lon}&city=${this.state.displayName}`)

// getting movie data from backend
      // =========================================================

      let axiosMoviesResponse = await axios.get(`http://localhost:8000/movies?city=${this.state.displayName}`)
      console.log("3");
      console.log('respsnse', axiosMoviesResponse);

      // =========================================================

      //changing data after getting it 
      this.setState({
        displayName: axiosResponse.data[0].display_name,
        longitude: axiosResponse.data[0].lon,
        latitude: axiosResponse.data[0].lat,
        display: true,
        alert: false,
        weatherData: axiosWeatherResponse.data,
        moviesData: axiosMoviesResponse.data,
        show: !this.state.show,
        error: ''
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

        <div id="theDev">
          <form onSubmit={this.submitData}>
            <h1>City Explorer</h1>
            <input type='text' placeholder="Enter Your City Name" onChange={(e) => { this.nameChangeHandler(e) }} required />
            <br />
            <br />
            <button>Explore!</button>
          </form>

          <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.3bda2d41fe8feadb05c61e7ffe7be774&center=${this.state.latitude},${this.state.longitude}&zoom=10`} alt="alt" />

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
