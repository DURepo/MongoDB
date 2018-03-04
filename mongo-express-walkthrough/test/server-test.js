const superagent = require('superagent')
const chai = require('chai')
const expect = chai.expect
const { mongoose } = require('../config/config')
const Task = require('../models/task')

var BASE_URL = 'http://localhost:3000'

var globalID = ''
var id = ''

describe("ToDo - POST Tests", () => {
    var testTask = {
        text: 'Test task'
    }
    it("should save a new task in the database and fetch that record from the database", (done) => {
        superagent.post(`${BASE_URL}/tasks`)
        .send(testTask)
        .set('accept', 'json')
        .end((err, res) => {
            expect(err).to.not.exist
            expect(res).to.exist
            expect(res.status).to.equal(200)
            expect(res.body.text).to.equal(testTask.text)
            globalID = res.body._id
            done()
        })
    })
})

describe("ToDo = GET tests", () => {
    it("should get all the tasks from the database", (done) => {
        superagent.get(`${BASE_URL}/tasks`)
        .end((err, res) => {
            expect(err).to.not.exist
            expect(res).to.exist
            expect(res.status).to.equal(200)
            expect(res.body.tasks.length).to.be.greaterThan(0)
            done()
        })
    })
    
    it("should get a task with an id", (done) => {
        superagent.get(`${BASE_URL}/tasks/${globalID}`)
        .end((err, res) => {
            expect(err).to.not.exist
            expect(res).to.exist
            expect(res.status).to.equal(200)
            expect(res.body.task.text).to.not.be.empty
            done()
        })
    })
    
    var incorrectID = '69fbb253d72a3723043967b4'
    
    it("should return 400 if id not found", (done) => {
        superagent.get(`${BASE_URL}/tasks/${incorrectID}`)
        .end((err, res) => {
            // expect(err).to.not.exist
            // expect(res).to.exist
            expect(res.status).to.equal(404)
            done()
        })
    })
})

describe("ToDo - DELETE tests", () => {
    
    it("should delete a task with an id", (done) => {
        superagent.delete(`${BASE_URL}/tasks/${globalID}`)
        .end((err, res) => {
            expect(err).to.not.exist
            expect(res).to.exist
            expect(res.status).to.equal(200)
            expect(res.body.task).to.not.be.empty
            done()
        })
    })
    
    var incorrectID = '69fbb253d72a3723043967b4'
    
    it("should return 404 if id not found", (done) => {
        superagent.delete(`${BASE_URL}/tasks/${incorrectID}`)
        .end((err, res) => {
            expect(err).to.exist
            expect(res.status).to.equal(404)
            done()
        })
    })
})

describe("ToDo - PATCH(UPDATE) tests", () => {
    
    var testUpdate = {
        text: 'Hello from test',
        completed: true
    }
    let _id = ''
    
    it("should update a task with an id", (done) => {
        superagent.post(`${BASE_URL}/tasks`)
        .send(testUpdate)
        .set('accept', 'json')
        .end((err, res) => {
            _id = res.body._id
            superagent.patch(`${BASE_URL}/tasks/${_id}`)
            .send(testUpdate)
            .set('accept', 'json')
            .end((err, res) => {
                expect(err).to.not.exist
                expect(res.status).to.equal(200)
                expect(res.body.task.completed).to.equal(true)
                expect(res.body.task.text).to.equal(testUpdate.text)
                done()
            })
        })
    })
    
    var testUpdate2 = {
        completed: false
    }
    
    it("should update completedAt to null when completed is false", (done) => {
        superagent.patch(`${BASE_URL}/tasks/${_id}`)
        .send(testUpdate2)
        .set('accept', 'json')
        .end((err, res) => {
            expect(err).to.not.exist
            expect(res.status).to.equal(200)
            expect(res.body.task.completedAt).to.equal(null)
            superagent.delete(`${BASE_URL}/tasks/${_id}`).end(() => { done() })
            // done()
        })
    })
})