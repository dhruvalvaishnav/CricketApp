import asyncHandler from "express-async-handler";
import Cricketer from "../models/cricketersModel.js";

// @desc       Fetch all cricketers
// @route      GET  /api/cricketers
// @access     Public
const getCricketers = asyncHandler(async (req, res) => {
  const pageSize = 6;
  //  ?pageNumber
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Cricketer.countDocuments({ ...keyword });

  const cricketers = await Cricketer.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ cricketers, page, pages: Math.ceil(count / pageSize) });
});

// @desc       Fetch single cricketers
// @route      GET  /api/cricketers/:id
// @access     Public
const getCricketerById = asyncHandler(async (req, res) => {
  const cricketer = await Cricketer.findById(req.params.id);

  if (cricketer) {
    res.json(cricketer);
  } else {
    res.status(404);
    throw new Error("cricketer not found!");
  }
});

// @desc       DELETE a cricketers
// @route      DELETE /api/cricketers/:id
// @access     Private/Admin
const deleteCricketer = asyncHandler(async (req, res) => {
  const cricketer = await Cricketer.findById(req.params.id);

  if (cricketer) {
    await cricketer.remove();

    res.json({ message: "Cricketer removed" });
  } else {
    res.status(404);
    throw new Error("Cricketer not found!");
  }
});

// @desc       Create a cricketer
// @route      POST /api/cricketers
// @access     Private/Admin
const createCricketer = asyncHandler(async (req, res) => {
  const cricketer = new Cricketer({
    name: "Sample name",
    image: "/images/sample.jpg",
    Born: "XXXX XX, XXXX, Place, State",
    Age: "XX years XXX days",
    Team: "XXX",
    Role: "Sample Role",
    Batting: "Sample Batting",
    Bowling: "Sample Bowling",
    ODI_100_50: "0/0",
    user: req.user._id,
  });

  const createdCricketer = await cricketer.save();
  res.status(201).json(createdCricketer);
});

// @desc       Update a cricketer
// @route      PUT /api/cricketers/:id
// @access     Private/Admin
const updateCricketer = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    Born,
    Age,
    Team,
    Role,
    Batting,
    Bowling,
    ODI_100_50,
  } = req.body;

  const cricketer = await Cricketer.findById(req.params.id);

  if (cricketer) {
    cricketer.name = name;
    cricketer.Born = Born;
    cricketer.image = image;
    cricketer.Age = Age;
    cricketer.Team = Team;
    cricketer.Role = Role;
    cricketer.Batting = Batting;
    cricketer.Bowling = Bowling;
    cricketer.ODI_100_50 = ODI_100_50;

    const updatedcricketer = await cricketer.save();
    res.json(updatedcricketer);
  } else {
    res.status(404);
    throw new Error("Cricketer not found");
  }
});

export {
  getCricketers,
  getCricketerById,
  deleteCricketer,
  createCricketer,
  updateCricketer,
};
