import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./model/KPI.js";
import { kpis } from "./data/data.js";

/*  CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
// console.log("🚀 ~ file: index.js:27 ~ PORT:", PORT);
console.log("MONGO_URL:", process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis);
  })
  .catch((error) => console.log(`${error} did not connect`));
