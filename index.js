const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_db'
})

connection.connect()

app.get('/', (req, res) => {
    res.send("hello")

})

app.get('/DeleteUser', (req, res) => {
    const {ID} = req.body
    const query =  "DELETE FROM user WHERE ID =?"
    const parmas = [ID]
    connection.query(query,  parmas, (err, rows, fields) => {
            if (err) throw err

            res.send("Delete sucess")
        })
})
app.post('/reqister', (req, res) => {
    const {Email, Pass} = req.body
    const query = "INSERT INTO user (Email, Password) VALUES (?,?)"
    const parmas = [Email, Pass]
    connection.query(query, parmas, (err, rows, fields) => {
        if (err) throw err

        res.send(rows)
    })
})

app.put('/UpdateUser', (req, res) => {
    const { Email, Pass,ID } = req.body
    const query = "UPDATE user SET  Email = ?, Password = ? WHERE ID = ?"
    const parmas = [Email, Pass,ID]
    connection.query(query, parmas, (err, rows, fields) => {
        if (err) throw err

        res.send(rows)
    })
    res.send('Update sucess')
})


app.delete('/DeleteUser', (req, res) => {
    const { email, pass } = req.body
    res.send("Delete success at" + email)
})
app.listen(3000)