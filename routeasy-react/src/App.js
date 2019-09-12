import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      peso: '',
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      cidade: '',
      estado: '',
      pais: '',
      geolocalizacao: {
        latitude: '',
        longitude: ''

      }
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios.get(`${process.env.REACT_APP_API_URL}/create-delivery`)
      .then()
      .catch()  
  }

  getLocation(place) {
    place.preventDefault();
    const placeArr = place.target.value.split(' ')

    axios.get(`${process.env.REACT_APP_MAP_URL}
    address=${placeArr.join('+')}
    &key=${process.env.REACT_APP_MAP_KEY}`)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <input type="text" onClick={(e) => this.getLocation(e)} />
      </div>)

  }
}


export default App;
