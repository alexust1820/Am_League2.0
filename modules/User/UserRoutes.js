const {CreateNewUser, AuthUser, GetUserInfo} = require('./UserController.js');
const passport = require('passport');
const { GetUserInfoFromDB } = require('../DataBase/UserDBModel.js');
const AuthByToken = require('../../middleware/AuthByToken')

module.exports = (app) => {
    app.post("/registration", async (req, res) => {
        res.send(await CreateNewUser(req.body))
    })
    
    app.post("/login", async (req, res) => {
        res.send(await AuthUser(req.body))
    })

    app.post("/userInfo", AuthByToken, async (req, res) => {
        res.send(await GetUserInfo(req.email))
    })
}