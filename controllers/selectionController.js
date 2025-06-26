const { Op } = require("sequelize");
const Selection = require('../models/selectionModel');
const JobApplication = require('../models/jobApplicationModel');
const User = require('../models/userModel');
const { sequelize } = require('../config/db');

// Create
// exports.createSelection = async (req, res) => {
//   // const { userId } = req.body;

//   // // Check if user exists
//   // const user = await User.findByPk(userId);
//   // if (!user) {
//   //   return res.status(400).json({ error: `User with ID ${userId} does not exist.` });
//   // }

//   try {
//     const newSelection = await Selection.create(req.body);
//     res.status(201).json(newSelection);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.createSelection = async (req, res) => {
  const { job_applicant_id, applicant_name, selection_status, message_to_user } = req.body;

  if (!job_applicant_id || !applicant_name || !selection_status) {
    return res.status(400).json({
      error: "job_applicant_id, applicant_name, and selection_status are required.",
    });
  }

  try {
    const existing = await Selection.findOne({ where: { job_applicant_id } });

    if (existing) {
      return res.status(400).json({
        error: "Selection already exists for this applicant.",
        existingSelection: existing,
      });
    }

    const newSelection = await Selection.create({
      job_applicant_id,
      applicant_name,
      selection_status,
      message_to_user: message_to_user || "",
    });

    return res.status(201).json(newSelection);
  } catch (error) {
    console.error("Error creating selection:", error);
    return res.status(500).json({ error: error.message });
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

//Get user using email
exports.getSelectionByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const application = await JobApplication.findOne({ where: { email } });

    if (!application) {
      return res.status(404).json({ error: "No job application found for this email" });
    }

    const selection = await Selection.findOne({
      where: { job_applicant_id: application.id }
    });

    if (selection) {
      res.json(selection);
    } else {
      res.status(404).json({ error: "Selection not found for this applicant" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
// exports.updateSelection = async (req, res) => {
//   try {
//     const [updated] = await Selection.update(req.body, {
//       where: { id: req.params.id }
//     });
//     if (updated) {
//       const updatedSelection = await Selection.findByPk(req.params.id);
//       res.json(updatedSelection);
//     } else {
//       res.status(404).json({ error: 'Selection not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.updateSelectionByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const application = await JobApplication.findOne({ where: { email } });

    if (!application) {
      return res.status(404).json({ error: "No job application found for this email" });
    }

    const [updated] = await Selection.update(req.body, {
      where: { job_applicant_id: application.id }
    });

    if (updated) {
      const updatedSelection = await Selection.findOne({
        where: { job_applicant_id: application.id }
      });
      res.json(updatedSelection);
    } else {
      res.status(404).json({ error: "Selection not found for this applicant" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
// exports.deleteSelection = async (req, res) => {
//   try {
//     const deleted = await Selection.destroy({ where: { id: req.params.id } });
//     if (deleted) {
//       res.json({ message: 'Selection deleted' });
//     } else {
//       res.status(404).json({ error: 'Selection not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
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