import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import configs from "./configs";
import { connectDb } from "./lib/mongoose";
import { auth, withAuth } from "./lib/auth";
import { signIn, signUp, signOut } from "./controllers/auth.controller";
import {
  createTag,
  deleteTag,
  updateTag,
  getAllTags,
} from "./controllers/tag.controller";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(auth);
const PORT = configs.PORT;

// API routes
app.post("/api/sign-in", signIn);
app.post("/api/sign-up", signUp);
app.post("/api/sign-out", signOut);

app.post("/api/tags", withAuth, createTag);
app.get("/api/tags", withAuth, getAllTags);
app.put("/api/tags/:id", withAuth, updateTag);
app.delete("/api/tags/:id", withAuth, deleteTag);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});
