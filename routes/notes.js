var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');


/* GET users listing. */
router.get('/', function(req, res) {
  Note.find(function(err, notes, count){
	  res.send(notes);
  });
});

router.post('/create', function(req, res){
 	var d = new Date();
    var curr_date = d.getDate(); // -1 for testing
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

	new Note(req.body).save(function(err, note, count){
		if (err){
			console.log(err);
		}

 		res.send('{}');
	});
});

// router.delete('/delete/:id', function(req, res){
// 	var battle_id = req.params.id;
// 	Battle.findById(battle_id, function(err, battle){
// 		if (err){
// 			console.log('error ' + err);
// 			res.send(err);	
// 		} else {
// 			battle.remove();
// 			res.send('');
// 		}
// 	});
// });

module.exports = router;