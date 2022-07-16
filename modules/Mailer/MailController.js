const {email, pass} = require('../../config.js')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: 'amleague.russia@mail.ru',
            pass: 'QwwRpxZz9gQJP8bfDc9O'
        },
    },
    {
        from: 'Администрация сайта Am League <amleague.russia@mail.ru>'
    }
)

function SendInviteMails(emails, team_name, team_id) {
    emails.forEach( (element) => {
        const mailOptions = {
            to: element,
            subject: `Приглашение в команду '${team_name}'`,
            html: `<h3>Приглашаем вас в команду '${team_name}'</h3>
                    <p>Для завершения процесса регистрации 
                    переходите по этой 
                    <a href="http://localhost:3000/invite-to-team?email=${element}&team_id=${team_id}">ссылке</a>.</p>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) console.log(err);
        })
    })
}

module.exports = {
    SendInviteMails: SendInviteMails
}
