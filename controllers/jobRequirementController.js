const JobRequirement = require('../models/jobRequirementModel');
const { sequelize } = require("../config/db");

exports.createJobRequirement = async (req, res) => {
  try {
    const { title, description, department, required_experience, qualification, status, work_type } = req.body;
    const job = await JobRequirement.create({
      title,
      description,
      department,
      required_experience,
      qualification,
      posted_date: new Date(),
      status,
      work_type,
      user_id: req.user.id // user_id from logged in HR
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getAllJobRequirements = async (req, res) => {
//   try {
//     const jobs = await JobRequirement.findAll();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getAllJobRequirements = async (req, res) => {
 try {
    const [jobs] = await sequelize.query(`
      SELECT J.*, IFNULL(MIN(S.selection_status), 'Pending') AS selection_status FROM 
      job_requirements J
      LEFT JOIN job_applications JA ON JA.job_requirement_id = J.id
      LEFT JOIN Selections S ON S.job_applicant_id = JA.id
      GROUP BY J.id
    `);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobRequirementById = async (req, res) => {
  try {
    const job = await JobRequirement.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateJobRequirement = async (req, res) => {
  try {
    const job = await JobRequirement.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });

    await job.update(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteJobRequirement = async (req, res) => {
  try {
    const job = await JobRequirement.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });

    await job.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};