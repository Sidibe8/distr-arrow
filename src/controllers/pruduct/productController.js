import Produit from "../../models/produit/Produit.js";

// ✅ Créer un produit
export const creerProduit = async (req, res) => {
  try {
    const nouveauProduit = new Produit(req.body);
    const produit = await nouveauProduit.save();

    res.status(201).json({
      message: "Produit créé avec succès",
      data: produit,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Récupérer tous les produits
export const getProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json({ count: produits.length, data: produits });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Récupérer un produit par ID
export const getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Mettre à jour un produit
export const updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({
      message: "Produit mis à jour avec succès",
      data: produit,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Supprimer un produit
export const deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
