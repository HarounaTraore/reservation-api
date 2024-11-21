# API de Gestion des Réservations de Salles

## Description

Cette API permet de gérer des réservations dans des espaces événementiels. Elle est construite avec **Express.js** et utilise **PostgreSQL** pour la gestion de la base de données via l'ORM **Prisma**. Le projet inclut également des tests unitaires (Jasmine), des outils d'analyse de code (ESLint) et de formatage (Prettier).

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [**Node.js** : (version 18.x LTS ou supérieure)](https://nodejs.org/fr)
- [**PostgreSQL** : (version 13.x ou supérieure)](https://www.postgresql.org/download/)
- [**Postman** (pour tester l'API)](https://www.postman.com/downloads/)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

### **Clonez le repository :**

```bash
git clone https://github.com/HarounaTraore/reservation-api.git
```

### **Accédez au dossier du projet :**

```bash
cd reservation-api
```

### **Installez les dépendances :**

```bash
npm install
```

## Configuration de la base de données

### 1. **Créez une base de données PostgreSQL**

- Connectez-vous au serveur PostgreSQL en utilisant la commande ci-dessous (remplacez `user_name` par votre nom d'utilisateur) :

  ```bash
  psql -U user_name
  ```

- Une fois connecté, créez votre base de données (remplacez `db_name` par le nom de votre base) :

  ```bash
  CREATE DATABASE db_name;
  ```

### 2. **Configurez le fichier `.env` :**

Renommez le fichier .env.example en .env, puis remplissez-le avec vos informations de connexion :

Exemple de fichier `.env` :

```bash
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/DATABASE_NAME"
JWT_SECRET=YOUR_SECURE_AUTHENTICATION_SECRET
TOKEN_EXPIRATION=EXPIRE_IN_TIME ( 1h, 7d)
LANGUAGE=fr # Langue de la traduction (fr, en, ar)
```

### 3. **Migrations Prisma :**

Déployez les migrations pour initialiser la base de données :

```bash
npx prisma migrate deploy
```

### 4. **Insérez les données avec le script seed :**

Lancez le script pour ajouter des données initiales (comme les utilisateurs administrateurs) :

```bash
npm run seed
```

### 5. **Utilisateurs créer par seed :**

Après l'exécution du script, les utilisateurs suivants seront disponibles dans la base de données :

```json
{
  "email": "admin@admin.com",
  "password": "admin1234"
},
{
  "email": "manager@manager.com",
  "password": "manager1234"
}
```

## Tests unitaires

Des tests unitaires sont fournis pour vérifier le bon fonctionnement des fonctionnalités principales.

- **Exécution des tests** :

```bash
npm test
```

## Analyse et formatage de code

L'analyse statique du code est réalisée avec **ESLint** et le formatage avec **Prettier**. Ces outils sont configurés pour être utilisés dans votre pipeline de développement afin de maintenir un code propre et cohérent.

### **Exécuter l'analyse du code :**

```bash
npm run lint
```

### **Exécuter le formatage automatique :**

```bash
npm run format
```

## Utilisation

Pour démarrer l'application :

```bash
npm start
```

L'API sera accessible à `http://localhost:3000`.

## Documentation et Collection Postman

Vous pouvez consulter la documentation des endpoints et tester les différents points d'accès de l'API grâce à la collection Postman fournie dans ce projet : `reservation-management.postman_collection.json`. Importez ce fichier dans **[Postman](https://www.postman.com/)** pour faciliter les tests et accéder rapidement à tous les points d'accès.

## Auteur

[Harouna Adama Traoré](https://github.com/HarounaTraore)
