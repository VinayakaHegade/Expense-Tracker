import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const PORT = 4000;
const app = express();

app.use(cors);

await mongoose.connect(
  "mongodb+srv://vinayak:bitfumes123@expense-tracker-mern.msksuws.mongodb.net/?retryWrites=true&w=majority"
);
console.log("MongoDB connection is successful");
// .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
