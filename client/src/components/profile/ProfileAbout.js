import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from '../../validation/is-empty'

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props
    const skills = profile.skills.map(((skill, idx) => (
        <div className="p-3" key={idx}>
          <i className="fa fa-check"></i> {skill}
        </div>
      )))
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {isEmpty(profile.bio) ? null : (
              <div>
                <h3 className="text-info">About</h3>
                <p className="lead">{profile.bio}</p>
                <hr />
              </div>
            )}
            <h3 className="text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
