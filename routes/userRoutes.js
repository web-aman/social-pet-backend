const express = require("express");
const {
  registerUser,
  forgotPassword,
  login,
  test,
  changePassword,
  logout,
  updateProfile,
  getUserPetList,
  deleteUserPet
} = require('../controller/userController');

const { userRegister, forgotPass, loginData, userChangePassword } = require('../validations/validator');
const upload = require('../functions/upload')
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", userRegister, registerUser);

router.post("/forgot-password", forgotPass, forgotPassword);

router.post("/login", loginData, login);

router.get('/test', validateToken, test);

router.get('/get-user-pet-list', validateToken, getUserPetList);

router.delete('/delete-user-pet/:id', validateToken, deleteUserPet);

router.put('/update-profile', validateToken, upload.single("imageFile"), updateProfile);

router.post('/change-password', validateToken, userChangePassword, changePassword);

router.post("/logout", logout);

module.exports = router;