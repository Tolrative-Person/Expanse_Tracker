const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// POST - Create a new expense
router.post('/', async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const expense = new Expense({
      description,
      amount,
      category,
    });

    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Get a single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { description, amount, category },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
