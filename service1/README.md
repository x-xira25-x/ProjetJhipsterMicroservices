# ProjetJhipsterMicroservices

Ce package contient le microservices pour les utilisateurs.

## Structure

![](https://github.com/x-xira25-x/ProjetJhipsterMicroservices/edit/master/service1/structure_service1.PNG)



    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw verify -Pprod dockerfile:build

Then run:

    docker-compose -f src/main/docker/app.yml up -d




