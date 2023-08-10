import client from '../config/client.db.js';

/**
 * @typedef {object} Post
 * @property {number} id - Indentifiant unique, Pk de la table
 * @property {string} slug - URL d'accès au post (pour le SEO)
 * @property {string} title - Titre de l'article
 * @property {string} excerpt - Texte d'introduction de l'article
 * @property {string} content - Contenu de l'article
 * @property {number} categoryId - Id de la catégorie à laquelle est rattaché le posts
 */

/**
 * @typedef {object} InputPost
 * @property {string} slug - URL d'accès au post (pour le SEO)
 * @property {string} title - Titre de l'article
 * @property {string} excerpt - Texte d'introduction de l'article
 * @property {string} content - Contenu de l'article
 * @property {number} categoryId - Id de la catégorie à laquelle est rattaché le posts
 */

export default {
  /**
   * Récupère tout sans filtre ni ordre
   * @returns - Tous les posts dans la base de donnée
   */
  async findAll() {
    const result = await client.query(`
      SELECT * FROM "post_with_category"
    `);
    return result.rows;
  },

  /**
   * Récupère par son id
   * @param {number} postId - L'id du post souhaité
   * @returns {Post} Le Post souhaité ou undefined si aucun Post à cet id
   */
  async findByPk(postId) {
    const result = await client.query(
      `
        SELECT * FROM "post_with_category"
        WHERE id = $1
      `,
      [postId],
    );

    return result.rows[0];
  },

  /**
   * Récupère par son slug
   * @param {string} slug
   * @param {number|null} id
   * @returns {Post|null} Post
   */
  async findBySlug(slug, id = null) {
    const preparedQuery = {
      text: 'SELECT * FROM post WHERE slug = $1',
      values: [slug],
    };

    if (id) {
      preparedQuery.text += ' AND id <> $2';
      preparedQuery.values.push(id);
    }

    const result = await client.query(preparedQuery);

    return result.rows[0];
  },

  /**
   * Récupère par son titre
   * @param {string} slug
   * @param {number|null} id
   * @returns {Post|null} Post
   */
  async findByTitle(title, id = null) {
    const preparedQuery = {
      text: 'SELECT * FROM post WHERE title = $1',
      values: [title],
    };
    if (id) {
      preparedQuery.text += ' AND id <> $2';
      preparedQuery.values.push(id);
    }
    const result = await client.query(preparedQuery);

    return result.rows[0];
  },

  /**
   * Récupère par l'id de category
   * @param {number} categoryId - L'id de la Category
   * @returns {Post[]} La liste des Post marqué avec cette Categorydans la BDD
   */
  async findByCategoryId(categoryId) {
    const result = await client.query(
      `
        SELECT * FROM "post_with_category"
        WHERE "category_id" = $1`,
      [categoryId],
    );
    return result.rows;
  },

  /**
   * Ajoute dans la base de données
   * @param {InputPost} post - Les données à insérer
   * @returns {Post} Le Post inséré
   */
  async insert(post) {
    const savedPost = await client.query(
      'SELECT * FROM create_post($1)',
      [post],
    );

    return savedPost.rows[0];
  },

  /**
   * Modifie dans la base de données
   * @param {number} id - L'id à modifier
   * @param {InputPost} post - Les données à modifier
   * @returns {Post} Le Post modifié
   */
  async update(id, post) {
    const savedPost = await client.query(
      `
        SELECT * FROM update_post($1, $2)
      `,
      [id, post],
    );

    return savedPost.rows[0];
  },

  /**
   * Supprime de la base de données
   * @param {number} id - L'id à supprimer
   * @returns {boolean} Le résultat de la suppression
   */
  async delete(id) {
    const result = await client.query('DELETE FROM post WHERE id = $1', [id]);
    return !!result.rowCount;
  },
};
