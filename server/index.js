import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.configDotenv();
import {
  addReview,
  getAllCompany,
  getCompanyDEtials,
  newCompany,
} from "./controllers.js";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/company", newCompany);
app.get("/company", getAllCompany);
app.post("/:companyId/reviews", addReview);
app.get("/company/:companyId", getCompanyDEtials);
app.get("/health", (req, res) => {
  return res.status(200).json({ status: "Ok" });
});
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`Database Connected`);
    app.listen(process.env.PORT, () => {
      console.log(`server is running at port${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database Connection Failed ${err}`);
  });
