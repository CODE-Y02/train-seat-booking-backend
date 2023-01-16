const Coach = require("../models/Coach");
const sequelize = require("./database");

module.exports.resetServive = async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });

    let coach = await Coach.findByPk(1);

    if (!coach) {
      coach = await Coach.create({
        totalSeats: 80,
        available: 80,
      });
    }

    // console.log("\n\n\n\n >>>>>>>>>>>>>>>>>.");
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500);
  }
};
