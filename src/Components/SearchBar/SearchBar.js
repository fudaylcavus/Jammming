import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: ''}
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.props.onConnect()
    }
    search() { 
        if (!this.state.value) return;
        this.props.onSearch(this.state.value)
    }

    handleTermChange(event) {
        this.setState({ value: event.target.value})
        this.search()
    }

    handleSearch(event) {
        if (event.key === "Enter")
            this.search()
    }

    render() {
        return (
            <div className="SearchBar">
                <input
                onKeyPress={this.handleSearch} 
                onChange={this.handleTermChange}
                placeholder="Enter A Song, Album, or Artist" />
                <button
                onClick={this.search}
                className="SearchButton">SEARCH</button>
                {this.props.username ? '' : <button className="spotifyButton" onClick={this.props.onConnect}>Connect To Spotify</button>}
            </div>
        )
    }
}

export default SearchBar