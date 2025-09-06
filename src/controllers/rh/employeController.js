import Employe from "../../models/rh/Employe.js";

/**
 * ✅ Créer un employé
 */
export const creerEmploye = async (req, res) => {
  try {
    const employe = new Employe(req.body);
    await employe.save();
    res.status(201).json({
      message: "Employé créé avec succès",
      data: employe,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Récupérer tous les employés
 */
export const getEmployes = async (req, res) => {
  try {
    const employes = await Employe.find();
    res.status(200).json({ count: employes.length, data: employes });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Récupérer un employé par ID
 */
export const getEmployeById = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    res.status(200).json(employe);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Mettre à jour un employé
 */
export const updateEmploye = async (req, res) => {
  try {
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    res.status(200).json({
      message: "Employé mis à jour avec succès",
      data: employe,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Supprimer un employé
 */
export const deleteEmploye = async (req, res) => {
  try {
    const employe = await Employe.findByIdAndDelete(req.params.id);
    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ----------------------------------------------------------------------
// 🎯 Gestion des Congés
// ----------------------------------------------------------------------

/**
 * ✅ Ajouter un congé à un employé
 */
export const ajouterConge = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe)
      return res.status(404).json({ message: "Employé non trouvé" });

    employe.conges.push(req.body);
    await employe.save();

    res
      .status(201)
      .json({ message: "Congé ajouté avec succès", data: employe });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Mettre à jour le statut d’un congé
 */
export const updateConge = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe)
      return res.status(404).json({ message: "Employé non trouvé" });

    const conge = employe.conges.id(req.params.congeId);
    if (!conge) return res.status(404).json({ message: "Congé non trouvé" });

    Object.assign(conge, req.body);
    await employe.save();

    res
      .status(200)
      .json({ message: "Congé mis à jour avec succès", data: employe });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Supprimer un congé
 */
export const deleteConge = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe)
      return res.status(404).json({ message: "Employé non trouvé" });

    employe.conges = employe.conges.filter(
      (c) => c._id.toString() !== req.params.congeId
    );
    await employe.save();

    res
      .status(200)
      .json({ message: "Congé supprimé avec succès", data: employe });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ----------------------------------------------------------------------
// 🎯 Gestion de la Paie
// ----------------------------------------------------------------------

/**
 * ✅ Ajouter une fiche de paie
 */
export const ajouterPaie = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe)
      return res.status(404).json({ message: "Employé non trouvé" });

    employe.paies.push(req.body);
    await employe.save();

    res
      .status(201)
      .json({ message: "Paie ajoutée avec succès", data: employe });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Mettre à jour une paie
 */
export const updatePaie = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe)
      return res.status(404).json({ message: "Employé non trouvé" });

    const paie = employe.paies.id(req.params.paieId);
    if (!paie) return res.status(404).json({ message: "Paie non trouvée" });

    Object.assign(paie, req.body);
    await employe.save();

    res
      .status(200)
      .json({ message: "Paie mise à jour avec succès", data: employe });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

/**
 * ✅ Supprimer une paie
 */
export const deletePaie = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe)
      return res.status(404).json({ message: "Employé non trouvé" });

    employe.paies = employe.paies.filter(
      (p) => p._id.toString() !== req.params.paieId
    );
    await employe.save();

    res
      .status(200)
      .json({ message: "Paie supprimée avec succès", data: employe });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
