const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

const connection = mysql.createConnection({
    host: '159.89.206.43',
    user: 'jack',
    password: '123456',
    database: 'wannabedev'
})

connection.connect()

app.get('/user/:ID', (req, res) => {
    const {ID} = req.params
    const query = "SELECT id, email, password,username, firstname, lastname FROM user WHERE id=?"
    const parmas = [ID]
    connection.query(query, parmas, (err, result) => {
        if (err) throw err

        res.send(result)
    })

})

app.post('/Login', (req,res) =>{
    const {email,password} = req.body
    const parmas =[email, password]
    const query ='SELECT ID FROM user WHERE email =? AND password =?'
    connection.query(query, parmas,(err, result) =>{
        if(err) throw err
        
        if(result.length > 0){
            res.send({
                status: 200,
                msg:"Login success"
            })
        }else{
            res.send({
                status:404,
                msg:"user does not exist"
            })
        }
    })
})

app.delete('/DeleteUser', (req, res) => {
    const {id} = req.body
    const query =  "DELETE FROM user WHERE id =?"
    const parmas = [id]
    connection.query(query,  parmas, (err, rows, fields) => {
            if (err) throw err

            res.send("Delete sucess")
        })
})
app.post('/reqister', (req, res) => {
    const {email, password, username, firstname,lastname} = req.body
    const query = "INSERT INTO user (email, password, username, firstname, lastname) VALUES (?,?,?,?,?)"
    const parmas = [email, password, username, firstname, lastname]
    connection.query(query, parmas, (err, rows, fields) => {
        if (err) throw err

        res.send("reqister success")
    })
})

app.put('/UpdateUser', (req, res) => {
    const { email, password,ID,username,firstname,lastname } = req.body
    const query = "UPDATE user SET  email = ?, password = ?, username =?, firstname =?, lastname = ? WHERE id = ?"
    const parmas = [email, password, username, firstname, lastname, ID]
    connection.query(query, parmas, (err, rows, fields) => {
        if (err) throw err
        res.send('Update sucess')
        // res.send(rows)
    })
    
})



app.listen(3000)