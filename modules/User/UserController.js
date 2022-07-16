const yup = require('yup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(7);
const { AddUserToDB, GetUserPassword, GetUserInfoFromDB } = require('../DataBase/UserDBModel.js');

async function CheckAndCreateUsr(userParams) {
    const createUserSchema = yup.object().shape({
        name: yup.string().required(),
        lastname: yup.string().required(),
        password: yup.string().required(),
        phone: yup.string(),
        email: yup.string().email().required()
    })

    return createUserSchema.isValid(userParams).then( async (res) => {
        if(res & userParams.team_id) {
            userParams.password = bcrypt.hashSync(userParams.password, salt)
            const addToDB = await AddUserToD(userParams);

            if(addToDB.code === 200) {
                return AddToTeam(userParams.id, userParams.team_id)
            } else {
                return addToDB
            }

        } else if (res) {
            userParams.password = bcrypt.hashSync(userParams.password, salt)
            return(await AddUserToDB(userParams))
        }
    })
}

async function AuthUser(userParams) {
    const authUserSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })

    const passFromDB = await GetUserPassword(userParams.email)

    if(passFromDB.code == 404) {
        return({
            code: 404,
            message: "Not found in DB"
        })
    }

    const checkPass = bcrypt.compareSync(userParams.password, passFromDB)

    return authUserSchema.isValid(userParams).then(async (res) => {
        if (res && checkPass) {
            const token = jwt.sign({
                email: userParams.email
            }, 'banana')
            return({
                code: 200,
                jwt: token
            })
        } else {
            return({
                code: 403,
                message: "Check your fields"
            })
        }
    })
}

async function GetUserInfo(userEmail) {
    if(userEmail == '' || !userEmail) {
        return {
            code: 403,
            message: "Check your fields"
        }
    } else {
        return await GetUserInfoFromDB(userEmail)
    }
}

module.exports = {
    CreateNewUser: CheckAndCreateUsr,
    AuthUser: AuthUser,
    GetUserInfo: GetUserInfo
}