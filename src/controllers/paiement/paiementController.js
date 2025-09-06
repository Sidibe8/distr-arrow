import Paiement from "../../models/Paiement.js";
import StockSortie from "../../models/stock/StockSortie.js";

// Créer un paiement
export const createPaiement = async (req, res) => {
  try {
    const { stock_sortie_id, montant, mode } = req.body;

    // Vérifier que la sortie existe
    const stockSortie = await StockSortie.findById(stock_sortie_id);
    if (!stockSortie) {
      return res.status(404).json({ error: "Stock sortie introuvable" });
    }

    // Total déjà payé
    const totalDejaPaye = await Paiement.aggregate([
      { $match: { stock_sortie_id: stockSortie._id } },
      { $group: { _id: null, total: { $sum: "$montant" } } },
    ]);

    const montantDejaPaye =
      totalDejaPaye.length > 0 ? totalDejaPaye[0].total : 0;

    // Vérification montant_total
    const montantTotalSortie = Number(stockSortie.montant_total);
    const resteApayerAvant = montantTotalSortie - montantDejaPaye;

    console.log("=== DEBUG PAIEMENT ===");
    console.log("Montant total sortie :", montantTotalSortie);
    console.log("Montant déjà payé :", montantDejaPaye);
    console.log("Reste à payer avant ce paiement :", resteApayerAvant);
    console.log("Montant demandé :", montant);

    if (montant > resteApayerAvant) {
      return res
        .status(400)
        .json({ error: "Le montant dépasse le reste à payer" });
    }

    const reste_a_payer = resteApayerAvant - montant;

    const paiement = new Paiement({
      stock_sortie_id,
      montant,
      mode,
      reste_a_payer,
    });

    await paiement.save();
    res.status(201).json(paiement);
  } catch (err) {
    console.error("Erreur lors de la création du paiement :", err);
    res.status(400).json({ error: err.message });
  }
};

// Lister tous les paiements
export const getPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find()
      .populate("stock_sortie_id")
      .sort({ date: -1 });
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lister les paiements d'une sortie spécifique
export const getPaiementsBySortie = async (req, res) => {
  try {
    const { stock_sortie_id } = req.params;
    const paiements = await Paiement.find({ stock_sortie_id }).sort({
      date: -1,
    });
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un paiement
export const updatePaiement = async (req, res) => {
  try {
    const { montant, mode } = req.body;

    // Chercher le paiement existant
    const paiementExistant = await Paiement.findById(req.params.id);
    if (!paiementExistant) {
      return res.status(404).json({ error: "Paiement introuvable" });
    }

    // Récupérer la sortie associée
    const stockSortie = await StockSortie.findById(
      paiementExistant.stock_sortie_id
    );
    if (!stockSortie) {
      return res.status(404).json({ error: "Stock sortie introuvable" });
    }

    // Total déjà payé (hors ce paiement)
    const totalDejaPaye = await Paiement.aggregate([
      {
        $match: {
          stock_sortie_id: stockSortie._id,
          _id: { $ne: paiementExistant._id }, // exclure ce paiement
        },
      },
      { $group: { _id: null, total: { $sum: "$montant" } } },
    ]);

    const montantDejaPaye =
      totalDejaPaye.length > 0 ? totalDejaPaye[0].total : 0;

    // Nouveau reste à payer après modification
    const montantTotalSortie = Number(stockSortie.montant_total);
    const resteApayerAvant = montantTotalSortie - montantDejaPaye;

    if (montant > resteApayerAvant) {
      return res
        .status(400)
        .json({ error: "Le montant dépasse le reste à payer" });
    }

    const reste_a_payer = resteApayerAvant - montant;

    // Mise à jour du paiement
    paiementExistant.montant = montant ?? paiementExistant.montant;
    paiementExistant.mode = mode ?? paiementExistant.mode;
    paiementExistant.reste_a_payer = reste_a_payer;

    await paiementExistant.save();

    res.json(paiementExistant);
  } catch (err) {
    console.error("Erreur updatePaiement :", err);
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un paiement
export const deletePaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findByIdAndDelete(req.params.id);
    if (!paiement)
      return res.status(404).json({ error: "Paiement introuvable" });
    res.json({ message: "Paiement supprimé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
