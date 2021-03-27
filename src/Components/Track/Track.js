import React from 'react'
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props)
        this.state = {previewIsPlaying: false}
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
        this.handlePause = this.handlePause.bind(this)
    }
    handlePause() {
        console.log("durduruldum state guncellenmis olmali")
        console.log(`ben buyum: ${this.props.track.name}`)
        this.setState({previewIsPlaying: false})
    }
    renderPreview() {
        if(this.props.isRemoval) return;
        if (this.props.track.preview_url) {
            return (
                <div>
                    <audio onPause={this.handlePause} id={this.props.track.id}>
                        <source src={this.props.track.preview_url}></source>
                    </audio>
                    <button className="play-button" onClick={this.handlePreview}>{this.state.previewIsPlaying ? "⏸️" : "▶️"} </button>
                </div>
            )
        }
    }
    handlePreview() {
        let key = this.props.track.id
        let thisAudio = document.getElementById(key)
        let audios = document.querySelectorAll("audio")
        audios.forEach( audio => {
            if (audio.id !== thisAudio.id) {
                audio.pause()
                audio.currentTime = 0
            }
        } )
        if (thisAudio.paused) { 
            thisAudio.play()
            this.setState({ previewIsPlaying: true })
        } else { 
            thisAudio.pause() 
            thisAudio.currentTime = 0;
            this.setState({ previewIsPlaying: false })
        }
    }
    renderAction() {
        if (this.props.isRemoval) {
            return (
                <button 
                className="Track-action" 
                onClick={this.removeTrack}>-</button>
            )
        } else {
            return (
                <button 
                className="Track-action" 
                onClick={this.addTrack}>+</button>
            )
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track)
    }
    removeTrack() {
        this.props.onRemove(this.props.track)
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderPreview()}
                {this.renderAction()}
            </div>
        )

    }
}

export default Track