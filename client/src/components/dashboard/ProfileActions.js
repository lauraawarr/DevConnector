import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div className="mb-4 profileActions" role="group">
        <Link to="/edit-profile" className="btn btn-light button profileActions__button">
            <i className="fas fa-user-circle mr-1"></i>
            Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light button profileActions__button">
            <i className="fab fa-black-tie mr-1"></i>
            Add Experience</Link>
        <Link to="/add-education" className="btn btn-light button profileActions__button">
            <i className="fas fa-graduation-cap mr-1"></i>
            Add Education</Link>
    </div>
  )
}

export default ProfileActions;
