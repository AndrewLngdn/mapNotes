/** @jsx React.DOM */

// Heirarchy:

// MapNotes
//   MapContainer
//   NotesTable
//     NoteInput
//     NoteList
//       Note


L.mapbox.accessToken = 'pk.eyJ1IjoiYW5kcmV3bG5nZG4iLCJhIjoiUkhWbjIwcyJ9.WPlxRw9x7_LLOqMZ2A7onA';
var geo_markers = {}; 


var update_markers = function(notes){
	if (map === undefined ){
		return;
	}

	$.each(geo_markers, function(index, marker) {
    	map.removeLayer(marker);
	}); 

	notes.forEach(function(note){
		if (note.geo !== undefined){
			geo_markers[note.id] = L.marker([note.geo.coords.latitude,
										note.geo.coords.longitude]);	
		}
	});

	$.each(geo_markers, function(index, marker){
		if (map !== undefined){
			map.addLayer(marker);	
		}
	});
}


var MapNotes = React.createClass({
	getInitialState: function(){
		return {notes:{}};
	},
	componentDidMount: function() {
		this.loadNotes();
	},
	loadNotes: function() {
		// TODO: use localstorage
		// TODO: connect to server
		this.setState({notes: this.props.notes});
	},
	handleNoteSubmit: function(note){
		var notes = this.state.notes;
		notes[note.id] = note;
		this.setState({notes: notes});
		//TODO: send update to server
	},
	handleGeoLocationUpdate: function(geo_update){
		var notes = this.state.notes;
		note = notes[geo_update.note_id]
		note.geo = geo_update.geo;
		notes[note.id] = note;
		this.setState({notes: notes});
	},
	render: function() {
		return (
			<div id="map-notes-content">
				<MapContainer notes={this.state.notes}/>
				<NotesTable notes={this.state.notes}
							handleNoteSubmit={this.handleNoteSubmit} 
							handleGeoLocationUpdate={this.handleGeoLocationUpdate}
				/>
			</div>
		);
	}
});

var MapContainer = React.createClass({
	render: function(){

		update_markers(this.props.notes);

		return (
			<div id="map">
				<div id="title">mapNotes</div>
			</div>
		)
	}
});

var NotesTable = React.createClass({
	render: function() {
		return (
			<div id="notes-table">
				<NoteInput notes={this.props.notes}
						   onNoteSubmit={this.props.handleNoteSubmit} 
						   onGeoLocationUpdate={this.props.handleGeoLocationUpdate} />

				<NoteList notes={this.props.notes}/>
			</div>
		);
	}
});

var NoteInput = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var note_text = this.refs.text.getDOMNode().value.trim();
		var id = this.props.notes.length;

		this.props.onNoteSubmit({id: id, text: note_text});
		this.refs.text.getDOMNode().value = '';

		if (Modernizr.geolocation) {

			navigator.geolocation.getCurrentPosition(function(geo){
			this.props.onGeoLocationUpdate({note_id: id, geo: geo});

			}.bind(this));
			
			return;

		} else {
			console.log("no native support; maybe try a fallback?");
		}

		if (!note_text){
			return;
		}

	},
	render: function() {
		return (
			<form className="note-form" onSubmit={this.handleSubmit}>
				<input className="note-input" type="text" ref="text" placeholder="Type your note here:" />
				<input className="submit" type="submit" value="save" />
			</form>
		);
	}
});

var NoteList = React.createClass({
	render: function() {
		var noteNodes = [];
		$.each(this.props.notes, function(id, note){
			var noteNode = ( 
				<Note key={note.id}>
					{note.text}
				</ Note>
				);
			noteNodes.push(noteNode);
		});

		return (
			<ul id="note-list">
				{noteNodes}
			</ul>
		);
	}
})

var Note = React.createClass({
	render: function() {
		return (
			<li className="note">
				{this.props.children}
			</li>
		);
	}
});


var NOTES = [
	{
		text: "Order the steak rare next time, they overcook.",
		geo: {
			"timestamp": 1410726740801,
			"coords": {
				"speed": null,
				"heading": null,
				"altitudeAccuracy": null,
				"accuracy": 20,
				"altitude": null,
				"longitude": -122.4383,
				"latitude": 37.78758
			}
		},
		id: 0
	},

	{
		text: "The burger was so-so, get something else.",
		geo: {
			"timestamp": 1410726740801,
			"coords": {
				"speed": null,
				"heading": null,
				"altitudeAccuracy": null,
				"accuracy": 20,
				"altitude": null,
				"longitude": -122.43861899999999,
				"latitude": 37.7862875
			}
		},
		id: 1
	},

	{
		text: "Ask for wanda, she gives a better cut.",
		geo: {
			"timestamp": 1410726740801,
			"coords": {
				"speed": null,
				"heading": null,
				"altitudeAccuracy": null,
				"accuracy": 20,
				"altitude": null,
				"longitude": -122.43614899999999,
				"latitude": 37.7851875
			}
		},
		id: 2
	},

	{
		text: "Don't bother with the whiskey sour.",
		geo: {
			"timestamp": 1410726740801,
			"coords": {
				"speed": null,
				"heading": null,
				"altitudeAccuracy": null,
				"accuracy": 20,
				"altitude": null,
				"longitude": -122.43814599999999,
				"latitude": 37.7855675
			}
		},
		id: 3
	}
];

var mapNotes = React.renderComponent(<MapNotes notes={NOTES} />, document.body);

// Create a map in the div #map
var map = L.mapbox.map('map', 'andrewlngdn.jgcecm6d');

map.on('ready', function(){
	mapNotes.forceUpdate();
})










