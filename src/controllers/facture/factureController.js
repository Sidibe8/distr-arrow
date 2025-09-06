import Facture from "../../models/facture/Facture.js";
export const createFacture = async (req, res) => {
  try {
    const facture = new Facture(req.body);
    const savedFacture = await facture.save();
    res.status(201).json(savedFacture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir toutes les factures
export const getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.find();
    res.status(200).json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une facture par ID
export const getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);
    if (!facture)
      return res.status(404).json({ message: "Facture non trouvée" });
    res.status(200).json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une facture par ID
export const updateFacture = async (req, res) => {
  try {
    const updatedFacture = await Facture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFacture)
      return res.status(404).json({ message: "Facture non trouvée" });
    res.status(200).json(updatedFacture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une facture par ID
export const deleteFacture = async (req, res) => {
  try {
    const deletedFacture = await Facture.findByIdAndDelete(req.params.id);
    if (!deletedFacture)
      return res.status(404).json({ message: "Facture non trouvée" });
    res.status(200).json({ message: "Facture supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
