const express = require('express');
const router = express.Router();
const { getGoals, getOneGoal, postGoals, updateGoal, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getGoals);

router.get('/:id', getOneGoal);

router.post('/', protect, postGoals);

router.put('/:id', updateGoal);

router.delete('/:id',deleteGoal);

module.exports = router;