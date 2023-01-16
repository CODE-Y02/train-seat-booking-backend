const Coach = require("../models/Coach");
const Row = require("../models/Row");
const Seat = require("../models/Seat");

module.exports.bookSeats = async (req, res, next) => {
  try {
    const seats_to_book = +req.body.seats; // no of seats to book
    const coach = await Coach.findOne();
    console.log(coach);
    if (seats_to_book > coach.available) {
      return res
        .status(406)
        .json({ success: false, error: "No vacent Seats " });
    }

    // find all rows in desc order
    let rows = await Row.findAll({ order: [["id", "DESC"]] });
    // console.log("\n\n\n   ");
    // console.log(rows);
    // console.log("\n\n\n   ");

    let newSeats = [];

    // if !rows --> first booking --> create row
    if (!rows.length || !rows) {
      let vacency = 7;
      if (coach.available < 7) vacency = coach.available % 7;

      let r = await Row.create({ vacency, coachId: coach.id });

      let n = seats_to_book;
      //   console.log(n);
      let p = []; // unresolved promise arr  p ;

      let i = 0;
      while (i < n) {
        p.push(r.createSeat({ isBooked: true }));
        i++;
      }

      //   console.log("\n\n\n   ");
      //   console.log(p);
      //   console.log("\n\n\n   ");

      newSeats = await Promise.all(p);
      //   console.log("\n\n\n   ");
      //   console.log(newSeats);
      //   console.log("\n\n\n   ");

      vacency = vacency - n;

      if (vacency == 0) {
        // row is booked
        await Row.update({ vacency, isBooked: true }, { where: { id: r.id } });
      } else {
        await Row.update({ vacency }, { where: { id: r.id } });
      }
    } else if (rows.length) {
      // if row
      const vacentRow = await Row.findOne({
        order: [["id", "DESC"]],
        where: {
          isBooked: false,
        },
      }); // most recent
      // filter row find vacent in recent row

      // if row.vacency >= n --> fill it

      //   console.log(" \n\n\n >>>>>", vacentRow);
      let vacency = vacentRow.vacency;
      let n = seats_to_book;

      if (vacency >= n) {
        let p = [];

        while (n) {
          p.push(Seat.create({ rowId: vacentRow.id, isBooked: true }));
          vacency--;
          n--;
        }

        if (vacency == 0) {
          // row is booked
          await Row.update(
            { vacency, isBooked: true },
            { where: { id: vacentRow.id } }
          );
        } else {
          await Row.update({ vacency }, { where: { id: vacentRow.id } });
        }

        // console.log("\n\n\n   ");
        // console.log(p);
        // console.log("\n\n\n   ");

        newSeats = await Promise.all(p);
        // console.log("\n\n\n   ");
        // console.log(newSeats);
        // console.log("\n\n\n   ");
      } else {
        // if row.vacency < n
        let p = [];

        n = n - vacency; // new seats in new row
        while (vacency) {
          // --> fill vaccency
          const newSeat = Seat.create({ rowId: vacentRow.id, isBooked: true });
          p.push(newSeat);
          vacency--;
        }

        if (vacency == 0) {
          // row is booked
          await Row.update(
            { vacency, isBooked: true },
            { where: { id: vacentRow.id } }
          );
        } else {
          await Row.update({ vacency }, { where: { id: vacentRow.id } });
        }

        // -->  create new row --> fill remaning seat ( n-v)

        let vacencyInNewRow = 7;
        if (coach.available < 7) vacencyInNewRow = coach.available;

        const newRow = await Row.create({
          vacency: vacencyInNewRow,
          coachId: coach.id,
        });

        while (n) {
          const newSeat = Seat.create({ rowId: newRow.id, isBooked: true });
          p.push(newSeat);
          vacencyInNewRow--;
          n--;
        }

        newSeats = await Promise.all(p);

        if (vacencyInNewRow == 0) {
          await newRow.update({ vacency: 0, isBooked: true });
        } else {
          await newRow.update({ vacency: vacencyInNewRow });
        }
      }
    }

    await coach.update({ available: coach.available - seats_to_book });
    return res
      .status(200)
      .json({ success: true, seats: newSeats, message: "Seats Booked" });
  } catch (error) {
    console.log("\n\n err in bookSeats \n\n");
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};
