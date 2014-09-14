/** @jsx React.DOM */

// Heirarchy:

// MapNotes
//   MapContainer
//   NotesTable
//     NoteInput
//     NoteList
//       Note


var MapNotes = React.createClass({
	getInitialState: function(){
		return {notes:[]};
	},
	componentDidMount: function() {
		this.loadNotes();
	},
	loadNotes: function() {
		// TODO: use localstorage
		this.setState({notes: this.props.notes});
	},
	handleNoteSubmit: function(note){
		var notes = this.state.notes;
		notes.unshift(note);
		this.setState({notes: notes});
	},
	render: function() {
		return (
			<div id="map-notes-content">
				<MapContainer notes={this.state.notes}/>
				<NotesTable handleNoteSubmit={this.handleNoteSubmit} notes={this.state.notes}/>
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
				<NoteInput onNoteSubmit={this.props.handleNoteSubmit}/>
				<NoteList notes={this.props.notes}/>
			</div>
		);
	}
});

var NoteInput = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var note_text = this.refs.text.getDOMNode().value.trim();
		if (!note_text){
			return;
		}
		this.props.onNoteSubmit({text: note_text});
		this.refs.text.getDOMNode().value = '';
		return;
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
		var noteNodes = this.props.notes.map(function(note){
			return (
				<Note>
					{note.text}
				</ Note>
			);
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
	{text: "Order the steak rare next time, they overcook." },
	{text: "The burger was so-so, get something else." },
	{text: "Ask for wanda, she gives a better cut." },
	{text: "Don't bother with the whiskey sour." }
];


React.renderComponent(<MapNotes notes={NOTES} />, document.body);











