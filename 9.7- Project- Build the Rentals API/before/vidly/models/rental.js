const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
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
// 用 joi-objectid这个包来验证 objectId是不是有效的ID. 这样当前端传过来非法的id的时候， 后端的console不会报错，
// -- 会向前端发送一个400 Bad Request。 如果不用objectid验证， 当前端发送非法的id的时候，后端会报unhandleedPromise的错误
const validateRental = (rental) => {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;
