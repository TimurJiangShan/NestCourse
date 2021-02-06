const Joi = require('joi');
const mongoose = require('mongoose');
const customerSchema = require('./customer');

const Rental = mongoose.model(
  'Rental',
  new mongoose.Schema({
    customer: {
      type: customerSchema,
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  }),
);
const validateRental = (rental) => {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
    rentalFee: Joi.number().min(0).max(255),
  };
  return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;
