const JobRequest = require('../models/jobRequestModel');

// Create a new job request (user applies to a job)
exports.createJobRequest = async (req, res) => {
  try {
    const { userId, jobTitle, coverLetter } = req.body;
    const jobRequest = await JobRequest.create({
      userId,
      jobTitle,
      coverLetter,
      // Don't set status or message here, let default apply
    });
    res.status(201).json(jobRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all job requests (HR side: see all applications)
exports.getAllJobRequests = async (req, res) => {
  try {
    const requests = await JobRequest.findAll();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single job request by id
exports.getJobRequestById = async (req, res) => {
  try {
    const request = await JobRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update job request status and message (HR posts selection/rejection)
// exports.updateJobRequestStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const request = await JobRequest.findByPk(req.params.id);
//     if (!request) return res.status(404).json({ message: "Not found" });

//     let message = "";
//     if (status === "Selected") {
//       message = "Congratulations! You are hired.";
//     } else if (status === "Rejected") {
//       message = "We regret to inform you that you have not been selected.";
//     } else {
//       message = "Your application is currently under review.";
//     }

//     await request.update({ status, message });
//     res.json(request);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.updateJobRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await JobRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });

    let message = "";
    if (status === "Selected") {
      message = "Congratulations! You are hired.";
    } else if (status === "Rejected") {
      message = "We regret to inform you that you have not been selected.";
    } else {
      message = "Your application is currently under review.";
    }

    await request.update({ status, message });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job request (optional, if needed)
exports.deleteJobRequest = async (req, res) => {
  try {
    const request = await JobRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });

    await request.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};