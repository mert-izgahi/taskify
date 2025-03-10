import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import configs from "./configs";
import { connectDb } from "./lib/mongoose";
import { signIn, signUp, signOut } from "./controllers/auth.controller";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const PORT = configs.PORT;

// API routes
app.post("/api/sign-in", signIn);
app.post("/api/sign-up", signUp);
app.post("/api/sign-out", signOut);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});
