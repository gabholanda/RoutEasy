const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({

  name: { type: String, required: true },
  peso: { type: String, required: true },
  endereco: {
    logradouro: String,
    numero: Number,
    bairro: String,
    complemento: String,
    cidade: String,
    estado: String,
    pais: String,
    geolocalizacao: {
      latitude: Number,
      longitude: Number
    }

  }
}, {
  timestamps: true
})

const Delivery = mongoose.model("Delivery", DeliverySchema);

module.exports = Delivery;