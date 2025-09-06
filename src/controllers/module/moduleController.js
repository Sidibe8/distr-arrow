import Module from "../../models/mod/Module.js";

// Créer un rôle
export const createModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les rôles
export const getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un rôle
export const updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(module);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un rôle
export const deleteModule = async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: "Module supprimé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
