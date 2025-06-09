const express = require("express");
const router = express.Router();
const userDetailsController = require("../controllers/userDetailController");

router.post("/fill-details/:userId", userDetailsController.createOrUpdateUserDetails);
router.get("/get-details/:userId", userDetailsController.getUserDetails);

module.exports = router;