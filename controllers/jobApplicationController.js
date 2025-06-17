const JobApplication = require('../models/jobApplicationModel');

// Create
exports.createJobApplication = async (req, res) => {
  try {
    const { job_requirement_id, applicant_name, email, phone_number, qualification, experience } = req.body;

    // Validate required fields
    if (!job_requirement_id || !applicant_name || !email || !phone_number || !qualification || !experience) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    // Create new job application
    const newApp = await JobApplication.create({
      job_requirement_id,
      applicant_name,
      email,
      phone_number,
      qualification,
      experience
    });

    res.status(201).json(newApp);

  } catch (error) {
    console.error("Error creating job application:", error.message);
    res.status(500).json({ error: error.message });
  }
};
// Read all
// exports.getAllJobApplications = async (req, res) => {
//   try {
//   const { userId } = req.params;
//   console.log(userId);
//     const apps = await JobApplication.findAll();
//     res.json(apps);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getAllJobApplications = async (req, res) => {
  try {
    const { userId } = req.query; // optional filter
    const condition = userId ? { where: { userId } } : {};

    const apps = await JobApplication.findAll(condition);
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read one
// exports.getJobApplicationById = async (req, res) => {
//   try {
//     const app = await JobApplication.findByPk(req.params.id);
//     if (app) {
//       res.json(app);
//     } else {
//       res.status(404).json({ error: 'Application not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getJobApplicationById = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Received userId:', userId);

    const apps = await JobApplication.findAll({
      where: { userId } // only fetch applications by this user
    });

    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateJobApplication = async (req, res) => {
  try {
    const [updated] = await JobApplication.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedApp = await JobApplication.findByPk(req.params.id);
      res.json(updatedApp);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteJobApplication = async (req, res) => {
  try {
    const deleted = await JobApplication.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Application deleted' });
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};