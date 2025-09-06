import Encaissement from "../../models/Encaissement.js";

// Créer un encaissement
export const createEncaissement = async (req, res) => {
  try {
    const { montant, destination } = req.body;
    if (!montant || !destination) {
      return res.status(400).json({ error: "Montant et destination requis" });
    }

    const encaissement = new Encaissement({ montant, destination });
    await encaissement.save();
    res.status(201).json(encaissement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les encaissements
export const getEncaissements = async (req, res) => {
  try {
    const encaissements = await Encaissement.find();
    res.json(encaissements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un encaissement par ID
export const getEncaissement = async (req, res) => {
  try {
    const encaissement = await Encaissement.findById(req.params.id);
    if (!encaissement) return res.status(404).json({ error: "Introuvable" });
    res.json(encaissement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour un encaissement
export const updateEncaissement = async (req, res) => {
  try {
    const encaissement = await Encaissement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!encaissement) return res.status(404).json({ error: "Introuvable" });
    res.json(encaissement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un encaissement
export const deleteEncaissement = async (req, res) => {
  try {
    await Encaissement.findByIdAndDelete(req.params.id);
    res.json({ message: "Encaissement supprimé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
