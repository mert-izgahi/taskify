﻿import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI,
};
