import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import configs from "./configs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


const PORT = configs.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});