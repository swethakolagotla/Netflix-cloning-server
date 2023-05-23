const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.js");
const authRouter = require("./routes/authRoute.js");
const userRouter = require("./routes/userRoute.js");
const movieRouter = require("./routes/movieRoute.js");
const listRouter = require("./routes/listRoute.js");
const cors = require("cors");
const DB_Connection_String = process.env.DATABASE_CONNECTION_STRING.replace(
  "<mongodb_user>",
  process.env.DATABASE_USERNAME
).replace("<mongodb_password>", process.env.DATABASE_PASSWORD);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_Connection_String, {
    useNewUrlParser: true,
  })
  .then((con) => console.log("Database connection established....."));

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/list", listRouter);
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`listening to ${port}.....`));
