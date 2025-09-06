```markdown
# Documentation API - Produits

## Base URL
```

[http://localhost:3000/api/produits](http://localhost:3000/api/produits)

````

---

## 🔹 Gestion des produits

| Action | Méthode | URL |
|--------|---------|-----|
| Créer un produit | POST | `/` |
| Récupérer tous les produits | GET | `/` |
| Récupérer un produit par ID | GET | `/:id` |
| Mettre à jour un produit | PUT | `/:id` |
| Supprimer un produit | DELETE | `/:id` |

---

## 🔹 Notes

- Pour créer ou mettre à jour un produit, envoyer un JSON avec les champs requis :

```json
{
  "nom": "Essence",
  "unite": "litre",
  "prixUnitaire": 1.50
}
````

- `:id` correspond à l’ID MongoDB du produit à modifier ou supprimer.

- Toutes les réponses sont au format JSON.

- Les erreurs renvoient un JSON avec le champ `error` et un message explicatif.

```


```
