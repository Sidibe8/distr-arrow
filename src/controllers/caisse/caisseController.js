import Caisse from "../../models/caisse/Caisse.js";

/**
 * 📌 Créer un mouvement de caisse (entrée ou sortie)
 */
export const creerMouvement = async (req, res) => {
  try {
    const nouveauMouvement = new Caisse({
      ...req.body,
      creePar: req.user._id, // si tu as un middleware auth
    });

    const mouvement = await nouveauMouvement.save();

    res.status(201).json({
      message: "Mouvement de caisse créé avec succès",
      data: mouvement,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du mouvement",
      error: error.message,
    });
  }
};

/**
 * 📌 Récupérer tous les mouvements de caisse
 */
export const getMouvements = async (req, res) => {
  try {
    const mouvements = await Caisse.find()
      .populate("vente")
      .populate("creePar", "nom email"); // si tu veux afficher l'utilisateur

    res.status(200).json({
      count: mouvements.length,
      data: mouvements,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des mouvements",
      error: error.message,
    });
  }
};

/**
 * 📌 Récupérer un mouvement de caisse par ID
 */
export const getMouvementById = async (req, res) => {
  try {
    const mouvement = await Caisse.findById(req.params.id)
      .populate("vente")
      .populate("creePar", "nom email");

    if (!mouvement) {
      return res.status(404).json({ message: "Mouvement non trouvé" });
    }

    res.status(200).json(mouvement);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du mouvement",
      error: error.message,
    });
  }
};

/**
 * 📌 Mettre à jour un mouvement de caisse
 */
export const updateMouvement = async (req, res) => {
  try {
    const mouvement = await Caisse.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("vente")
      .populate("creePar", "nom email");

    if (!mouvement) {
      return res.status(404).json({ message: "Mouvement non trouvé" });
    }

    res.status(200).json({
      message: "Mouvement mis à jour avec succès",
      data: mouvement,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du mouvement",
      error: error.message,
    });
  }
};

/**
 * 📌 Supprimer un mouvement de caisse
 */
export const deleteMouvement = async (req, res) => {
  try {
    const mouvement = await Caisse.findByIdAndDelete(req.params.id);

    if (!mouvement) {
      return res.status(404).json({ message: "Mouvement non trouvé" });
    }

    res.status(200).json({ message: "Mouvement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du mouvement",
      error: error.message,
    });
  }
};
