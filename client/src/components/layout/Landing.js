import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Landing extends Component {

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="landing section section--gradient">
        <div className="landing__overlay"/>
        <div className="landing__wrapper">

          <div className="landing__titleWrapper">
            <i className="landing__icon fa fa-plug"></i>
            <div>
              <h1 className="landing__title">Developer Connector</h1>
              <h2 className="landing__subtitle">
                  Create a developer profile/portfolio, share posts and get help from other developers
              </h2>
            </div>
          </div>
          <hr />
          <div className="button__wrapper">
            <Link className="button button--dark mr-2" to="/register">
                Sign Up
            </Link>
            <Link className="button button--white" to="/login">
                Login
            </Link>
          </div>

        </div>
      </div>
    )
  }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);
