# Documentation API – Encaissements

## Base URL

```
http://localhost:3000/api/encaissements
```

---

## 1. Créer un encaissement

**POST** `/api/encaissements`

### Body (JSON)

```json
{
  "montant": 1500,
  "destination": "caisse"
}
```

### Réponse (201 – Created)

```json
{
  "_id": "64f1a1a2b5c8d1234567890a",
  "montant": 1500,
  "destination": "caisse",
  "date": "2025-08-23T12:00:00.000Z",
  "__v": 0
}
```

---

## 2. Récupérer tous les encaissements

**GET** `/api/encaissements`

### Réponse (200)

```json
[
  {
    "_id": "64f1a1a2b5c8d1234567890a",
    "montant": 1500,
    "destination": "caisse",
    "date": "2025-08-23T12:00:00.000Z",
    "__v": 0
  }
]
```

---

## 3. Récupérer un encaissement par ID

**GET** `/api/encaissements/:id`

### Exemple

```
GET /api/encaissements/64f1a1a2b5c8d1234567890a
```

### Réponse (200)

```json
{
  "_id": "64f1a1a2b5c8d1234567890a",
  "montant": 1500,
  "destination": "caisse",
  "date": "2025-08-23T12:00:00.000Z",
  "__v": 0
}
```

---

## 4. Mettre à jour un encaissement

**PUT** `/api/encaissements/:id`

### Body (JSON)

```json
{
  "montant": 2000,
  "destination": "banque"
}
```

### Réponse (200)

```json
{
  "_id": "64f1a1a2b5c8d1234567890a",
  "montant": 2000,
  "destination": "banque",
  "date": "2025-08-23T12:00:00.000Z",
  "__v": 0
}
```

---

## 5. Supprimer un encaissement

**DELETE** `/api/encaissements/:id`

### Réponse (200)

```json
{
  "message": "Encaissement supprimé"
}
```
