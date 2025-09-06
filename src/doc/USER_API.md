```markdown
# Documentation API - Utilisateurs / Auth

## Base URL
```

[http://localhost:3000/api/auth](http://localhost:3000/api/auth)

```

##  Authentification

| Action | Méthode | URL |
|--------|---------|-----|
| Inscription | POST | `/register` |
| Connexion | POST | `/login` |
| Récupérer les infos de l’utilisateur connecté | GET | `/me` |


##  Gestion des utilisateurs

| Action | Méthode | URL |
|--------|---------|-----|
| Récupérer tous les utilisateurs | GET | `/` |
| Mettre à jour un utilisateur | PUT | `/update/:id` |
| Supprimer un utilisateur | DELETE | `/delete/:id` |

---

##  Gestion du mot de passe

| Action | Méthode | URL |
|--------|---------|-----|
| Changer son mot de passe | POST | `/change-password` |
| Mot de passe oublié (générer token) | POST | `/forgot-password` |
| Réinitialiser mot de passe avec token | POST | `/reset-password` |

---

##  Notes

- Pour les routes protégées (ex : `/me`, `/update/:id`, `/delete/:id`, `/change-password`), il faut **envoyer le token JWT** dans l’en-tête `Authorization` :

```

Authorization: Bearer <token>

```

- Tous les endpoints qui créent ou mettent à jour des utilisateurs nécessitent de passer le JSON avec les champs requis.

```
