// const JobRequest = require('../models/jobRequestModel');

// // Create a new job request (user applies to a job)
// exports.createJobRequest = async (req, res) => {
//   try {
//     const { userId, jobTitle, coverLetter, status } = req.body;
//     const jobRequest = await JobRequest.create({
//       userId,
//       jobTitle,
//       coverLetter,
//       status,
//       // Don't set status or message here, let default apply
//     });
//     res.status(201).json(jobRequest);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all job requests (HR side: see all applications)
// exports.getAllJobRequests = async (req, res) => {
//   try {
//     const requests = await JobRequest.findAll();
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single job request by id
// exports.getJobRequestById = async (req, res) => {
//   try {
//     const request = await JobRequest.findByPk(req.params.id);
//     if (!request) return res.status(404).json({ message: "Not found" });
//     res.json(request);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateJobRequestStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const id = req.params.id;

//     console.log("Updating job request ID:", id);

//     const request = await JobRequest.findByPk(id);
//     if (!request) {
//       console.log("No job request found with ID:", id);
//       return res.status(404).json({ message: `JobRequest with ID ${id} not found` });
//     }

//     let message = "";
//     if (status === "Selected") {
//       message = "Congratulations! You are hired.";
//     } else if (status === "Rejected") {
//       message = "We regret to inform you that you have not been selected.";
//     } else {
//       message = "Your application is currently under review.";
//     }

//     await request.update({ status, message });
//     return res.json({ status: request.status, message: request.message });
//   } catch (err) {
//     console.error("Error updating status:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a job request (optional, if needed)
// exports.deleteJobRequest = async (req, res) => {
//   try {
//     const request = await JobRequest.findByPk(req.params.id);
//     if (!request) return res.status(404).json({ message: "Not found" });

//     await request.destroy();
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const JobRequest = require('../models/jobRequestModel');

//HR: Get all job applications
exports.getAllJobRequests = async (req, res) => {
  try {
    const requests = await JobRequest.findAll();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//HR: Get a specific application by ID
exports.getJobRequestById = async (req, res) => {
  try {
    const request = await JobRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Application not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//HR: Post selection result with custom message
exports.postJobRequestStatus = async (req, res) => {
  try {
    const { status, message } = req.body;
    const id = req.params.id;

    const request = await JobRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: `Application with ID ${id} not found` });
    }

    //Update only status and message
    await request.update({ status, message });

    res.json({ success: true, status: request.status, message: request.message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};