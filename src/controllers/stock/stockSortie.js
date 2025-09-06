import Stock from "../../models/stock/Stock.js";
import StockSortie from "../../models/stock/StockSortie.js";

// Créer une sortie de stock
export const creerStockSortie = async (req, res) => {
  try {
    const { produit_id, libelle, quantite, montant_total, statut } = req.body;
    const userId = req.user.id; // fourni par le middleware d'auth

    // Vérifier que le produit existe
    const produit = await Stock.findById(produit_id);
    if (!produit)
      return res.status(404).json({ message: "Produit introuvable" });

    // Vérifier qu'il y a assez de stock si statut confirmé
    if (statut === "confirmé" && quantite > produit.quantiteEnStock) {
      return res
        .status(400)
        .json({ message: "Quantité insuffisante en stock" });
    }

    // Créer la sortie
    const sortie = new StockSortie({
      produit_id,
      libelle,
      quantite,
      montant_total: montant_total || 0,
      statut: statut || "en attente",
      creePar: userId,
    });

    const sortieEnregistree = await sortie.save();

    // Mettre à jour le stock si statut confirmé
    if (sortie.statut === "confirmé") {
      produit.quantiteEnStock -= quantite;
      await produit.save();
    }

    res
      .status(201)
      .json({ message: "Sortie créée avec succès", data: sortieEnregistree });
  } catch (error) {
    console.error("Erreur creerStockSortie:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer toutes les sorties
export const getStockSorties = async (req, res) => {
  try {
    const sorties = await StockSortie.find()
      .populate("produit_id", "nom quantiteEnStock prixVente") // infos produit
      .populate("creePar", "nom email"); // infos utilisateur

    res.status(200).json({ count: sorties.length, data: sorties });
  } catch (error) {
    console.error("Erreur getStockSorties:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer une sortie par ID
export const getStockSortieById = async (req, res) => {
  try {
    const sortie = await StockSortie.findById(req.params.id)
      .populate("produit_id", "nom quantiteEnStock prixVente")
      .populate("creePar", "nom email");

    if (!sortie) return res.status(404).json({ message: "Sortie introuvable" });

    res.status(200).json(sortie);
  } catch (error) {
    console.error("Erreur getStockSortieById:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Mettre à jour une sortie
export const updateStockSortie = async (req, res) => {
  try {
    const { libelle, quantite, montant_total, statut } = req.body;

    const sortie = await StockSortie.findById(req.params.id);
    if (!sortie) return res.status(404).json({ message: "Sortie introuvable" });

    const produit = await Stock.findById(sortie.produit_id);
    if (!produit)
      return res.status(404).json({ message: "Produit introuvable" });

    // Si on change la quantité ou le statut, ajuster le stock
    if (statut === "confirmé") {
      // Recalculer le stock : remettre la quantité précédente et soustraire la nouvelle
      const quantiteDiff = quantite - sortie.quantite;
      if (quantiteDiff > produit.quantiteEnStock) {
        return res
          .status(400)
          .json({ message: "Quantité insuffisante en stock" });
      }
      produit.quantiteEnStock -= quantiteDiff;
      await produit.save();
    } else if (sortie.statut === "confirmé" && statut === "annulé") {
      // Si on annule une sortie confirmée, remettre le stock
      produit.quantiteEnStock += sortie.quantite;
      await produit.save();
    }

    // Mettre à jour les champs
    sortie.libelle = libelle ?? sortie.libelle;
    sortie.quantite = quantite ?? sortie.quantite;
    sortie.montant_total = montant_total ?? sortie.montant_total;
    sortie.statut = statut ?? sortie.statut;

    const sortieMiseAJour = await sortie.save();

    res.status(200).json({
      message: "Sortie mise à jour avec succès",
      data: sortieMiseAJour,
    });
  } catch (error) {
    console.error("Erreur updateStockSortie:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprimer une sortie
export const deleteStockSortie = async (req, res) => {
  try {
    const sortie = await StockSortie.findById(req.params.id);
    if (!sortie) return res.status(404).json({ message: "Sortie introuvable" });

    // Si la sortie était confirmée, remettre le stock
    if (sortie.statut === "confirmé") {
      const produit = await Stock.findById(sortie.produit_id);
      if (produit) {
        produit.quantiteEnStock += sortie.quantite;
        await produit.save();
      }
    }

    // Supprimer la sortie
    await StockSortie.deleteOne({ _id: sortie._id });

    res.status(200).json({ message: "Sortie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteStockSortie:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
