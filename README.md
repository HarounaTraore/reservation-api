# API de Gestion des Réservations de Salles

## Description

Cette API permet de gérer des réservations dans des espaces événementiels. Elle est construite avec **Express.js** et utilise **PostgreSQL** pour la gestion de la base de données via l'ORM **Prisma**. Le projet inclut également des tests unitaires (Jasmine), des outils d'analyse de code (ESLint) et de formatage (Prettier).

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js**
- **PostgreSQL**
- **Postman** (pour tester l'API)

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

### 2. **Configurez le fichier `.env`  :**
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

## Utilisation

Pour démarrer l'application :

```bash
npm start
```

L'API sera accessible à `http://localhost:3000`.

## Endpoints de l'API

### **Authentification**

#### POST /api/login

- **Description** : Authentifie un utilisateur et renvoie un token JWT.
- **Corps de la requête** :

```json
{
  "email": "admin@admin.com",
  "password": "admin1234"
}
```

- **Réponse** :

```json
{
    "token": {
        "token": "JWT_TOKEN",
        "user": {
            "id": 5,
            "email": "admin@gmail.com",
            "name": "Admin",
            "address": "NKTT, Admin",
            "phone": "00000000",
            "status": true,
            "role": "Manager"
        }
    }
}
```

### **Gestion des utilisateurs**

#### GET /api/users

- **Description** : Récupère la liste des utilisateurs.
- **Réponse** :

```json
[
  {
    "id": 1,
    "name": "Super Admin",
    "email": "admin@admin.dev",
    "address": "Address ST",
    "phone": "12300000",
    "password": "lfsfeoifzOFJZF$NGVOGNONVZFPJNGOVENF",
    "role": "Admin",
    "status": true
  }
]
```

#### POST /api/user

- **Description** : Crée un nouveau utilisateur.
- **Corps de la requête** :

```json
{
  "name": "User Manager",
  "email": "manager@manager.dev",
  "address": "Address ST",
  "phone": "12304000",
  "password": "password",
  "role": "Manager"
}
```

- **Réponse** :

```json
{
  "message": "Utilisateur crée avec succès"
}
```

#### PUT /api/user/:id

- **Description** : Met à jour un utilisateur existant par ID.
- **Corps de la requête** :

```json
{
  "name": "User A",
  "email": "manager@manager.dev",
  "address": "Address ST",
  "phone": "12304000",
  "password": "password",
  "role": "Manager"
}
```

- **Réponse** :

```json
{
  "message": "Utilisateur mise à jour avec succès"
}
```

#### GET /api/user/:id

- **Description** : Récuperer un utilisateur existant par ID.
- **Corps de la requête** :

```json
{
  "id": 1,
  "name": "Super Admin",
  "email": "admin@admin.dev",
  "address": "Address ST",
  "phone": "12300000",
  "password": "lfsfeoifzOFJZF$NGVOGNONVZFPJNGOVENF",
  "role": "Admin",
  "status": true
}
```

#### DELETE /api/user/:id

- **Description** : Supprime un utilisateur par ID.
- **Réponse** :

```json
{
  "message": "Utilisateur supprimé avec succès"
}
```

### **Gestion des Salles**

#### GET /api/rooms

- **Description** : Récupère la liste des salles.
- **Réponse** :

```json
[
  {
    "id": 1,
    "name": "Salle de Conférence",
    "capacity": 200,
    "equipement": "Projecteur, Sonorisation, 210 Chaises",
    "status": "Reservée",
    "user_id": null
  }
]
```

#### POST /api/room

- **Description** : Crée une nouvelle salle.
- **Corps de la requête** :

```json
{
  "name": "Salle de Réunion",
  "capacity": 50,
  "equipment": "Table, 60 Chaises",
  "status": "Non reservée"
}
```

- **Réponse** :

```json
{
  "message": "Salle créée avec succès"
}
```

#### PUT /api/room/:id

- **Description** : Met à jour une salle existante par ID.
- **Corps de la requête** :

```json
{
  "name": "Salle de Réunion VIP",
  "capacity": 70,
  "equipment": "Table, 60 Chaises",
  "status": "Non reservée"
}
```

- **Réponse** :

```json
{
  "message": "Salle mise à jour avec succès"
}
```

#### GET /api/room/:id

- **Description** : Récupère une salle existante par ID.
- **Réponse** :

```json
{
  "id": 1,
  "name": "Salle de Conférence",
  "capacity": 200,
  "equipement": "Projecteur, Sonorisation, 210 Chaises",
  "status": "Reservée",
  "user_id": null
}
```

#### DELETE /api/room/:id

- **Description** : Supprime une salle par ID.
- **Réponse** :

```json
{
  "message": "Salle supprimée avec succès"
}
```

### **Gestion des clients**

#### GET /api/customers

- **Description** : Récupère la liste des clients.
- **Réponse** :

```json
[
  {
    "id": 1,
    "name": "Sidi Dia",
    "address": "Address A",
    "phone": "12345678",
    "user_id": 1
  }
]
```

#### POST /api/customer

- **Description** : Crée un nouveau client.
- **Corps de la requête** :

```json
{
  "name": "Sally Dia",
  "address": "Address A",
  "phone": "12345678"
}
```

- **Réponse** :

```json
{
  "message": "Client créée avec succès"
}
```

#### PUT /api/customer/:id

- **Description** : Met à jour une client existante par ID.
- **Corps de la requête** :

```json
{
  "name": "Saly Dia",
  "address": "Address A",
  "phone": "12345678",
  "user_id": 1
}
```

- **Réponse** :

```json
{
  "message": "client mise à jour avec succès"
}
```

#### GET /api/customer/:id

- **Description** : Recupère un client existant par ID.
- **Réponse** :

```json
{
  "id": 1,
  "name": "Sidi Dia",
  "address": "Address A",
  "phone": "12345678",
  "user_id": 1
}
```

#### DELETE /api/customer/:id

- **Description** : Supprime une customer par ID.
- **Réponse** :

```json
{
  "message": "Customer supprimée avec succès"
}
```

### **Gestion des Réservations**

#### GET /api/reservations

- **Description** : Récupère toutes les réservations.
- **Réponse** :

```json
{
  "id": 1,
  "room_id": 1,
  "user_id": 1,
  "date_reservation": "2024-09-01",
  "date_start": "2024-10-01",
  "date_end": "2024-10-02"
}
```

#### POST /api/reservation

- **Description** : Crée une nouvelle réservation.
- **Corps de la requête** :

```json
{
  "id": 1,
  "room_id": 1,
  "user_id": 1,
  "date_reservation": "2024-09-01",
  "date_start": "2024-10-01",
  "date_end": "2024-10-02"
}
```

- **Réponse** :

```json
{
  "message": "Réservation effectuée avec succès"
}
```

#### PUT /api/reservation/:id

- **Description** : Met à jour une réservation existante par ID.
- **Corps de la requête** :

```json
{
  "id": 1,
  "room_id": 1,
  "user_id": 2,
  "date_reservation": "2024-09-01",
  "date_start": "2024-10-20",
  "date_end": "2024-10-02"
}
```

- **Réponse** :

```json
{
  "message": "Réservation mise à jour avec succès"
}
```

#### GET /api/reservation/:id

- **Description** : Récupère une réservation existante par ID.
- **Réponse** :

```json
{
  "id": 1,
  "room_id": 1,
  "user_id": 2,
  "date_reservation": "2024-09-01",
  "date_start": "2024-10-20",
  "date_end": "2024-10-02"
}
```

#### DELETE /api/reservation/:id

- **Description** : Supprime une réservation par ID.
- **Réponse** :

```json
{
  "message": "Réservation annulée avec succès"
}
```

## Tests unitaires

Des tests unitaires sont fournis pour vérifier le bon fonctionnement des fonctionnalités CRUD.

- **Framework utilisé** : Jasmine
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

## Documentation et Collection Postman

Pour tester les différents endpoints de l'API, vous pouvez utiliser la collection Postman incluse dans ce projet.

## Auteur

[Harouna Adama Traoré](https://github.com/HarounaTraore)
