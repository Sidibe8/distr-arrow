import "dotenv/config";
export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};
