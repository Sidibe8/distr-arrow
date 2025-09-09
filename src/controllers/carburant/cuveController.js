import Cuve from "../../models/carburant/Cuve.js";

// ✅ Ajouter une cuve
export const ajouterCuve = async (req, res) => {
  try {
    const {
      nom,
      typeCarburant,
      capaciteTotale,
      niveauActuel,
      localisation,
      note,
    } = req.body;

    // Vérifier que le niveau actuel ne dépasse pas la capacité totale
    if (niveauActuel > capaciteTotale) {
      return res
        .status(400)
        .json({ message: "Le niveau actuel dépasse la capacité totale" });
    }

    const cuve = new Cuve({
      nom,
      typeCarburant,
      capaciteTotale,
      niveauActuel,
      localisation,
      note,
    });

    await cuve.save();
    res.status(201).json({
      message: "Cuve ajoutée avec succès",
      data: cuve,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Obtenir toutes les cuves
export const getCuves = async (req, res) => {
  try {
    const cuves = await Cuve.find();
    res.status(200).json({
      count: cuves.length,
      data: cuves,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Obtenir une cuve par ID
export const getCuveById = async (req, res) => {
  try {
    const cuve = await Cuve.findById(req.params.id);
    if (!cuve) return res.status(404).json({ message: "Cuve non trouvée" });

    res.status(200).json(cuve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mettre à jour une cuve
export const updateCuve = async (req, res) => {
  try {
    const cuve = await Cuve.findById(req.params.id);
    if (!cuve) return res.status(404).json({ message: "Cuve non trouvée" });

    // Si on essaie de mettre à jour le niveau actuel
    if (req.body.niveauActuel) {
      const capacite = req.body.capaciteTotale || cuve.capaciteTotale;

      if (req.body.niveauActuel > capacite) {
        return res
          .status(400)
          .json({ message: "Le niveau actuel dépasse la capacité totale" });
      }
    }

    Object.assign(cuve, req.body);
    await cuve.save();

    res.status(200).json({
      message: "Cuve mise à jour avec succès",
      data: cuve,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Supprimer une cuve
export const deleteCuve = async (req, res) => {
  try {
    const cuve = await Cuve.findById(req.params.id);
    if (!cuve) return res.status(404).json({ message: "Cuve non trouvée" });

    await cuve.deleteOne();
    res.status(200).json({ message: "Cuve supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
