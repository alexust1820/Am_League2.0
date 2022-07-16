const yup = require('yup')
const { AddTeamToDB } = require('../DataBase/TeamDBModel.js')


function CheckTeamParams(teamParams) {
    const createTeamSchema = yup.object().shape({
        name: yup.string().required()
    })

    return createTeamSchema.isValid(teamParams).then(async res => {
        if(res) {
            return await AddTeamToDB(teamParams)
        } else {
            return {code: 409, messsage: `Dublicate`}
        }
    })
}

module.exports = {
    CreateNewTeam: CheckTeamParams
}