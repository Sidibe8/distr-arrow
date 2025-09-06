// --------------------
// Génération automatique
// --------------------

import Ticket from "../../models/facture/Bon.js";

// Générer un numéro unique (format proche de ton exemple)
const generateNumero = () => {
  const prefix = "821"; // exemple de préfixe fixe
  const timestamp = Date.now().toString().slice(-12); // derniers 12 chiffres du timestamp
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // 3 chiffres aléatoires
  return `${prefix}${timestamp}${random}`;
};

// Générer un code unique à 4 chiffres
const generateCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(1000 + Math.random() * 9000).toString(); // 4 chiffres
    exists = await Ticket.findOne({ code });
  }

  return code;
};

// --------------------
// CRUD + vérification
// --------------------

// Create (Créer un ticket)
export const createTicket = async (req, res) => {
  try {
    const {
      montant,
      devise,
      client,
      dateDebutValidite,
      dateFinValidite,
      numeroVehicule,
    } = req.body;

    const numero = generateNumero();
    const code = await generateCode();

    const ticket = new Ticket({
      numero,
      montant,
      devise,
      client,
      code,
      dateDebutValidite,
      dateFinValidite,
      numeroVehicule,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du ticket" });
  }
};

// Read All (Récupérer tous les tickets)
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tickets" });
  }
};

// Read One (Récupérer un ticket par numéro)
export const getTicketByNumero = async (req, res) => {
  try {
    const { numero } = req.params;
    const ticket = await Ticket.findOne({ numero });

    if (!ticket) return res.status(404).json({ message: "Ticket non trouvé" });
    res.status(200).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du ticket" });
  }
};

// Update (Mettre à jour un ticket par numéro)
export const updateTicket = async (req, res) => {
  try {
    const { numero } = req.params;
    const updateData = req.body;

    // Ne pas modifier le numéro généré automatiquement
    if (updateData.numero) delete updateData.numero;

    const ticket = await Ticket.findOneAndUpdate({ numero }, updateData, {
      new: true,
    });
    if (!ticket) return res.status(404).json({ message: "Ticket non trouvé" });

    res.status(200).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du ticket" });
  }
};

// Delete (Supprimer un ticket par numéro)
export const deleteTicket = async (req, res) => {
  try {
    const { numero } = req.params;
    const ticket = await Ticket.findOneAndDelete({ numero });
    if (!ticket) return res.status(404).json({ message: "Ticket non trouvé" });

    res.status(200).json({ message: "Ticket supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du ticket" });
  }
};

// Check Validity (Vérifier la validité d’un ticket)
export const checkTicketValidity = async (req, res) => {
  try {
    const { numero } = req.params;
    const ticket = await Ticket.findOne({ numero });

    if (!ticket) {
      return res
        .status(404)
        .json({ valide: false, message: "Ticket non trouvé" });
    }

    const now = new Date();
    const isValid =
      now >= ticket.dateDebutValidite && now <= ticket.dateFinValidite;

    res.status(200).json({
      valide: isValid,
      ticket: {
        numero: ticket.numero,
        code: ticket.code,
        dateDebutValidite: ticket.dateDebutValidite,
        dateFinValidite: ticket.dateFinValidite,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification du ticket" });
  }
};
