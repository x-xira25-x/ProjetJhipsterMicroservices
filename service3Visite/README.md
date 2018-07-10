# Service 3 Visite

Ce package contient le microservices pour les visites. Il ne contient pas de front-end, c'est-à-dire de partie interface utilisateur.

## Configuration

- Microservices application
- Jhipster Registry
- Jwt authentification
- Base de données: Mysql pour dev et prod
- Hazelcast implementation pour spring cache abstraction
- Maven
- Internalization support
 

## Structure

La structure de ce package est la suivante :

![](https://github.com/x-xira25-x/ProjetJhipsterMicroservices/blob/master/service3Visite/structure_service3.PNG)


Mon conteneur Docker contenant la base de données se trouve sur le port: 3309

## Manuel d'utilisation

Lancer le conteneur Docker:

    docker-compose -f src/main/docker/mysql.yml up -d
    
Je lance mes conteneurs Docker grâce à Kitematic.

## Base de données

- mot de passe: 1234
- user: root
- 172.18.0.7 

### Configuration de la base de données

connexion au conteneur:
``docker exec -it docker_jhipstertestmono-mysql_1 bash``

puis pour se connecter à la bd : 
``mysql -u root -p:use NOMBASEDONNEES ``

Ajouter un mot de passe :

``ALTER USER 'root'@'localhost' IDENTIFIED BY '1234';``

Stopper et détruire le conteneur pour qu'il prenne en charge le mot de passe
