// this file defines the battle schema
// and init's the connection to our mongoDB
// process

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var noteSchema = new Schema({
	id: Number,
	text: String,
	geo: {
		timestamp: Number,
		coords:{
			speed: Number,
			heading: Number,
			altitudeAccuracy: Number,
			accuracy: Number,
			altitude: Number,
			longitude: Number,
			latitude: Number
		}
	},
	created_at: String
});

mongoose.model('Note', noteSchema);

if (process.env.DATABASE_URL === undefined) {
	mongoose.connect("mongodb://localhost:27017");	
} else {
	console.log('Connecting to database at' +  process.env.DATABASE_URL);
	mongoose.connect(process.env.DATABASE_URL);	
}
