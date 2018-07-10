# Gateway

## Introduction
Ce package contient la partie front-end c'est-à-dire interface graphique de l'application. Elle dispose d'une base de données MySql pour la gestion des utilisateurs ainsi que des autorités.
Il contient aussi un jhispter-registry.

## Configuration

- Jhipster: 4.14.3
- Port: 8080
- JHipster-Registry
- Authentification: jwt
- Base de données: MySql pour dev et prod
- Pas de 2nd cache hibernate
- Maven
- Angular 5
- Pas de SASS
- Internationlization
- Anglais pour le language native et français

Afin d'avoir une meilleure interface pour les base de données, j'ai installé phpMyAdmin dans un conteneur Docker qui doit se trouver dans le même réseau que les autres conteneurs Dockers afin de pouvoir les faire communiquer.

Je lance tous mes conteneur Docker grâce à Kitematic.

## Base de données

Données pour la connexion dans phpMyAdmin

- mysqlgateway: 172.18.0.4 mot de passe: 1234
- mysql microservice (service 1) : 172.18.0.1 Mot de passe : 1234


## Prérequis
- Node.js
- Yarn

Cette application est configurée pour Service Discovery et Configuration avec JHipster-Registry.

## Démarrage
- Lancer le docker contenant la base de données MySql: 
``docker-compose -f src/main/docker/mysql.yml up``
- Lancer jhipster registry dans docker : 
``docker-compose -f src/main/docker/jhipster-registry.yml up``
 http://127.0.0.1:8761/#/: accès à jhispter registry
 - Lancer la commande suivant pour lancer le client: 
    `` yarn start``

#### Premier démarrage
Après avoir installé Node,  exécuter la commande suivante pour installer les outils de développement.
``yarn install``


