// Our dependecies
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Let us run the server
app.listen(3002,()=>{
    console.log('Server is running on port 3002')
})


// Let us create our databae (pg)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', //if you have set xampp password please enter it here
    database: 'plantdb',
})


// let us now create a route to the server that whill register a user

app.post('/register',(req,res)=>{
    // We need to get variables sent from the form
    const sentEmail = req.body.Email
    const sentPassword = req.body.Password

    //lets create SQL statement to insert the user to the Database table
    const SQL = 'INSERT INTO Users (email,password) VALUES (?,?)' // we are going 
    //enter these values through a variable

    const Values = [sentEmail,sentPassword]

    // Query to execute the sql statement stated above
    db.query(SQL,Values,(err,results)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('Usuario insertado correctamente')
            res.send({message: 'Usuario añadido'})

            // Let try and see
            // user has not been submitted, we need to use Express and cors
        }
    })

    // 
})

// Now we need to login with these credentials from a registered user
// lets create another route

app.post('/login',(req,res)=>{
    // We need to get variables sent from the form
    const sentloginEmail = req.body.LoginEmail
    const sentloginPassword = req.body.LoginPassword

    //lets create SQL statement to insert the user to the Database table
    const SQL = 'SELECT * FROM users WHERE email = ? && password = ?' // we are going 
    //enter these values through a variable

    const Values = [sentloginEmail,sentloginPassword]

     // Query to execute the sql statement stated above
     db.query(SQL,Values,(err,results)=>{
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            res.send({message: 'Las credenciales no coinciden'})
            // this should be good, lest try to login.
        }
    })
})