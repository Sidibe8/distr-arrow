import PointVente from "../../models/PointVente.js";

// Créer un point de vente
export const createPointVente = async (req, res) => {
  try {
    const { nom, prenom_gerant, telephone, reference } = req.body;

    if (!nom || !prenom_gerant || !telephone || !reference) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const pointVente = new PointVente({
      nom,
      prenom_gerant,
      telephone,
      reference,
    });
    await pointVente.save();

    res.status(201).json(pointVente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Récupérer tous les points de vente
export const getPointVentes = async (req, res) => {
  try {
    const pointsVente = await PointVente.find();
    res.json(pointsVente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Récupérer un point de vente par ID
export const getPointVenteById = async (req, res) => {
  try {
    const pointVente = await PointVente.findById(req.params.id);
    if (!pointVente) {
      return res.status(404).json({ error: "Point de vente non trouvé" });
    }
    res.json(pointVente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour un point de vente
export const updatePointVente = async (req, res) => {
  try {
    const pointVente = await PointVente.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!pointVente) {
      return res.status(404).json({ error: "Point de vente non trouvé" });
    }
    res.json(pointVente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Supprimer un point de vente
export const deletePointVente = async (req, res) => {
  try {
    const pointVente = await PointVente.findByIdAndDelete(req.params.id);
    if (!pointVente) {
      return res.status(404).json({ error: "Point de vente non trouvé" });
    }
    res.json({ message: "Point de vente supprimé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
