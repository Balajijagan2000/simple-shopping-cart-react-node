const mysql = require('mysql')
const Constants = require('./constants')


const con = mysql.createConnection({
    port:Constants.DB_PORT,
    host:Constants.HOST_NAME,
    user: Constants.USERNAME,
    password: Constants.PASSWORD,

})

con.connect((err) => {
    if(err) {
        console.log('Error in conneting to database....')
    } else {
        console.log('Connected to database...')
    }
})
module.exports = con