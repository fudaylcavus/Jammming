import './Profile.css'
import React from 'react'

class Profile extends React.Component {
    render() {
        return (
            <div className="ProfileDiv">
                <img src={this.props.imageSrc} alt="Profile"/>
                <h2>Welcome, {this.props.username}</h2>
            </div>
        )
    }
}
export default Profile