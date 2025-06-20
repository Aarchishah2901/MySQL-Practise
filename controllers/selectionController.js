const { Op } = require("sequelize");
const Selection = require('../models/selectionModel');
const User = require('../models/userModel');
const { sequelize } = require('../config/db');

// Create
exports.createSelection = async (req, res) => {
  // const { userId } = req.body;

  // // Check if user exists
  // const user = await User.findByPk(userId);
  // if (!user) {
  //   return res.status(400).json({ error: `User with ID ${userId} does not exist.` });
  // }

  try {
    const newSelection = await Selection.create(req.body);
    res.status(201).json(newSelection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All
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

// Get by userId (foreign key)
// exports.getSelectionById = async (req, res) => {
//   const userId = req.params.userId;

//   if (!userId) {
//     console.log(userId);
    
//     return res.status(400).json({ error: "userId not provided" });
//   }

//   try {
//     const selection = await Selection.findOne({
//       where: { userId },
//       include: {
//         model: User,
//         attributes: ['userId', 'name', 'email']
//       }
//     });

//     if (selection) {
//       return res.json(selection);
//     } else {
//       return res.status(404).json({ error: "Selection not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getSelectionById = async (req, res) => {
  const jobApplicantId = req.params.userId;

  if (!jobApplicantId) {
    return res.status(400).json({ error: "job_applicant_id not provided" });
  }

  try {
    const selection = await Selection.findOne({
      where: { job_applicant_id: jobApplicantId }
    });

    if (selection) {
      return res.json(selection);
    } else {
      return res.status(404).json({ error: "Selection not found" });
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