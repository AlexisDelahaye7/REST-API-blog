import Joi from 'joi';

export default Joi.object({
  label: Joi.string().required(),
  route: Joi.string()
    .pattern(/^\/[a-zA-Z\\/]*[^\\/]$/)
    .required(),
}).required();
