import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: ''}
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
        
    }

    search() { 
        if (!this.state.value) return;
        this.props.onSearch(this.state.value)
    }

    handleTermChange(event) {
        this.setState({ value: event.target.value})
    }

    render() {
        return (
            <div className="SearchBar">
                <input 
                onChange={this.handleTermChange}
                placeholder="Enter A Song, Album, or Artist" />
                <button
                onClick={this.search}
                className="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar