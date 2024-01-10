const Joi = require("joi");

const validateCardWithJoi = (card) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    title: Joi.string().min(2).max(256),
    subtitle: Joi.string().min(2).max(256),
    description: Joi.string().min(2).max(1024),
    phone: Joi.string()
      .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
      .message('card "phone" must be a valid phone number'),
    web: Joi.string()
      .pattern(urlRegex)
      .message('card "web" must be a valid URL')
      .allow(""),
    image: Joi.object().keys({
      url: Joi.string()
        .pattern(urlRegex)
        .message('card.image "url" must be a valid URL')
        .allow(""),
      alt: Joi.string().min(2).max(256).allow(""),
    }),
    bizNumber: Joi.number().allow(""),
    user_id: Joi.string().allow(""),
    price: Joi.number().required(),
    currency: Joi.string().allow(""),
    category: Joi.string().allow(""),
  });

  return schema.validate(card, { abortEarly: false });
};

module.exports = validateCardWithJoi;
