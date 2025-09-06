# Documentation API – Paiements

## Base URL

```
http://localhost:3000/api/paiements
```

---

## 1. Créer un paiement

**POST** `/api/paiements`

### Body (JSON)

```json
{
  "stock_sortie_id": "68a99857bab6db26c6d7ec2b",
  "montant": 2.5,
  "mode": "cash"
}
```

### Réponse (201 – Created)

```json
{
  "_id": "68a9d07e1d5a6b43125c88f2",
  "stock_sortie_id": "68a99857bab6db26c6d7ec2b",
  "montant": 2.5,
  "mode": "cash",
  "reste_a_payer": 2,
  "date": "2025-08-23T11:45:10.123Z",
  "__v": 0
}
```

---

## 2. Récupérer tous les paiements

**GET** `/api/paiements`

### Réponse (200)

```json
[
  {
    "_id": "68a9d07e1d5a6b43125c88f2",
    "stock_sortie_id": "68a99857bab6db26c6d7ec2b",
    "montant": 2.5,
    "mode": "cash",
    "reste_a_payer": 2,
    "date": "2025-08-23T11:45:10.123Z",
    "__v": 0
  }
]
```

---

## 3. Récupérer un paiement par ID

**GET** `/api/paiements/:id`

### Exemple

```
GET /api/paiements/68a9d07e1d5a6b43125c88f2
```

### Réponse (200)

```json
{
  "_id": "68a9d07e1d5a6b43125c88f2",
  "stock_sortie_id": "68a99857bab6db26c6d7ec2b",
  "montant": 2.5,
  "mode": "cash",
  "reste_a_payer": 2,
  "date": "2025-08-23T11:45:10.123Z",
  "__v": 0
}
```

---

## 4. Mettre à jour un paiement

**PUT** `/api/paiements/:id`

### Body (JSON)

```json
{
  "montant": 4.5,
  "mode": "banque"
}
```

⚠️ Le `reste_a_payer` est recalculé automatiquement. Si le montant dépasse le reste dû → erreur 400.

### Réponse (200)

```json
{
  "_id": "68a9d07e1d5a6b43125c88f2",
  "stock_sortie_id": "68a99857bab6db26c6d7ec2b",
  "montant": 4.5,
  "mode": "banque",
  "reste_a_payer": 0,
  "date": "2025-08-23T11:45:10.123Z",
  "__v": 0
}
```

---

## 5. Supprimer un paiement

**DELETE** `/api/paiements/:id`

### Réponse (200)

```json
{
  "message": "Paiement supprimé"
}
```
