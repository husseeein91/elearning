const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Database Connection

// Middleware Initiate
app.use(express.json({ extended: false }));
app.use("/uploads/", express.static("uploads"));

// test Route
app.get("/", (req, res) => res.send("Api Running"));

// Routes Assignment
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/student", require("./routes/api/studentAuth"));
app.use("/api/sessions", require("./routes/api/sessions"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost/e-learning", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
    console.log("mongodb connected");
  } catch (err) {
    console.error(err.message);
  }
};

run();
