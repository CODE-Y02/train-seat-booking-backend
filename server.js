const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
const bookingRoute = require("./routes/booking.js");
const statusRoute = require("./routes/status.js");
const adminRoutes = require("./routes/admin.js");

app.use(bookingRoute);
app.use(statusRoute);
app.use(adminRoutes);

app.use((req, res, next) => {
  return res.status(404).json({ success: false, error: "page not found" });
});

// models
const Coach = require("./models/Coach.js");
const Row = require("./models/Row.js");
const Seat = require("./models/Seat.js");

Coach.hasMany(Row);
Row.belongsTo(Coach);

Row.hasMany(Seat);
Seat.belongsTo(Row);

const startApp = async () => {
  try {
    await sequelize.sync();

    let coach = await Coach.findByPk(1);

    if (!coach) {
      coach = await Coach.create({
        totalSeats: 80,
        available: 80,
      });
    }
    app.listen(process.env.SERVER_PORT || 3000, () => {
      console.log("\n\n  app.running at ", process.env.SERVER_PORT || 3000);
    });
  } catch (error) {
    console.log(`\n ${error} \n`);
  }
};

startApp();
