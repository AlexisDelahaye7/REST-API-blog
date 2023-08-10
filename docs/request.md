# Chemin pour répondre à une requête

- Serveur `index.js`
  - Application `./app/app.js`
    - Router `./app/routers/…`
      - Routeur API (/api) `./app/routers/api/api.router.js`
        - Router Catégorie (/api/category/…) `./app/routers/api/api.category.router.js`
          - Validation `./app/validations/validator.middleware.js`
          - Controller Wrapper `./app/middleware/controller.middleware.js`
            - Controller de catégorie `./app/controller/api/category.controller.js`
              - Datamapper de catégorie `./app/datamapper/category.datamapper.js`
        - Router Post (/api/post/…) `./app/routers/api/api.post.router.js`
          - Validation `./app/validations/validator.middleware.js`
          - Controller Wrapper `./app/middleware/controller.middleware.js`
            - Controller de post `./app/controller/api/post.controller.js`
              - Datamapper de post `./app/datamapper/post.datamapper.js`
      - Routeur website (/…) `./app/routers/website/website.controller.js`
        - Controller Wrapper `./app/middleware/controller.middleware.js`
          - Controller de website `./app/controller/main.controller.js`