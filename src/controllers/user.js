const cityModel = require('../models/cityModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const createUser = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please enter data" });
        const { name, city, mobile, media_url } = data

        if (!isValid(name)) return res.status(400).send({ status: false, message: "Name is Required" });
        const regName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
        if (!regName.test(name)) {
            return res.status(400).send({ message: "Please enter valid Name" })
        }

        let cities = await cityModel.findOne({ cityName: city })
        if (!cities) {
            res.status(404).send({ status: false, msg: "data not found" })
        }

        const regMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (!regMobile.test(mobile)) {
            return res.status(400).send({ message: "Please enter valid Mobile Number" })
        }

        let mobData = await userModel.findOne({ mobile: mobile })
        //.............when mobile number is already in use............
        if (mobData) return res.status(400).send({ status: false, msg: 'Duplicate Mobile Number, Please Provide another!!' })

        const regUrl = /^https?:\/\/(.*)/
        if (!regUrl.test(media_url)) {
            return res.status(400).send({ message: "Please enter valid URL" })
        }

        const createUser = await userModel.create(data)
        res.status(201).send({ status: true, msg: "user details inserted", data: createUser })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

const getUsersList = async function (req, res) {
    try {
        let data = await userModel.find()
        res.status(200).send({ status: true, msg: "list of users", data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

const updateUser = async function (req, res) {
    try {
        let id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ status: false, message: "Enter valid Id" })
        }

        let data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please enter data" });

        const updateUser = await userModel.findByIdAndUpdate(id, data, { new: true })
        return res.status(200).send({ status: true, data: updateUser })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports = { createUser, getUsersList, updateUser }