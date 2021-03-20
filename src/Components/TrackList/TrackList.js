/* eslint-disable array-callback-return */
import React from 'react'
import './TrackList.css'
import Track from '../Track/Track'

class TrackList extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="TrackList">
                {this.props.tracks.map( track => 
                    <Track 
                    track={track}
                    isRemoval={this.props.isRemoval}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    />
                )}
            </div>
        )
    }
}

export default TrackList