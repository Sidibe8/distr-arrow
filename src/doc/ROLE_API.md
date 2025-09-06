```markdown
# Documentation API - Rôles

## Base URL
```

[http://localhost:3000/api/roles](http://localhost:3000/api/roles)

```

---

##  Gestion des rôles

| Action | Méthode | URL |
|--------|---------|-----|
| Créer un rôle | POST | `/` |
| Récupérer tous les rôles | GET | `/` |
| Mettre à jour un rôle | PUT | `/:id` |
| Supprimer un rôle | DELETE | `/:id` |

---

##  Notes

- Pour créer ou mettre à jour un rôle, envoyer un JSON avec les champs requis.

```

Exemple POST / (Créer un rôle):
{
"nom": "Admin"
}

```

- `:id` correspond à l’ID MongoDB du rôle que l’on souhaite modifier ou supprimer.

- Toutes les réponses sont en JSON, avec les données ou les messages d’erreur selon le cas.
```
