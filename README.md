# REST API - Blog

Ce projet est issu d'un contrôle de connaissances réalisé sur une journée (9h-15h) en cours de formation à [O'clock](https://oclock.io/).

La doc du projet est gérée par Swagger et accessible par la route `/api-docs`.

## Initialiser le projet

1. Executer la commande `npm i -y`.
2. Configurer les variables d'environnement en créant un fichier `.env` en vous basant sur `.env.example`.
3. Configurer les Sqitch en créant un fichier `sqitch.conf` en vous basant sur `sqitch.conf.example`.
4. Créer la base de donnée et l'utilisateur qui vous avez ajouté à la configuration Sqitch.
5. Déployez la base de donnée avec la commande `sqitch deploy`.
6. Importez les données avec la commande `node ./data/import-data.js`.
