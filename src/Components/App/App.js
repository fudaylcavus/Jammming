import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'
import Profile from '../Profile/Profile'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      username: '',
      userImg: null
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  async componentDidMount() {
    Spotify.getAccessToken()
    let UserInfo = await Spotify.getUserInfo()
    this.setState({ username: UserInfo[0], userImg: UserInfo[1]})
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

  savePlaylist() {
    var trackURIs = this.state.playlistTracks.map( savedTrack => savedTrack.uri)
    if(trackURIs) {
      Spotify.savePlaylist(this.state.playlistName, trackURIs)
    }
    this.setState({ playlistTracks: [], playlistName: "New Playlist"})
  }

  async search(searchTerm) {
    if(!searchTerm) return;
    let searchResults = await Spotify.search(searchTerm)
    if (searchResults) {    
      this.setState( { searchResults })
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Profile username={this.state.username} imageSrc={this.state.userImg}/>
          <SearchBar
          onConnect={this.connectSpotify}
          onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>
            <Playlist 
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

  


export default App;
