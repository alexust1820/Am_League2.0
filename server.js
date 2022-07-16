const exress = require("express");
const app = exress();
const cors = require('cors')
var bodyParser = require('body-parser')
const {SendTeamInvite} = require('./modules/Mailer/MailController.js')
const PORT = process.env.PORT || 8080;

app.use( cors({
    origin: "http://localhost:3000"
}))
app.use(bodyParser.json());

require('./modules/User/UserRoutes')(app);
require('./modules/Team/TeamRoutes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is started on port = ${PORT}`)
    // const emails = ['muhka57@gmail.com']
    // SendTeamInvite(emails, 'cool team');
})