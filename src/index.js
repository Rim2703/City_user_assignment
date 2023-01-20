/*
using Http module we can create our own server (npm i http) and run req res cycle
const http = require('http')

const server = http.createServer((req,res)=>{
    res.end("I am creating my own server")
})

server.listen(3000,"127.0.0.1", ()=>{
    console.log("listening on Port " + 3000)
})

*/

const express = require('express')
const router = require('./routes/route')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const app = express()


app.use(express.json());

mongoose.connect("mongodb+srv://Rimsha:RimAtlas@cluster0.ij9mujl.mongodb.net/city", {
    useNewUrlParser: true
})
    .then(() => console.log("Mongodb is Connected"))
    .catch(err => console.log(err))

app.use('/', router)

app.listen(3000, () => {
    console.log("Server is going to start ", 3000)
})