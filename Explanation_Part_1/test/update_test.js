const assert = require('assert')
const Student = require('../src/student')

describe('Update Records', () => {
    let joe;
    
    beforeEach((done)=>{
        joe = new Student({name:'Joe', postCount: 0})     //An _id is assigned here
        joe.save()
        .then(()=>{done();})
        
    });
    
    function assertName(operation, done){
        operation 
        .then(() => Student.find({}) ) //Get all users as criteria is empty
        .then((allstudents) => {
            assert(allstudents.length === 1);
            assert(allstudents[0].name === 'Alex');
            done();
        })
        
    }
    
    //MODEL INSTANCE UPDATES
    //1.
    it('instance type using set and save', (done) => {
        
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
        
        
        //assertName function is equivalent to below code
        /**joe.save()
        .then(() => Student.find({}) ) //Get all users as criteria is empty
        .then((allstudents) => {
            assert(allstudents.length === 1);
            assert(allstudents[0].name === 'Alex');
            done();
        })  **/         
        
    })
    
    //2.
    it('A model instance can update', (done) => {
        assertName(joe.update({ name: 'Alex' }), done);
        
    })
    
    //CLASS BASED UPDATES
    //1.
    it('A model class can update', (done)=> {
        assertName(
            Student.update({name: 'Joe'}, {name: 'Alex'}),
            done
        );
        
    })
    
    //2.
    it('A model class can update one record', (done)=> {
        assertName(
            Student.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),
            done
        );
        
    })
    
    //3.
    it('A model class can find a record by ID and update', (done)=> {
        assertName(
            Student.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done
        );
        
    })
    
    //Operator
    it('increment students post count by 1', (done) => {
        Student.update({name: 'Joe'}, { $inc : { postCount: 1 } })
        .then(() => Student.findOne( {name: 'Joe'}))
        .then((student) => {
            assert(student.postCount === 1);
            done();
        })
        
    })
    
})