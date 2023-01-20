const cityModel = require('../models/cityModel')
const userModel = require('../models/userModel')

const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const createUser = async (req, res) => {
    try {
        let data = req.body
        const { name, city, mobile, media_url } = data

        if (!isValid(name)) return res.status(400).send({ status: false, message: "Name is Required" });
        const regName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
        if (!regName.test(name)) {
            return res.status(400).send({ message: "Please enter valid Name" })
        }

        let cities = await cityModel.findOne({ cityname: city })
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

        const regUrl = /^[(http)(https)]$/;
        if (!regUrl.test(media_url)) {
            return res.status(400).send({ message: "Please enter valid URL" })
        }

        const createUser = await userModel.create(data)
        res.status(201).send({ status: true, data: createUser, msg: "user details inserted" })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

const getUsersList = async function (req, res) {
    try {

        let data = await userModel.find()
        res.status(200).send({ status: true, data: data, msg: "list of users" })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

const updateUser = async function (req, res) {
    try {
        let id = req.params.id
        let data = req.body
        const updateUser = await studentModel.findByIdAndUpdate({ _id: id }, data)
        res.status(200).send({ status: true, data: updateUser })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}
module.exports = { createUser, getUsersList, updateUser }