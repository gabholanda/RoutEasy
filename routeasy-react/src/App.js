import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      deliveries: [],
      name: '',
      peso: '',
      endereco: '',
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
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.getLocation = this.getLocation.bind(this)
  }

  getLocation(e) {
    e.preventDefault()
    const place = this.state.endereco.split(' ')

    axios.get(`${process.env.REACT_APP_MAP_URL}address=${place.join('+')}&key=${process.env.REACT_APP_MAP_KEY}&language=pt-BR`)
      .then(response => {
        this.setState({
          endereco: response.data.results[0].formatted_address,
          geolocalizacao: {
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
          },
          numero: response.data.results[0].address_components[0].long_name,
          logradouro: response.data.results[0].address_components[1].long_name,
          bairro: response.data.results[0].address_components[2].long_name,
          estado: response.data.results[0].address_components[3].short_name,
          cidade: response.data.results[0].address_components[4].long_name,
          pais: response.data.results[0].address_components[5].long_name,
          //complemento: response.data.results[0].address_components[6].long_name //Não faço ideia de como fazer a API retornar complementos
        })
      })
      .catch(err => console.log(err))
  }

  getDeliveries() {
    axios.get(`${process.env.REACT_APP_API_URL}/deliveries`)
      .then(response => this.setState({ deliveries: response.data }))
      .catch(err => console.log(err))
  }

  //Gerencia as mudanças de inputs
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  //Cria uma nova delivery
  handleFormSubmit(e) {
    e.preventDefault();
    const name = this.state.name
    const peso = this.state.peso
    const endereco = {
      logradouro: this.state.logradouro,
      numero: this.state.numero,
      bairro: this.state.bairro,
      complemento: this.state.complemento,
      cidade: this.state.cidade,
      pais: this.state.pais,
      geolocalizacao: this.state.geolocalizacao
    }
    axios.post(`${process.env.REACT_APP_API_URL}/create-delivery`, { name, peso, endereco })
      .then(() => {
        //Reseta os campos
        this.setState({
          name: '',
          peso: '',
          endereco: '',
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
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getDeliveries();
  }
  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleFormSubmit}>

          <input type="text"
            name="name"
            placeholder="Nome Cliente"
            onChange={event => this.handleChange(event)}
            value={this.state.name} />

          <input type="number"
            name="peso"
            placeholder="Peso da Entrega"
            onChange={event => this.handleChange(event)}
            value={this.state.peso} />

          <input type="text"
            name="endereco"
            placeholder="Endereco do Cliente"
            onChange={event => this.handleChange(event)}
            value={this.state.endereco} />
          <button type="button" id="buscar" onClick={this.getLocation}>Buscar</button>


          <div className="geolocation">
            <input type="number"
              placeholder="Latitude"
              value={this.state.geolocalizacao.latitude} disabled />

            <input type="number"
              placeholder="Longitude"
              value={this.state.geolocalizacao.longitude}
              disabled />
          </div>

          <button type="submit" id="cadastrar">Cadastrar Cliente</button>
        </form>
        <div id="mapid"></div>
      </div>)

  }
}


export default App;
