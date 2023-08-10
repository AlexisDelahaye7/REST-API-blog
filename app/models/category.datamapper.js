import client from '../config/client.db.js';

/**
 * @typedef {object} Category
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} route - Segment d'URL pour accéder à la catégorie (pour SEO)
 * @property {string} label - Le nom affichable de la catégorie
 */

/**
 * @typedef {Object} InputCategory
 * @property {string} route - Segment d'URL pour accéder à la catégorie (pour SEO)
 * @property {string} label - Le nom affichable de la catégorie
 */

export default {
  /**
   * Récupère tout sans filtre ni ordre
   * @returns Tous les categories dans la base de donnée
   */
  async findAll() {
    const result = await client.query('SELECT * FROM category');
    return result.rows;
  },

  /**
   * Récupère par sont id
   * @param {number} categoryId - L'id de la categorie souhaité
   * @returns La categorie souhaité ou null si aucune categorie à cet id
   */
  async findByPk(categoryId) {
    const result = await client.query(
      'SELECT * FROM category WHERE id = $1',
      [categoryId],
    );

    return result.rows[0];
  },

  /**
   * Récupère par son label
   * @param {string} label
   * @param {number|null} id
   * @returns {Category|null} Category
   */
  async findByLabel(label, id = null) {
    const preparedQuery = {
      text: 'SELECT * FROM category WHERE label = $1',
      values: [label],
    };
    if (id) {
      preparedQuery.text += ' AND id <> $2';
      preparedQuery.values.push(id);
    }
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  /**
   * Récupère par sa route
   * @param {string} route
   * @param {number|null} id
   * @returns {Category|null} Category
   */
  async findByRoute(route, id = null) {
    const preparedQuery = {
      text: 'SELECT * FROM category WHERE route = $1',
      values: [route],
    };
    if (id) {
      preparedQuery.text += ' AND id <> $2';
      preparedQuery.values.push(id);
    }
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },

  /**
   * Ajoute dans la base de données
   * @param {InputCategory} category - Les données à insérer
   * @returns {Category} La categorie insérer
   */
  async insert(category) {
    const savedCategory = await client.query(
      `
        INSERT INTO category
        (label, route) VALUES
        ($1, $2) RETURNING *
      `,
      [category.label, category.route],
    );

    return savedCategory.rows[0];
  },

  /**
   * Modifie dans la base de données
   * @param {number} id - L'id à modifier
   * @param {InputCategory} category - Les données à modifier
   * @returns {Category} La categorie modifiée
   */
  async update(id, category) {
    const savedCategory = await client.query(
      `
        UPDATE category SET
          label = coalesce($1,label),
          route = coalesce($2,route),
          updated_at = now()
        WHERE id = $3
        RETURNING *
      `,
      [
        category.label,
        category.route,
        id,
      ],
    );

    return savedCategory.rows[0];
  },

  /**
   * Supprime de la base de données
   * @param {number} id - L'id à supprimer
   * @returns {boolean} Le résultat de la suppression
   */
  async delete(id) {
    const result = await client.query('DELETE FROM category WHERE id = $1', [id]);
    return !!result.rowCount;
  },
};
