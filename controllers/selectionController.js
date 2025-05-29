const { Op } = require("sequelize");
const Selection = require('../models/selectionModel');

// Create
exports.createSelection = async (req, res) => {
  try {
    const newSelection = await Selection.create(req.body);
    res.status(201).json(newSelection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all
// exports.getAllSelections = async (req, res) => {
//   try {
//     const selections = await Selection.findAll();
//     res.json(selections);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getAllSelections = async (req, res) => {
  try {
    const { applicant_name } = req.query;
    const where = {};

    if (applicant_name) {
      where.applicant_name = {
        [Op.iLike]: `%${applicant_name}%`
      };
    }

    const selections = await Selection.findAll({ where });
    res.json(selections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one
exports.getSelectionById = async (req, res) => {
  try {
    const selection = await Selection.findByPk(req.params.id);
    if (selection) {
      res.json(selection);
    } else {
      res.status(404).json({ error: 'Selection not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateSelection = async (req, res) => {
  try {
    const [updated] = await Selection.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSelection = await Selection.findByPk(req.params.id);
      res.json(updatedSelection);
    } else {
      res.status(404).json({ error: 'Selection not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteSelection = async (req, res) => {
  try {
    const deleted = await Selection.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Selection deleted' });
    } else {
      res.status(404).json({ error: 'Selection not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};