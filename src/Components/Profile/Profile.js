import './Profile.css'
import React from 'react'

class Profile extends React.Component {
    render() {
        return (
            <div>
            { this.props.username ? (
                <div className="ProfileDiv">
                    {this.props.imageSrc ? <img src={this.props.imageSrc} alt="Profile"/> : ''}
                    <h2>Welcome, {this.props.username}</h2>
                </div>
            ) : <h2 className="infoText">Please Connect with Spotify to use Jammming</h2>}
            </div>
        )
    }
}

export default Profile