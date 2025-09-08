import { logout } from "../controllers/auth/authController.js";

export const sessionWatcher = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(); // pas de token → on continue
  }

  const token = authHeader.split(" ")[1];

  try {
    // Token encore valide → on ne fait rien
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // On appelle directement la fonction logout
      // Créons un faux req/res pour simuler l'appel
      const fakeReq = { headers: { authorization: `Bearer ${token}` } };
      const fakeRes = {
        status: () => fakeRes,
        json: () => {},
      };

      await logout(fakeReq, fakeRes); // ferme la session dans la DB
    }
    return next(); // continue vers la route (protect bloquera l'accès)
  }
};
