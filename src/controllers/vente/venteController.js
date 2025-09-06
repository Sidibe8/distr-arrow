import Vente from "../../models/vente/Vente.js";

//  Créer une vente
export const creerVente = async (req, res) => {
  try {
    const userId = req.user.id;

    // Vérification que tous les produits ont un ID
    if (!req.body.produits?.every((p) => p.produit)) {
      return res
        .status(400)
        .json({ message: "Chaque produit doit avoir un ID valide." });
    }

    const nouvelleVente = new Vente({
      ...req.body,
      creePar: userId,
    });

    // Enregistrer la vente
    const venteEnregistree = await nouvelleVente.save();

    // Populer les relations correctement
    const ventePopulee = await venteEnregistree.populate([
      { path: "produits.produit" },
      { path: "creePar", select: "nom email" },
    ]);

    res
      .status(201)
      .json({ message: "Vente créée avec succès", data: ventePopulee });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//  Récupérer toutes les ventes
export const getVentes = async (req, res) => {
  try {
    const ventes = await Vente.find()
      .populate("produits.produit") // afficher infos produit
      .populate("creePar", "nom email"); // afficher infos utilisateur

    res.status(200).json({ count: ventes.length, data: ventes });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//  Récupérer une vente par ID
export const getVenteById = async (req, res) => {
  try {
    const vente = await Vente.findById(req.params.id)
      .populate("produits.produit")
      .populate("creePar", "nom email");

    if (!vente) {
      return res.status(404).json({ message: "Vente non trouvée" });
    }

    res.status(200).json(vente);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//  Mettre à jour une vente
export const updateVente = async (req, res) => {
  try {
    if (!req.body.produits?.every((p) => p.produit)) {
      return res
        .status(400)
        .json({ message: "Chaque produit doit avoir un ID valide." });
    }

    const vente = await Vente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("produits.produit")
      .populate("creePar", "nom email");

    if (!vente) return res.status(404).json({ message: "Vente non trouvée" });

    res
      .status(200)
      .json({ message: "Vente mise à jour avec succès", data: vente });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//  Supprimer une vente
export const deleteVente = async (req, res) => {
  try {
    const vente = await Vente.findByIdAndDelete(req.params.id);

    if (!vente) {
      return res.status(404).json({ message: "Vente non trouvée" });
    }

    res.status(200).json({ message: "Vente supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
