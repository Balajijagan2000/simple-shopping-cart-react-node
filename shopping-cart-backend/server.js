const express = require('express')
const app = express()
const con = require('./config/dbconnection')
const cors = require('cors')
const PORT = 3500
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')
function init() {
    con.query('CREATE  DATABASE IF NOT EXISTS PRODUCTSDB',(err) => {
        if(err) {
            console.log('Error ',err)
        } else {
            console.log('Database created...')
        }
        
    })
    con.query('USE PRODUCTSDB')
    con.query('CREATE TABLE IF NOT EXISTS products(id int AUTO_INCREMENT PRIMARY KEY,name text,type text,price decimal(8,2),url text)',
    (err) => {
        if(err) console.log('Error :',err)
    })
    con.query('CREATE TABLE IF NOT EXISTS cart(id int PRIMARY KEY,name text,type text,price decimal(8,2),url text)',
    (err) => {
        if(err) console.log('Error :',err)
    })

}
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/public',express.static(__dirname+'/public'))

app.use('/products',productRoute)
app.use('/cart',cartRoute)
app.listen(PORT,() => {
    console.log(`Server started and listening port:${PORT}`)
    
    init()
    
})

