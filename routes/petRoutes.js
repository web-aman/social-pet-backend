const express = require("express");
const { registerPet, getPetList } = require("../controller/petController");

// const { petRegister } = require('../validations/validator');
const validateToken = require("../middleware/validateTokenHandler");

const checkFileSize = require("../middleware/checkFileUploadError");

const upload = require("../functions/upload");

const router = express.Router();

router.post(
  "/register",
  validateToken,
  upload.single("imageFile"),
  checkFileSize,
  registerPet
);

router.get("/pet-list", validateToken, getPetList);

module.exports = router;
