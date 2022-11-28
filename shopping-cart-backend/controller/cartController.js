const con = require('../config/dbconnection')
const { json } = require('express')

const addCartItem = (req,res) => {
    const fields = req.body
    const queryString = 'INSERT INTO CART(id,name,type,price,url) VALUES(?,?,?,?,?)'
    con.query(queryString,[fields.id,fields.name,fields.type,fields.price,fields.url],(err) => {
    if(err) {
        const errorno = err.errno
        if(errorno === 1062) {
            res.status(500).send('Item already in cart')
            return; 
        } else {
            res.status(500).send('Error in connecting to database')
            return;
        }
        
    }
    else {
        const jsonResponse = {
            data:{...fields},
            message:'Item added successfully'
        }
        res.status(200).json(jsonResponse)
    }} )
    
    
}

const listAllCartItems = (req,res) => {

    
   
    con.query('SELECT * FROM CART',(err,result,field) => {
            if(err) {
                res.status(500).send('Error in connecting to database')
                return;
            } else {
                let data = result
                res.status(200).json(data)
            }
           
    })
   
    


    
}
const removeCartItem = (req,res) => {
    const id = req.params.id
    
    const queryString = `DELETE FROM CART WHERE id=?`
    con.query(queryString,[id],(err,result) => {
        if(err) {
            res.status(500).send('Error in connecting to database')
            return;
        } else {
            if(result.affectedRows > 0) {
                res.status(200).send('Item removed successfully')
            } else {
                res.status(200).send(`Item with id ${id} not exist`)
            }
        }
    })
}


module.exports = {addCartItem,listAllCartItems,removeCartItem}

