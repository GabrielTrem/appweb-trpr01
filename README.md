# appweb-trpr01

Application:

Cette application web permet de gérer un catalogue de livres avec une interface interactive. L'objectif principal est de faciliter l'ajout, la modification, la duplication, la suppression et la consultation des livres. Les utilisateurs peuvent aussi rechercher des livres, afficher leurs détails, et exporter la liste des livres au format CSV. L'application est construite avec Vue.js et intègre des outils comme Bootstrap pour l'interface utilisateur.

Fonctionnalités:

- Ajout d'un livre : L'utilisateur peut ajouter un livre via un formulaire avec des champs obligatoires validés.
- Modification d'un livre : Un bouton permet de modifier un livre existant, préremplissant un formulaire avec les données du livre sélectionné.
- Duplication d'un livre : Un bouton "Dupliquer" permet de créer un nouveau livre à partir d'un livre existant.
- Suppression d'un livre : L'utilisateur peut supprimer un livre, après avoir confirmé la suppression.
- Consultation des livres : La liste des livres est affichée sous forme de tableau, avec une mise à jour conditionnelle selon les critères définis.
- Recherche de livre : Un champ de recherche dynamique permet de trouver un livre par son nom, avec une mise à jour instantanée des résultats.
- Détails du livre : Cliquer sur un livre affiche ses informations détaillées, y compris le nom, la description, le prix et le stock.
- Quantités disponibles : Les quantités en stock sont affichées en temps réel, avec un indicateur visuel (couleurs).
- Alerte de rupture de stock : Une notification avertit l'utilisateur lorsqu'un livre atteint un stock critique de 0.
- Exportation en CSV : Un bouton permet d'exporter la liste des livres au format CSV pour un traitement externe.

# Utilisation de l'IA

Utilisation:

- Utiliser pour générer la description du projet
- Utiliser pour générer une base pour le template de BookDetails
- Utiliser pour aider à intégrer la vérification des forms avec quelques passages générés, mais la plupart on été modifié par la suite
- Utiliser pour générer les bonnes classes bootstrap parfois, comme pour l'alert de out of stock
- Utiliser pour aider à trouver des bugs.
- Utiliser pour générer le code de la fonction exportToCsv
- Utiliser pour trouver certaines fonctions de vue.js (ex: v-on:input, v-html ou le filter du array)
- Utiliser pour générer des messages d'erreurs (ex: Vérification de forms).
- Utiliser pour générer un computed pour books.length
- Utiliser pour générer un computed pour filteredBooks
- Utiliser pour générer la fonction handleImageError et la balise img dans tous les components qui utilise la fonction

# URL du repo Github

https://github.com/GabrielTrem/appweb-trpr01

# URL du site déployé

https://gabrieltrem.github.io/appweb-trpr01/