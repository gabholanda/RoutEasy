import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Map from './Map'

class App extends Component {
  constructor() {
    super()
    this.state = {
      deliveries: [{
        name: '',
        peso: '',
        endereco: {
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
        }
      }],

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
    this.resetCadastro = this.resetCadastro.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.getLocation = this.getLocation.bind(this)
  }

  resetCadastro() {
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

  deleteDelivery(id, index) {
    axios.delete(`${process.env.REACT_APP_API_URL}/deliveries/${id}`)
      .then(() => {
        const arr = this.state.deliveries.map(el => el)
        arr.splice(index, 1)
        this.setState({
          deliveries: arr
        })
      })
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
      .then((response) => {
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
        this.getDeliveries()
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getDeliveries();
  }
  render() {
    return (
      <div>
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
            <button type="button" onClick={this.resetCadastro} id="resetar">Resetar Cadastro</button>
            
          </form>
          <section className="map">
            <div className="vertical-line"></div>
            <Map deliveries={this.state.deliveries} />
            <div className="vertical-line"></div>
        </section>
        </div>
        <div className="delivery-column">

          <div className="delivery-list">
            <p>Nome</p><p>Rua</p><p>Cidade</p><p>País</p><p>Peso</p><p>Lat</p><p>Lng</p>
          </div>

          {this.state.deliveries.map((delivery, index) => {
            return <div className="delivery-list" key={index}>
              <p>{delivery.name}</p>
              <p>{delivery.endereco.logradouro}</p>
              <p>{delivery.endereco.cidade}</p>
              <p>{delivery.endereco.pais}</p>
              <p>{delivery.peso}</p>
              <p>{parseFloat(delivery.endereco.geolocalizacao.latitude).toFixed(2)}</p>
              <p>{parseFloat(delivery.endereco.geolocalizacao.longitude).toFixed(2)}</p>
              <button id="delete-btn" onClick={() => this.deleteDelivery(delivery._id, index)}>Delete</button>
            </div>
          })}
        </div>
      </div>
    )

  }
}


export default App;
