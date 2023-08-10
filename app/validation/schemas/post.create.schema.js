import Joi from 'joi';

export default Joi.object({
  slug: Joi.string()
    .pattern(/^[^-][a-zA-Z0-9-]+[^-]$/)
    .required(),
  title: Joi.string().required(),
  category_id: Joi.number().integer().min(1).required(),
  excerpt: Joi.string(),
  content: Joi.string(),
}).required();
