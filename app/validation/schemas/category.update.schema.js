import Joi from 'joi';

export default Joi.object({
  label: Joi.string(),
  route: Joi.string()
    .pattern(/^\/[a-zA-Z\\/]*[^\\/]$/),
}).min(1).required();
