# Idéal Bien SA
Idéal Biens SA est une application de gestion de visite immobilière avec l'approche en microservices crée avec JHipster

## Introduction
Cette application en microservices a été développée grâce au générateur d'application JHipster pour le travail de Bachelor de la He-arc de Neuchâtel, filière informatique de gestion. Le but de cette application est de pouvoir tester l'architecture en microservices que propose JHipster et ainsi de développer une application.

## Structure
Ce projet contient différents projets.
- Application gateway
- Service 1
- Service 2
- Service 3

L'application gateway contient l'interface graphique de l'application c'est-à-dire le front-end.

Le service 1 contient le service de l'utilisateur.

Le service 2 contient le service rattaché au bien.

Le service 3 contient le service pour les visites.

Ci-dessous se trouve la structure du projet :

Chaque package contient un readme explicatif.
![](https://github.com/x-xira25-x/ProjetJhipsterMicroservices/blob/master/structure.PNG)

## Contexte
Cette application est destinée pour les agences immobilières. Elle leur permet de mettre en avant des biens à vendre et ainsi, les clients ont la possibilité de s'inscrire, d'effectuer des recherches et s'inscrire à des visites que proposent les agents immobiliers.

## User stories
Ci-dessous se trouve les user stories implémentés dans l'application:

| User stories  | Implémenté    | 
| ------------- |:-------------:| 
| En tant qu'agent immobilier, je souhaite promouvoir des biens afin de trouver des acheteurs potentiels.      | X | 
| En tant qu'agent immobilier, je souhaite trouver des acheteurs potentiels afin d’effectuer des visites.    | X     |   
| En tant qu'agent immobilier, je souhaite organiser des visites groupées afin de présenter un bien à différents acheteurs. |X      |   
| En tant que client, je souhaite rechercher un bien afin de pouvoir effectuer une visite.|X      | 
| En tant que client, je souhaite effectuer une visite afin de voir le bien. |X |
| En tant que client, je souhaite trouver un bien afin de l’acheter.| X|

## Modèle de données
MCD

![](https://github.com/x-xira25-x/JhipsterMonoMySql/blob/master/ModeleDonnees/MCD2.PNG)

MLD
![](https://github.com/x-xira25-x/JhipsterMonoMySql/blob/master/ModeleDonnees/MLD2.PNG)

## Utilisateurs de l'application
L'application dispose de 4 types d'utilisateurs:

- Public
- Client : vendeur ou acheteur
- Agent immobilier
- Administrateur

#### Public
L'utilisateur en public peut accéder à l'onglet "a vendre" et ainsi voir les biens mis en vente. Il peut également effectuer un filtre par type de bien.

#### Client : vendeur ou acheteur
En s'inscrivant sur l'application, le client peut etre un vendeur et/ou un acheteur. Il peut accéder à l'onglet "a vendre", voir les biens mis en vente et également effectuer un filtre par type de bien. Il a la possibilité de s'inscrire à des visites et dispose d'un onglet "visites" pour voir les visites auxquelles il est inscrit. Il dispose d'un bouton pour se désister d'une visite.


#### Agent immobilier
L'agent immobilier est créé depuis le compte administrateur. Il peut accéder à l'onglet "a vendre" et peut créer, supprimer, modifier les diverses entités suivantes:
- bien
- client
- agent immobilier
- visite

#### Administrateur
L'administrateur dispose d'un onglet "administration" qui lui permet de controler divers paramètres de l'application.

### Compte

<ul>
    <li>Client:</li>
    <ul>
        <li>Login: client</li>
        <li>mot de passe: 1234</li>
    </ul>
</ul>
<ul>
    <li>Agent immobilier:</li>
    <ul>
        <li>Login: agent </li>
        <li>mot de passe: 1234</li>
    </ul>
</ul>
<ul>
    <li>Administrateur:</li>
    <ul>
        <li>Login: admin</li>
        <li>mot de passe: admin</li>
    </ul>
</ul>

