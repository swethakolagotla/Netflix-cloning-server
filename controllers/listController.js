const List = require("../models/listModel.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");
const ApplicationError = require("../utils/ApplicationError.js");

//create list:

const createList = catchErrorAsync(async (req, res) => {
  const list = await List.create(req.body);
  res.status(201).json({
    status: "Movie has successfully created",
    list,
  });
});

//delete:
const deleteList = catchErrorAsync(async (req, res) => {
  await List.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "The list has been deleted...",
  });
});

//get all list:
const displayAllList = catchErrorAsync(async (req, res, next) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  if (typeQuery) {
    if (genreQuery) {
      list = await List.aggregate([
        {
          $sample: { size: 15 },
        },
        {
          $match: { type: typeQuery, genre: genreQuery },
        },
      ]);
    } else {
      list = await List.aggregate([
        {
          $sample: { size: 15 },
        },
        {
          $match: { type: typeQuery },
        },
      ]);
    }
  } else {
    list = await List.aggregate([{ $sample: { size: 10 } }]);
  }

  res.status(200).json({
    status: "success",
    result: list.length,
    list,
  });
});

module.exports = {
  createList,
  deleteList,
  displayAllList,
};
