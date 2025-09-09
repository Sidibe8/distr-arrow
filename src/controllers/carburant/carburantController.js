import Carburant from "../../models/carburant/Carburant.js";
import Cuve from "../../models/carburant/Cuve.js";

// Ajouter une sortie de carburant
export const ajouterCarburant = async (req, res) => {
  try {
    const {
      cuve,
      quantiteLitres,
      prixUnitaire,
      vehicule,
      typeCarburant,
      sourcePaiement,
      note,
    } = req.body;

    const utilisateur = req.userId; // ← utiliser l'ID depuis le token

    // Vérifier si la cuve existe
    const cuveData = await Cuve.findById(cuve);
    if (!cuveData) return res.status(404).json({ message: "Cuve non trouvée" });

    // Vérifier stock suffisant
    if (cuveData.niveauActuel < quantiteLitres) {
      return res
        .status(400)
        .json({ message: "Stock insuffisant dans la cuve" });
    }

    // Créer l'enregistrement carburant
    const montantTotal = quantiteLitres * prixUnitaire;
    const carburant = new Carburant({
      cuve,
      vehicule,
      typeCarburant,
      quantiteLitres,
      prixUnitaire,
      montantTotal,
      sourcePaiement,
      utilisateur, // ← correct maintenant
      note,
    });

    await carburant.save();

    // Décrémenter le niveau de la cuve
    cuveData.niveauActuel -= quantiteLitres;
    await cuveData.save();

    res.status(201).json(carburant);
  } catch (error) {
    console.error("Erreur serveur ajouterCarburant:", error);
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les sorties de carburant
export const getCarburants = async (req, res) => {
  try {
    const carburants = await Carburant.find()
      .populate("cuve", "nom typeCarburant niveauActuel")
      .populate("utilisateur", "nom email");
    res.status(200).json(carburants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une sortie spécifique
export const getCarburantById = async (req, res) => {
  try {
    const carburant = await Carburant.findById(req.params.id)
      .populate("cuve", "nom typeCarburant niveauActuel")
      .populate("utilisateur", "nom email");

    if (!carburant)
      return res.status(404).json({ message: "Carburant non trouvé" });
    res.status(200).json(carburant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une sortie
export const updateCarburant = async (req, res) => {
  try {
    const carburant = await Carburant.findById(req.params.id);
    if (!carburant)
      return res.status(404).json({ message: "Carburant non trouvé" });

    const cuveData = await Cuve.findById(carburant.cuve);
    if (!cuveData) return res.status(404).json({ message: "Cuve non trouvée" });

    // Si la quantité change → ajuster le stock
    if (
      req.body.quantiteLitres &&
      req.body.quantiteLitres !== carburant.quantiteLitres
    ) {
      const difference = req.body.quantiteLitres - carburant.quantiteLitres;

      if (difference > 0 && cuveData.niveauActuel < difference) {
        return res
          .status(400)
          .json({ message: "Stock insuffisant dans la cuve" });
      }

      cuveData.niveauActuel -= difference;
      await cuveData.save();
    }

    Object.assign(carburant, req.body);
    if (req.body.quantiteLitres && req.body.prixUnitaire) {
      carburant.montantTotal = req.body.quantiteLitres * req.body.prixUnitaire;
    }

    await carburant.save();
    res.status(200).json(carburant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Supprimer une sortie
export const deleteCarburant = async (req, res) => {
  try {
    const carburant = await Carburant.findById(req.params.id);
    if (!carburant)
      return res.status(404).json({ message: "Carburant non trouvé" });

    const cuveData = await Cuve.findById(carburant.cuve);
    if (cuveData) {
      // Restaurer le stock
      cuveData.niveauActuel += carburant.quantiteLitres;
      await cuveData.save();
    }

    await carburant.deleteOne();
    res.status(200).json({ message: "Carburant supprimé et stock ajusté" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
