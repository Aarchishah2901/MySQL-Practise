const JobApplication = require('../models/jobApplicationModel');

// Create
exports.createJobApplication = async (req, res) => {
  try {
    const newApp = await JobApplication.create(req.body);
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all
exports.getAllJobApplications = async (req, res) => {
  try {
    const apps = await JobApplication.findAll();
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read one
exports.getJobApplicationById = async (req, res) => {
  try {
    const app = await JobApplication.findByPk(req.params.id);
    if (app) {
      res.json(app);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
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