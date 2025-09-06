````markdown
# Gestion Station – API

## Présentation du projet

Le projet **Gestion Station** est un système complet de gestion pour une société de distribution.  
Il permet de gérer :

- Les **stocks** (entrées et sorties)
- Les **points de vente**
- Les **paiements et encaissements**
- Le **recouvrement** et suivi financier
- Les **statistiques et exports** (PDF / Excel)

### Composants

- **Application web** : React + Vite (frontend), Node.js + Express (backend).
- **Application mobile** : React Native (rôle Commercial).
- **Dashboard** : graphiques et statistiques.

---

## Rôles et droits

| Rôle           | Droits principaux                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| **SuperAdmin** | Visualisation complète (stocks, ventes, recouvrements, encaissements, statistiques). Aucun droit d’action. |
| **Admin**      | Gérer utilisateurs, rôles, points de vente ; enregistrer entrées/sorties ; voir statistiques et exports.   |
| **Commercial** | Voir ses sorties ; confirmer ou annuler dépôts ; saisir paiements reçus ; suivre recouvrements.            |
| **Financier**  | Saisir encaissements (caisse/banque) ; voir flux financiers ; consulter sorties et recouvrements.          |

---

## Fonctionnalités principales

- **Stock** : entrées (Admin), sorties (Admin), confirmation/annulation (Commercial).
- **Points de vente** : créés et gérés par Admin.
- **Paiements & recouvrements** : gestion du montant dû, paiements partiels, soldes automatiques, clôture à 100%.
- **Encaissements** : saisis par Financier (caisse/banque).
- **Statistiques & exports** : ventes par commercial, statut des recouvrements, fréquence des commandes par point de vente, délai écoulement stock.

---

## Base URL

```http
http://localhost:3000/api
```
````

---

## Endpoints disponibles

### Authentification & Utilisateurs

- **POST** `/auth/register` → Inscription
- **POST** `/auth/login` → Connexion
- **GET** `/auth/me` → Infos utilisateur connecté
- **GET** `/auth/` → Tous les utilisateurs
- **PUT** `/auth/update/:id` → Mettre à jour utilisateur
- **DELETE** `/auth/delete/:id` → Supprimer utilisateur
- **POST** `/auth/change-password` → Changer mot de passe
- **POST** `/auth/forgot-password` → Mot de passe oublié
- **POST** `/auth/reset-password` → Réinitialiser mot de passe

---

### Rôles

- **POST** `/roles` → Créer rôle
- **GET** `/roles` → Tous les rôles
- **PUT** `/roles/:id` → Mettre à jour rôle
- **DELETE** `/roles/:id` → Supprimer rôle

---

### Produits

- **POST** `/produits` → Créer produit
- **GET** `/produits` → Tous les produits
- **GET** `/produits/:id` → Produit par ID
- **PUT** `/produits/:id` → Mettre à jour produit
- **DELETE** `/produits/:id` → Supprimer produit

---

### Points de vente

- **POST** `/points-vente` → Créer point de vente
- **GET** `/points-vente` → Tous les points de vente
- **GET** `/points-vente/:id` → Point de vente par ID
- **PUT** `/points-vente/:id` → Mettre à jour point de vente
- **DELETE** `/points-vente/:id` → Supprimer point de vente

---

### Stock Entrées

- **POST** `/stock-entrees` → Créer entrée stock
- **GET** `/stock-entrees` → Toutes les entrées
- **GET** `/stock-entrees/:id` → Entrée par ID
- **PUT** `/stock-entrees/:id` → Mettre à jour entrée
- **DELETE** `/stock-entrees/:id` → Supprimer entrée

---

### Stock Sorties

- **POST** `/stock-sorties` → Créer sortie stock
- **GET** `/stock-sorties` → Toutes les sorties
- **GET** `/stock-sorties/:id` → Sortie par ID
- **PUT** `/stock-sorties/:id` → Mettre à jour sortie
- **DELETE** `/stock-sorties/:id` → Supprimer sortie

---

### Paiements

- **POST** `/paiements` → Créer paiement
- **GET** `/paiements` → Tous les paiements
- **GET** `/paiements/:id` → Paiement par ID
- **PUT** `/paiements/:id` → Mettre à jour paiement
- **DELETE** `/paiements/:id` → Supprimer paiement

---

### Encaissements

- **POST** `/encaissements` → Créer encaissement
- **GET** `/encaissements` → Tous les encaissements
- **GET** `/encaissements/:id` → Encaissement par ID
- **PUT** `/encaissements/:id` → Mettre à jour encaissement
- **DELETE** `/encaissements/:id` → Supprimer encaissement

---

## Dashboard

- Graphiques des volumes vendus (par commercial, point de vente)
- Graphiques des recouvrements
- Historique des encaissements
- Statistiques points de vente (SuperAdmin/Admin uniquement)

---

## Installation & Lancement

1. **Cloner le projet**

   ```bash
   git clone https://gitlab.com/devoo2/distribution-backend.git
   cd distribution-backend
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configurer l’environnement**
   Créer un fichier `.env` :

   ```env
   PORT=3000
   DB_URL=mongodb://localhost:27017/gestion-station
   JWT_SECRET=your_secret_key
   ```

4. **Lancer le serveur**

   ```bash
   npm run dev
   ```

---

## Fonctionnalités futures

- Mode hors-ligne sur l’app mobile (Commercial).
- Alertes sur échéances / retards.
- Journalisation des actions (logs de sécurité).
