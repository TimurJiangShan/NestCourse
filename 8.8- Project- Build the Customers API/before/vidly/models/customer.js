const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: String,
    default: false,
  },
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

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().required()
  };
  return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
