import Depense from "../../models/depense/Depense.js";

// Créer une dépense
export const creerDepense = async (req, res) => {
  try {
    const nouvelleDepense = new Depense({
      ...req.body,
      utilisateur: req.user ? req.user._id : null,
    });

    const depense = await nouvelleDepense.save();
    res.status(201).json({
      message: "Dépense créée avec succès",
      data: depense,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer toutes les dépenses
export const getDepenses = async (req, res) => {
  try {
    const depenses = await Depense.find()
      .populate("utilisateur", "nom email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: depenses.length,
      data: depenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer une dépense par ID
export const getDepenseById = async (req, res) => {
  try {
    const depense = await Depense.findById(req.params.id).populate(
      "utilisateur",
      "nom email"
    );

    if (!depense) {
      return res.status(404).json({ message: "Dépense non trouvée" });
    }

    res.status(200).json(depense);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Mettre à jour une dépense
export const updateDepense = async (req, res) => {
  try {
    const depense = await Depense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!depense) {
      return res.status(404).json({ message: "Dépense non trouvée" });
    }

    res.status(200).json({
      message: "Dépense mise à jour avec succès",
      data: depense,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprimer une dépense
export const deleteDepense = async (req, res) => {
  try {
    const depense = await Depense.findByIdAndDelete(req.params.id);

    if (!depense) {
      return res.status(404).json({ message: "Dépense non trouvée" });
    }

    res.status(200).json({ message: "Dépense supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
