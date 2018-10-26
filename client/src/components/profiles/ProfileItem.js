import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validation/is-empty'
class ProfileItem extends Component {
  render() {
    const { profile, loading } = this.props

    if (loading || Object.keys(profile).length === 0) {
      return (
        <div className="profileCard card card-body bg-light mb-3">
          <div className="row">
            <div className="profileCard__skeleton profileCard__skeleton--round rounded-circle" />
            <div className="col-lg-6 col-md-4 col-8">
              <div className="profileCard__skeleton profileCard__skeleton--row profileCard__skeleton--long" />
              <div className="profileCard__skeleton profileCard__skeleton--row" />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="profileCard card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <div className="profileCard__imageWrapper">
              <img src={profile.user.avatar} alt="" className="profileCard__image"/>
            </div>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3 className="profileCard__name">{profile.user.name}</h3>
            <p className="profileCard__company">
              {profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
            </p>
            <p className="profileCard__location">
              {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
            </p>
            <Link to={`/profile/${profile.handle}`} className="button btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, idx) => (
                <li key={idx} className="profileCard__skillItem list-group-item">
                  <i className="fa fa-check pr-1" /> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem.defaultProps = {
  profile: {},
  loading: false
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default ProfileItem
