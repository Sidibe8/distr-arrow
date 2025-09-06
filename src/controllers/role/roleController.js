import Role from "../../models/role/Role.js";

// GET all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single role
export const getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Rôle non trouvé" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE role
export const createRole = async (req, res) => {
  try {
    const { nom, permissions } = req.body;
    const role = new Role({ nom, permissions });
    const saved = await role.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE role
export const updateRole = async (req, res) => {
  try {
    const { nom, permissions } = req.body;
    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      { nom, permissions },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE role
export const deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Rôle supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
