const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');
const users = require('./users');
const auth = require('./helpers/auth');


// Trips index
router.get('/', (req,res, next) => {
  // console.log("trying to go to main");
  // console.log(req.query.city1);
  // console.log(req.query.date1);
  // console.log(req.query.date2);

  var date1 = new Date(req.query.date1);
  var date2 = new Date(req.query.date2);
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var diffDays = Math.round(timeDiff/ (1000 * 3600 *24));
  console.log(diffDays);
  //
  // $date1 = new Date(req.query.date1);
  // $date2 = new Date(req.query.date2);




  res.render("trips/index", {layout: 'tripsLayout.hbs', city1: req.query.city1, city2: req.query.city2, city3: req.query.city3,
  city4: req.query.city4, city5: req.query.city5, date1: req.query.date1, date2: req.query.date2});

});

//Trip new
router.get('/new', auth.requireLogin, (req, res, next) => {
  res.render('trips/new');
})


// Trip create
router.post('/', auth.requireLogin, (req, res, next) => {
  let trip = new Trip(req.body);
  trip.save(function(err, trip) {
    console.log("saving!");
    if(err) {console.error(err)};

    return res.redirect(`/trips?city1=${trip.starting_city}&city2=${trip.ending_city}&city3=${trip.middle_city1}&city4=${trip.middle_city2}&city5=${trip.middle_city3}&date1=${trip.starting_Date}&date2=${trip.ending_Date}`);

  });
});

router.get('/itinerary', auth.requireLogin, (req, res, next ) => {
  res.render("trips/itinerary")
})


// Trips show
// router.get('/:id', auth.requireLogin, (req, res, next) => {
//   Trip.findById(req.params.id, function(err, room) {
//     if(err) { console.error(err) };
//
//       res.render('rooms/show', { room: room, posts: posts, roomId: req.params.id });
//     });
//   });
// });


module.exports = router;
