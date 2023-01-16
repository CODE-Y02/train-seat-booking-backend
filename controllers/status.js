const Coach = require("../models/Coach");
const Row = require("../models/Row");

module.exports.bookedRowsAndSeats = async (req, res) => {
  try {
    const rowData = await Row.findAll();

    let temp = await rowData.map(async (row) => {
      let seats = await row.getSeats();
      //   console.log(row);
      const { id, isBooked, vacency } = row;
      return {
        id,
        isBooked,
        vacency,
        seats,
      };
    });
    // console.log(temp);

    const data = await Promise.all(temp);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};

module.exports.totalVacentSeats = async (req, res) => {
  try {
    const data = await Coach.findOne();
    // console.log("hello");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};
