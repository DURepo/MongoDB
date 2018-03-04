const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const _ = require('lodash')

const { mongoose } = require('./config/config')
const Task = require('./models/task')
const User = require('./models/user')

let app = express()

app.use(bodyParser.json())

app.post('/tasks', (req, res) => {
    let task = new Task({ text: req.body.text })
    
    task.save()
    .then((doc) => { res.send(doc) })
    .catch((err) => { res.status(400).send(err) })
})

app.get('/tasks', (req, res) => {
    Task.find()
    .then((tasks) => { res.send({ tasks }) })
    .catch((err) => { res.status(400).send(err) })
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params
    
    if (!ObjectID.isValid(id)) {
        return res.sendStatus(400)
    }
    
    Task.findById(id)
    .then((task) => {
        if(!task) { return res.sendStatus(400) }
        
        res.send({ task })
    })
    .catch((err) => { res.status(400).send(err) })
})

app.delete('/tasks/:id', (req, res) => {
    //deconstruct id from req.params
    
    //check whether objectId is a valid bson object
    
    //find task by Id and remove (don't forget the catch block!)
})

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params
    let body = _.pick(req.body, ['text', 'completed'])
    
    if (!ObjectID.isValid(id)) {
        return res.sendStatus(404)
    }
    
    if (body.completed && _.isBoolean(body.completed)) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }
    
    // find task by it's Id and update it.
    // Additionally, set an option for the task called 'new' to true. This would return the updated task.
    // Options and operators are NOT the same thing!
    // And don't forget the catch block!
    // Hint: You need to use the set operator to tell the query method what you want to update.
})

app.listen(3000)

module.exports = app