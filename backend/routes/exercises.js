const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find() 
        .then(exercises => res.json(exercises)) 
        .catch(err => res.status(400).json('Error: ' + err)); 
});
//handles incoming http add requests
router.route('/add').post((req, res) => { 
    const username = req.body.username; 
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err)); //else returns error message    
});
// '/:id' is object id created automatically by mongodb
router.route('/:id').get((req,res) => { //get request for exercise
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise)) //returns as json
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { //delete request
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').post((req, res) => { //update request
  Exercise.findById(req.params.id) //finds current exercise
    .then(exercise => { 
      exercise.username = req.body.username; //set exercise username to rep.body.username which is new username
      exercise.description = req.body.description; //same for other fields
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;