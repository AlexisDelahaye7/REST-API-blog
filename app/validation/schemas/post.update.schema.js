import Joi from 'joi';

export default Joi.object({
  slug: Joi.string()
    .pattern(/^[^-][a-zA-Z0-9-]+[^-]$/),
  title: Joi.string(),
  category_id: Joi.number().integer().min(1),
  excerpt: Joi.string(),
  content: Joi.string(),
}).min(1).required();
