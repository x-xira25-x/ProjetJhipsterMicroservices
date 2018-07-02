# Idéal Bien SA
Application de gestion de visite immobilière avec l'approche en microservices crée avec JHipster

## Introduction
Cette application en microservices grâce au générateur d'application JHipster a été pour le travail de Bachelor de la He-arc de Neuchâtel,
filière informatique de gestion. Le but de cette application est de pouvoir tester l'archtitecture en microservices que propose JHipster et 
ainsi de developper une application.

## Structure
Ce projet contient différents projets.
- Application gateway
- Service 1
- Service 2
- Service 3

L'application gateway contient l'interface graphique de l'application c'est-à-dire le front-end.

Le service 1 contient le service de l'utilistateur.

Le service 2 contient le service rattaché au bien.

Le service 3 contient le service pour les visites.

Chaque package contient un readme explicatif.

## Contexte
Cette application est destinée pour les agences immobilières. Elle leur permet de mettre en avant des biens à vendre et ainsi, les clients ont la possibilité de s'inscrire, d'effectuer des recherches et s'inscrire à des visites que proposent les agents immobiliers.

## Utilisateurs de l'application
L'application dispose de 4 types d'utilisateurs:

- Public
- Client : vendeur ou acheteur
- Agent immobilier
- Admnistrateur

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

#### Admnistrateur
L'administrateur dispose d'un onglet "administration" qui lui permet de controler divers paramètre de l'application.

### Compte

<ul>
    <li>Client:</li>
    <ul>
        <li>Login: </li>
        <li>mot de passe: </li>
    </ul>
</ul>
<ul>
    <li>Agent immoblier:</li>
    <ul>
        <li>Login: agent </li>
        <li>mot de passe: 1234</li>
    </ul>
</ul>
<ul>
    <li>Administarteur::</li>
    <ul>
        <li>Login: admin</li>
        <li>mot de passe: admin</li>
    </ul>
</ul>

