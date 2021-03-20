import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      searchResults: [
        {name: "Sigara", artist:"Muslum Baba", album:"Hayatim", id:"s8df9j89"},
        {name: "Sigara", artist:"Muslum Baba", album:"Hayatim", id:"z45z4"},
        {name: "Sigara", artist:"Muslum Baba", album:"Hayatim", id:"zg4z6466"}
      ],
      playlistName: "Awesome Playlist",
      playlistTracks: [
        {name: "Hello", artist: "Adele", album: "Welcome Home", id:"82798f7d"}
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) return;
    let playlistTracks = this.state.playlistTracks
    playlistTracks.push(track)
    this.setState({ playlistTracks })
  }

  removeTrack(track) {
    let playlistTracks = this.state.playlistTracks.filter( savedTrack => savedTrack.id !== track.id)
    this.setState({ playlistTracks })
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>
            <Playlist 
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

  


export default App;
