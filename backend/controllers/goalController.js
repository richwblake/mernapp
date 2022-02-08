const asyncHandler = require('express-async-handler');

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "GET goals" });
});

const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please include text in payload");
  }
  res.status(201).json({ message: "Created new entity" });
});

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated goal ${req.params.id}` });
});

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  postGoals,
  updateGoal,
  deleteGoal
}