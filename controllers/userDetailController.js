const UserDetails = require('../models/userDetailModel');

// exports.createOrUpdateUserDetails = async (req, res) => {
//   const { userId } = req.params;
//   const { address, department, dob, designation, joindate } = req.body;

//   try {
//     let userDetails = await UserDetails.findOne({ where: { userId } });

//     if (userDetails) {
//       await userDetails.update({ address, department, dob, designation, joindate });
//       return res.status(200).json({ message: "User details updated", data: userDetails });
//     } else {
//       const newUser = await UserDetails.create({
//         userId, address, department, dob, designation, joindate
//       });
//       return res.status(201).json({ message: "User details created", data: newUser });
//     }
//   } catch (error) {
//     console.error("Error saving user details:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// exports.createOrUpdateUserDetails = async (req, res) => {
//   const { userId } = req.params;
//   const { address, department, dob, designation, joindate } = req.body;

//   console.log("Received userId:", userId);
//   console.log("Received data:", req.body);

//   try {
//     let userDetails = await UserDetails.findOne({ where: { userId } });

//     if (userDetails) {
//       console.log("Updating existing user");
//       await userDetails.update({ address, department, dob, designation, joindate });
//       return res.status(200).json({ message: "User details updated", data: userDetails });
//     } else {
//       console.log("Creating new user");
//       const newUser = await UserDetails.create({
//         userId, address, department, dob, designation, joindate
//       });
//       return res.status(201).json({ message: "User details created", data: newUser });
//     }
//   } catch (error) {
//     console.error("Error saving user details:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.createOrUpdateUserDetails = async (req, res) => {
  const { userId } = req.params;
  const { address, department, dob, designation, joindate } = req.body;

  try {
    let userDetails = await UserDetails.findOne({ where: { userId } });

    if (userDetails) {
      await userDetails.update({ address, department, dob, designation, joindate });
      return res.status(200).json({ message: "User details updated", data: userDetails });
    } else {
      const newUser = await UserDetails.create({
        userId, address, department, dob, designation, joindate
      });
      return res.status(201).json({ message: "User details created", data: newUser });
    }
  } catch (error) {
    console.error("Error saving user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getUserDetails = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const details = await UserDetails.findOne({ where: { userId } });
//     if (!details) {
//       return res.status(404).json({ message: "User details not found" });
//     }
//     res.status(200).json(details);
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const details = await UserDetails.findOne({ where: { userId } });
    if (!details) {
      return res.status(404).json({ message: "User details not found" });
    }
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};