const cityModel = require('../models/cityModel')

const createCity = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please enter data" });

        const regName = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
        if (!regName.test(data.cityName)) {
            return res.status(400).send({ message: "Please enter valid Name" })
        }

        const createCity = await cityModel.create(data)
        res.status(201).send({ status: true, msg: "city name inserted", data: createCity })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

const getCities = async function (req, res) {
    try {
        let data = await cityModel.find()
        res.status(200).send({ status: true, msg: "list of cities", data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports = { createCity, getCities }