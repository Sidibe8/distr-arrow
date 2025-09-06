import app from "../src/server.js";
import serverless from "serverless-http";

module.exports = serverless(app);
