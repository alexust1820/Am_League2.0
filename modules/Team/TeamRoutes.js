const AuthByToken = require('../../middleware/AuthByToken')
const {CreateNewTeam} = require('./TeamController.js')
const {SendInviteMails} = require('../Mailer/MailController.js')

module.exports = (app) => {
    app.post("/create-team", AuthByToken, async (req, res) => {
        //{code: 200}
        const addTeam = await CreateNewTeam(req.body)
        if(addTeam.code === 200 & req.body.emails[0] !== '') {
            const mailInvites = await SendInviteMails(req.body.emails, req.body.name, addTeam.team_id)
        }
        res.send(addTeam)
    })
}