/** @jsx React.DOM */

// Heirarchy:

// MapNotes
//   MapContainer
//   NotesTable
//     NoteInput
//     NoteList
//       Note


var MapNotes = React.createClass({

	render: function() {
		return (
			<div id="map-notes-content">
				<MapContainer notes={this.props.notes}/>
				<NotesTable notes={this.props.notes}/>
			</div>
		);
	}
});

var MapContainer = React.createClass({
	render: function(){
		return (
			<div id="map-box">map goes here</div>
		)
	}
});

var NotesTable = React.createClass({
	render: function() {
		return (
			<div id="notes-table">
				<NoteInput />
				<NoteList notes={this.props.notes}/>
			</div>
		);
	}
});

var NoteInput = React.createClass({
	render: function() {
		return (
			<form>
				<input type="text" ref="text" placeholder="note" />
				<input type="submit" value="save" />
			</form>
		);
	}
});

var NoteList = React.createClass({
	render: function() {
		var noteNodes = this.props.notes.map(function(note){
			return (
				<Note>
					{note.text}
				</ Note>
			);
		});
		return (
			<ul>
				{noteNodes}
			</ul>
		);
	}
})

var Note = React.createClass({
	render: function() {
		return (
			<li>
				{this.props.children}
			</li>
		);
	}
});


var NOTES = [
				{text: "order the steak rare next time, they overcook" },
				{text: "The burger was so-so, get something else" },
				{text: "ask for wanda, she gives a better cut" },
				{text: "dont bother with the whiskey sour" }
];


React.renderComponent(<MapNotes notes={NOTES} />, document.body);











