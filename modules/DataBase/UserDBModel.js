const Pool = require("pg").Pool;
const db = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "am_league"
});

async function AddUserToDB(userParams) {
    const userInfo = await db.query(`SELECT * FROM users where email = $1`, [userParams.email])
    
    if(userInfo.rows.length == 0) {
        const newUser = await db.query(`INSERT INTO users (name, lastname, email, phone, password)
        values ($1, $2, $3, $4, $5)`, [
            userParams.name, 
            userParams.lastname, 
            userParams.email, 
            userParams.phone, 
            userParams.password
        ])
        return({code: 201})
    } else {
        return({code:401})
    }
}

async function GetUserPassword(userEmail) {
    const userInfo = await db.query(`SELECT * FROM users where email = $1`, [userEmail])
    if(userInfo.rows.length == 0) {
        return({code:404})
    } else {
        return(userInfo.rows[0].password)
    }
}

async function GetUserInfoFromDB(userEmail) {
    const userInfo = await db.query(`SELECT id, name, lastname, email FROM users where email = $1`, [userEmail])
    if(userInfo.rows[0].length == 0) {
        return {code: 403}
    } else {
        return(userInfo.rows[0])
    }
}

module.exports = {
    AddUserToDB: AddUserToDB,
    GetUserPassword: GetUserPassword,
    GetUserInfoFromDB: GetUserInfoFromDB
}