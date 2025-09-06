import Stock from "../../models/stock/Stock.js";

/**
 * 📌 Créer un nouvel article en stock
 */
export const creerStock = async (req, res) => {
  try {
    const nouveauStock = new Stock({
      ...req.body,
      creePar: req.userId,
    });

    const stock = await nouveauStock.save();

    res.status(201).json({
      message: "Stock créé avec succès",
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du stock",
      error: error.message,
    });
  }
};

/**
 * 📌 Récupérer toute la liste des stocks
 */
export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate("creePar", "nom email");
    res.status(200).json({
      count: stocks.length,
      data: stocks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des stocks",
      error: error.message,
    });
  }
};

/**
 * 📌 Récupérer un stock par ID
 */
export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock non trouvé" });
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du stock",
      error: error.message,
    });
  }
};

/**
 * 📌 Mettre à jour un stock
 */
export const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("creePar", "nom email");

    if (!stock) {
      return res.status(404).json({ message: "Stock non trouvé" });
    }

    res.status(200).json({
      message: "Stock mis à jour avec succès",
      data: stock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du stock",
      error: error.message,
    });
  }
};

/**
 * 📌 Supprimer un stock
 */
export const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock non trouvé" });
    }

    res.status(200).json({ message: "Stock supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du stock",
      error: error.message,
    });
  }
};
