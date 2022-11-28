const con = require('../config/dbconnection')
const formidable = require('formidable')
const fs = require('fs')
const { json } = require('express')

const addProduct = (req,res) => {

    
        const form = new formidable.IncomingForm()
        form.multiples = true;
        form.uploadDir = __dirname+'/../public/uploads/images'
        form.keepExtensions = true
        
        form.parse(req,(err,fields,files) => {
            if(err){ throw err}
            else {
                if(!files.image.mimetype.includes('image')) {
                    fs.unlinkSync(__dirname+'/../public/uploads/images/invalid-name')
                    res.status(400).json({message:'Invalid file format'})
                    return;
                } else {
                    const path = __dirname+'/../public/uploads/images/'
                fs.renameSync(path+'invalid-name',path+files.image.originalFilename,(err) => {
                if(err) throw err
                });

                let imageUrl = 'http://localhost:3500/public/uploads/images/'+files.image.originalFilename
                const queryString = 'INSERT INTO PRODUCTS(name,type,price,url) VALUES(?,?,?,?)'
                con.query(queryString,[fields.name,fields.type,fields.price,imageUrl],(err) => {
                if(err) {
                    res.status(500).send('Error in connecting to database')
                    return;
                }
                else {
                    const jsonResponse = {
                        data:{...fields,
                        imageUrl},
                        message:'Product added successfully'
                    }
                    res.status(200).json(jsonResponse)
                }} )
            }
                }
                
            
            

            
        })


    

    
    
}

const listAllProducts = (req,res) => {

    
   
    con.query('SELECT * FROM PRODUCTS',(err,result,field) => {
            if(err) {
                res.status(500).send('Error in connecting to database')
                return;
            } else {
                let data = result
                res.status(200).json(data)
            }
           
    })
   
    


    
}

const listProduct = (req,res) => {
    const id = req.params.id
    const queryString = `SELECT * FROM PRODUCTS WHERE id=?`
    con.query(queryString,[id],(err,result) => {
        if(err) {
            res.status(500).send('Error in connecting to database')
            return;
        } else {
            if(result != null  && result.length > 0) {
                res.status(200).json(result)
            } else {
                res.status(200).send(`Product with id ${id} not found`)
            }
            
        }
    })
}

const removeProduct = (req,res) => {
    const id = req.params.id
    const queryString = `DELETE FROM PRODUCTS WHERE id=?`
    con.query(queryString,[id],(err,result) => {
        if(err) {
            res.status(500).send('Error in connecting to database')
            return;
        } else {
            if(result.affectedRows > 0) {
                res.status(200).send('Product removed successfully')
            } else {
                res.status(200).send(`Product with id ${id} not exist`)
            }
        }
    })
}

const updateProduct = (req,res) => {
    const product = req.body

    const queryString = `UPDATE PRODUCTS SET name=?,type=?,price=? WHERE id=?`

    con.query(queryString,[product.name,product.type,product.price,product.id],(err,result)=> {
        if(err) {
            res.status(500).send('Error in connecting to database')
            return;
        } else {
            if(result.affectedRows > 0) {
                res.status(200).send('Product updated successfully')
            } else {
                res.status(200).send('Product not found')
            }
        }
    })
}

module.exports = {addProduct,listAllProducts,listProduct,removeProduct,updateProduct}