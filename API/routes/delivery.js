const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Delivery = require('../models/Delivery');

router.get('/deliveries', (req, res) => {
  Delivery.find()
    .then(deliveries => res.status(200).json(deliveries))
    .catch(err => res.status(500).json(err))
})

router.post('/create-delivery', (req, res) => {
  const {
    name,
    peso,
    endereco
  } = req.body

  const newDelivery = new Delivery({
    name,
    peso,
    endereco
  })

  newDelivery.save(err => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error upon saving delivery on DB" })
      return;
    }
    res.status(200).json(newDelivery)
  })
})

router.delete('/deliveries/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Delivery.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: `${req.params.id} deleted with success` }))
    .catch(err => res.status(500).json(err))
})

module.exports = router;