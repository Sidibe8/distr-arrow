```markdown
# API Stock Sortie

Gestion des sorties de stock.  
Chaque sortie est liée à :

- Un **produit** (prix unitaire récupéré automatiquement),
- Un **user** (la personne qui effectue la sortie),
- Un **point de vente**,
- Un **statut** (par défaut `"en attente"`).

Le champ `montant_total` est **calculé automatiquement** :
```

montant_total = produit.prixUnitaire \* quantite

````
## Endpoints

### Créer une sortie
**POST** `/api/stock-sorties`

#### Body JSON
```json
{
  "produit_id": "66d9c6b2f2a1a7b1a3e12345",
  "quantite": 10,
  "commercial_id": "66d9c6b2f2a1a7b1a3e67890",
  "point_vente_id": "66d9c6b2f2a1a7b1a3e54321",
  "statut": "en attente"
}
````

#### Réponse

```json
{
  "_id": "66da1234f2a1a7b1a3e11111",
  "produit_id": "66d9c6b2f2a1a7b1a3e12345",
  "quantite": 10,
  "commercial_id": "66d9c6b2f2a1a7b1a3e67890",
  "point_vente_id": "66d9c6b2f2a1a7b1a3e54321",
  "date": "2024-08-23T12:34:56.789Z",
  "montant_total": 5000,
  "statut": "en attente"
}
```

---

### Lister toutes les sorties

**GET** `/api/stock-sorties`

#### Réponse

```json
[
  {
    "_id": "66da1234f2a1a7b1a3e11111",
    "produit_id": {
      "_id": "66d9c6b2f2a1a7b1a3e12345",
      "nom": "Essence",
      "prixUnitaire": 500
    },
    "quantite": 10,
    "commercial_id": "66d9c6b2f2a1a7b1a3e67890",
    "point_vente_id": "66d9c6b2f2a1a7b1a3e54321",
    "date": "2024-08-23T12:34:56.789Z",
    "montant_total": 5000,
    "statut": "en attente"
  }
]
```

---

### ✏️ Mettre à jour une sortie

**PUT** `/api/stock-sorties/:id`

#### Body JSON (exemple : changer la quantité et confirmer la sortie)

```json
{
  "quantite": 12,
  "statut": "confirmé"
}
```

#### Réponse

```json
{
  "_id": "66da1234f2a1a7b1a3e11111",
  "produit_id": "66d9c6b2f2a1a7b1a3e12345",
  "quantite": 12,
  "commercial_id": "66d9c6b2f2a1a7b1a3e67890",
  "point_vente_id": "66d9c6b2f2a1a7b1a3e54321",
  "date": "2024-08-23T12:34:56.789Z",
  "montant_total": 6000,
  "statut": "confirmé"
}
```

---

### ❌ Supprimer une sortie

**DELETE** `/api/stock-sorties/:id`

#### Réponse

```json
{
  "message": "Sortie supprimée"
}
```

---

## ⚠️ Notes importantes

- `montant_total` est toujours calculé automatiquement, **ne pas l’envoyer dans le body**.
- Le `statut` peut être : `"en attente"`, `"confirmé"`, `"annulé"`.
- Chaque sortie est rattachée à un **user** (`commercial_id`) et un **point de vente** (`point_vente_id`).
