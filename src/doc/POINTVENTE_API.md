```markdown
# Documentation API - Points de Vente

## Base URL
```

[http://localhost:3000/api/pointvente](http://localhost:3000/api/pointvente)

````

---

## Gestion des points de vente

| Action | Méthode | URL |
|--------|---------|-----|
| Créer un point de vente | POST | `/` |
| Récupérer tous les points de vente | GET | `/` |
| Récupérer un point de vente par ID | GET | `/:id` |
| Mettre à jour un point de vente | PUT | `/:id` |
| Supprimer un point de vente | DELETE | `/:id` |

---

## Notes

- Pour créer ou mettre à jour un point de vente, envoyer un JSON avec les champs requis :

```json
{
  "nom": "Station Centrale",
  "prenom_gerant": "Oumar Daf 1",
  "telephone": "+22300000000",
  "reference": "STC001"
}
````

- `:id` correspond à l’ID MongoDB du point de vente à modifier ou supprimer.

- Toutes les réponses sont au format JSON.

- Les erreurs renvoient un JSON avec le champ `error` et un message explicatif.

---

## Exemples d’API

### Créer un point de vente

- **POST** `/api/pointvente/`
- Body JSON :

```json
{
  "nom": "Station Centrale",
  "prenom_gerant": "Oumar Daf",
  "telephone": "+22300000000",
  "reference": "STC001"
}
```

### Récupérer tous les points de vente

- **GET** `/api/pointvente/`

### Récupérer un point de vente par ID

- **GET** `/api/pointvente/:id`

### Mettre à jour un point de vente

- **PUT** `/api/pointvente/:id`
- Body JSON :

```json
{
  "nom": "Station Kati",
  "prenom_gerant": "Dinho Sidibe",
  "telephone": "+223000000",
  "reference": "STN002"
}
```

### Supprimer un point de vente

- **DELETE** `/api/pointvente/:id`
