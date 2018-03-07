const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {

 const joe = new User({ name: 'Joe'});
  it('saves a user', () => {
   

    joe.save()
      
  });


  it('finds all users with a name of joe', () => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        
      });
  });

  it('find a user with a particular id', () => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        
      });
    });


});

