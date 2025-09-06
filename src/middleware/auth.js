import jwt from "jsonwebtoken";
import User from "../models/user/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.id;
      req.user = await User.findById(decoded.id).populate("role");
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Session expirée ou invalide" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Non autorisé, pas de token" });
  }
};
