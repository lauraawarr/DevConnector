import React, { Component } from 'react'
import Moment from 'react-moment'

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props

    const expItems = experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
          {exp.to === null ? 'Current' : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        {!exp.location ? null : (
          <p><strong>Location:</strong> {exp.location}</p>
        )}
        {exp.description === '' ? null : (
          <p><strong>Description:</strong> {exp.description}</p>
        )}
      </li>
    ))

    const eduItems = education.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '}
          {edu.to === null ? 'Current' : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field of Study:</strong> {edu.fieldOfStudy}
        </p>
        {!edu.location ? null : (
          <p><strong>Location:</strong> {edu.location}</p>
        )}
        {edu.description === '' ? null : (
          <p><strong>Description:</strong> {edu.description}</p>
        )}
      </li>
    ))
    return (
      <div className="row">
        {expItems.length ? (
          <div className="col-md-6">
            <h3 className="text-info">Experience</h3>
            <ul className="list-group">
              {expItems}
            </ul>
          </div>
        ) : null}
        {eduItems.length ? (
          <div className="col-md-6">
            <h3 className="text-info">Education</h3>
            <ul className="list-group">
              {eduItems}
            </ul>
          </div>
        ) : null}
      </div>
    )
  }
}

export default ProfileCreds
