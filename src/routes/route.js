const express = require('express')
const router = express.Router()
const cityController = require('../controllers/city')
const userController = require('../controllers/user')


router.post("/Cities", cityController.createCity)

router.get("/CitiesList", cityController.getCities)

router.get("/external", cityController.thirdPartyApi)

router.post("/CreateUser", userController.createUser)

router.get("/getUsers", userController.getUsersList)

router.patch("/updateUser/:id", userController.updateUser)

module.exports = router
