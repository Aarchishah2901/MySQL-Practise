const { Op } = require("sequelize");
const Selection = require('../models/selectionModel');
const { sequelize } = require('../config/db');

// Create
exports.createSelection = async (req, res) => {
  try {
    const newSelection = await Selection.create(req.body);
    res.status(201).json(newSelection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

// exports.getSelectionById = async (req, res) => {
// try {
//     const { applicant_name } = req.query;
//     const where = {};

//     if (applicant_name) {
//       where.applicant_name = {
//         [Op.iLike]: `%${applicant_name}%`
//       };
//     }

//     const selections = await Selection.findOne({ where });
//     res.json(selections);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getSelectionById = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId from URL params:", userId);
 
  if (!userId) {
    return res.status(400).json({ error: "userId not provided" });
  }
 
  try {
    const [selection] = await sequelize.query(
      'SELECT * FROM Selections WHERE job_applicant_id = :userId LIMIT 1',
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
      }
    );
 
    if (selection) {
      return res.json(selection);
    } else {
      return res.status(404).json({ error: "Selection not found" });
    }
  } catch (error) {
    console.error("Error fetching selection:", error);
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

//User side selection status
// exports.getUserSelectionStatus = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const selection = await Selection.findOne({
//       where: { job_applicant_id: userId },
//       attributes: ['id', 'applicant_name', 'selection_status', 'message_to_user', 'createdAt', 'updatedAt'],
//       order: [['createdAt', 'DESC']],
//     });

//     if (!selection) {
//       console.log("Selection status", selection);  
//       return res.status(404).json({ message: 'No selection found' });
//     }

//     res.status(200).json({ data: selection });
//   } catch (error) {
//     console.error('Selection fetch error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };