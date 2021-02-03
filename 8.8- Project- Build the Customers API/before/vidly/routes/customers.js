const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: Boolean,
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/.test(v);
      },
      message: '{VALUE} is not a valid phone number!'
    },
    required: [true, 'User phone number required']
  }
}));


router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  console.log(error)
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ name: req.body.name, isGold: req.body.isGold, phone: req.body.phone });
  customer = await customer.save();

  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone }, {
    new: true
  });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.any(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().required()
  };

  return Joi.validate(customer, schema);
}

module.exports = router;
