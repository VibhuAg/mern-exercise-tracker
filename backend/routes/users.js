const router = require('express').Router(); //express router, creating route
let User = require('../models/user.model'); //uses mongoose user model that I created

router.route('/').get((req, res) => {
  User.find() //gets list of all users from mongodb database, returns promise, returns in json format
    .then(users => res.json(users)) //return users from database in json format
    .catch(err => res.status(400).json('Error: ' + err)); //if there is an error, it is caught and returns error 400 with error message
}); //first route, first endpoint that handles incoming http get requests on /Users url path
//if /users'/', then code inside happens

router.route('/add').post((req, res) => { //handles incoming http post requests
  const username = req.body.username;//new username is part of request body

  const newUser = new User({username}); //creates new instance of User using username var

  newUser.save() //new User saved to databse
    .then(() => res.json('User added!')) //then returns User added in json
    .catch(err => res.status(400).json('Error: ' + err)); //else returns error message
});

module.exports = router;