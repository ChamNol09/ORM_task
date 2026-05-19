require("dotenv").config();
const express = require("express");
const app = express();
const { globalLimiter } = require("./middlewares/rateLimit.middleware");
const Router = require("./routes/index.route");

app.use(express.json());
app.use(globalLimiter);

app.use("/api", Router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
