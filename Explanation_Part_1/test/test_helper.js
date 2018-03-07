const mongoose = require('mongoose')

//using ES6 implementation of promise
mongoose.Promise = global.Promise 

/**before is executed once before everything else is executed, 
we want to wait to execute others until connection is established**/
//Every user function in Mocha : describe, it, beforeEach, etc., makes 'done' callback once the code inside it is executed
before((done) => {
    
    //Code to connect to Database
    mongoose.connect('mongodb://localhost/students_test')
    
    mongoose.connection
    .once('open', () => { done() })
    .on('error', (error) => { console.warn('Error connecting', error) })
})

//this code gets called before EACH test case is executed
//Every user function in Mocha : describe, it, beforeEach, etc., makes 'done' callback once the code inside it is executed
beforeEach((done) => {
    mongoose.connection.collections.students.drop(() => {
        //Now drop users is complete, we can execute test cases
        done()
    });
})