const Movie = require("../models/movieModel.js");
const catchErrorAsync = require("../utils/catchErrorAsync.js");
const ApplicationError = require("../utils/ApplicationError.js");

//create movie:

const createMovie = catchErrorAsync(async (req, res) => {
  const createMovie = await Movie.create(req.body);
  res.status(201).json({
    status: "Movie has successfully created",
    createMovie,
  });
});

//update:

const updateMovie = catchErrorAsync(async (req, res, next) => {
  console.log(req.params.id);
  const upmovie = await Movie.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  console.log(upmovie);
  res.status(201).json({
    status: "Movie has been updated successfully",
    upmovie,
  });
});

//delete:
const deleteMovie = catchErrorAsync(async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "The movie has been deleted...",
  });
});

//get single movie:
const displaySinglemovie = catchErrorAsync(async (req, res, next) => {
  const singlegmovie = await Movie.findById(req.params.id);
  res.status(201).json(singlegmovie);
});

//get all movie:
const displayAllmovie = catchErrorAsync(async (req, res, next) => {
  const allmovie = await Movie.find();

  res.status(201).json({
    status: "success",
    result: allmovie.length,
    allmovie,
  });
});

//search movie:
const searchMovie = catchErrorAsync(async (req, res, next) => {
  console.log(req.params.key);

  let result = await Movie.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
    ],
  });
  res.json({
    status: "success",
    result,
  });
});
//get random movie:
const getRandomMovie = catchErrorAsync(async (req, res, next) => {
  const type = req.query.type;
  let movie;
  if (type === "series") {
    movie = await Movie.aggregate([
      { $match: { isSeries: true } },
      { $sample: { size: 1 } },
    ]);
  } else {
    movie = await Movie.aggregate([
      { $match: { isSeries: false } },
      { $sample: { size: 1 } },
    ]);
  }
  res.status(200).json(movie);
});

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  displaySinglemovie,
  getRandomMovie,
  displayAllmovie,
  searchMovie,
};
