const Joi = require("joi");

const userUpdateValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object().keys({
      first: Joi.string().min(2).max(256),
      middle: Joi.string().min(2).max(256).allow(""),
      last: Joi.string().min(2).max(256),
    }),

    phone: Joi.string()
      .regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .message('user "phone" must be a valid phone number')
      .allow(""),

    image: Joi.object().keys({
      url: Joi.string()
        .regex(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        .message("user image must be a valid URL")
        .allow(""),
      alt: Joi.string().min(2).max(256).allow(""),
    }),

    address: Joi.object().keys({
      state: Joi.string().allow(""),
      country: Joi.string().allow(""),
      city: Joi.string().allow(""),
      street: Joi.string().allow(""),
      houseNumber: Joi.number().allow(""),
      zip: Joi.number().allow(""),
    }),
  }).options({ abortEarly: false }); // This option ensures all validations are checked before aborting

  return schema.validate(user);
};

module.exports = userUpdateValidation;
