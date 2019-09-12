import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class Map extends Component {
  constructor(props) {
    super(props)
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
      }]
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.deliveries !== state.deliveries) {
      return {
        deliveries: props.deliveries,
      };
    }
    return null;
  }
  render() {
    return (
      <LeafletMap
        center={[-20, -50]}
        zoom={4}
        maxZoom={20}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.deliveries.map((delivery, index) => {
          return <Marker key={index} position={[delivery.endereco.geolocalizacao.latitude, delivery.endereco.geolocalizacao.longitude]}>
            <Popup>
              <p>{delivery.name}</p>
              <p>{delivery.peso}kg</p>
            </Popup>
          </Marker>
        })}
      </LeafletMap>
    );
  }
}

export default Map