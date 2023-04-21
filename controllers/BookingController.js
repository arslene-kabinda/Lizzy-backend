const moment = require("moment");

const Booking = require("../models/BookingModel");

const APIFeatures = require("../utils/apiFeatures");

exports.createBooking = async (req, res) => {
  const { date, service, user, status, hairSalon } = req.body;
  console.log("_________create book________________", {
    date,
    service,
    user,
    status,
    hairSalon,
  });
  try {
    // eslint-disable-next-line prefer-const
    // let currentDate = moment();
    // const bookingDate = moment(new Date(date));
    // const momentString = bookingDate.format();
    // console.log(currentDate);
    // console.log({ momentString });
    // if (moment(currentDate).isBefore(momentString)) {
    //   console.log("____________________wrong____________________");
    //   res.status(400).json({
    //     status: "wrong date",
    //   });
    // } else {
    // const bodies = req.body;
    // bodies.user = req.decoded.id;
    console.log("____________________good____________________");
    const newBooking = await Booking.create({
      date,
      service,
      user,
      status,
      hairSalon,
    });
    console.log("____________________excellent____________________");
    res.status(201).json({
      status: "booking created successfully",
      data: {
        newBooking,
      },
    });
    // await sendMail({
    //   from: "arskabinda@gmail.com",
    //   to: newBooking.user.email,
    //   subject: "you have booked successfully!",
    //   html: "<p>Thank you for your booking we are waiting for you!</P>",
    // })
    //   .then(() => {
    //     console.log("email sent ");
    //   })
    //   .catch((error) => {
    //     console.error(error.response.body);
    //   });
    // await sendSms({
    //   to: newBooking.user.phoneNumber,
    //   body: `Thank you for using Lizzy!  you have chosen your appointment for the date ${newBooking.data}   `,
    // });
    // }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: err.code,
      message: err.code,
    });
  }
};

exports.getAllBooking = async (req, res) => {
  try {
    const features = new APIFeatures(Booking.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const bookings = (await features.query) || [];

    res.status(200).json({
      status: "success",
      numberOfHairSalon: Booking.length,
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
exports.getBookingByUser = async (req, res) => {
  try {
    const booking = await Booking.find({
      user: req.decoded.id,
    }).populate("user");
    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate([
      "hairSalon",
      "beautySalon",
      "service",
    ]);
    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      statusstatus: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Booking deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};
