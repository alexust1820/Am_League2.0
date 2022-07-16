const e = require("express");

const Pool = require("pg").Pool;
const db = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "am_league"
});

async function AddTeamToDB(teamParams) {
    const checkTeamInDB = await db.query(`SELECT * FROM teams where cap_id = $1`, [teamParams.cap_id])
    if(checkTeamInDB.rows.length === 0) {
        const newTeam = await db.query(`INSERT INTO teams (name, cap_id)
        values ($1, $2) RETURNING *`, [teamParams.name, teamParams.cap_id])
        return {code: 200, team_id: newTeam.rows[0].id}
    } else {
        return {code: 409}
    }
}

async function AddToTeam(user_id, team_id) {
    const checkTeamInDB = await db.query(`SELECT * FROM teams where id = $1`, [team_id])
    if(checkTeamInDB !== 0) {
        const newPlayer = await db.query(`INSERT INTO teams players_id[$1]
        where id = $2 REWTURNING * `, [user_id, team_id])
        console.log(newPlayer)
        return {code: 200}
    } else {
        return {code: 404}
    }
}

module.exports = {
    AddTeamToDB: AddTeamToDB,
    AddTeamToDB: AddTeamToDB
}