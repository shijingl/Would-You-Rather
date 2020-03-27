import React, { Component, Fragment } from 'react'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'

class Account extends Component {
    handleLogout = () => {
        const { setAuthedUser } = this.props
        setAuthedUser(null)
    }
    
    render () {
        const { authedUser, avatar } = this.props
        return (
            <Fragment>
                <ul className='nav nav-account'>
                    <li onClick={this.handleLogout}>
                        Logout
                    </li>
                    <li className='user-name'>
                        <img 
                            src={avatar}
                            alt={`Avatar of ${avatar}`}
                            className='profile-pic scale-down'/>
                    </li>
                    <li className='padding-zero user-name'>
                        {authedUser}
                    </li>
                </ul>
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, users }) {

    const avatar = users[authedUser].avatarURL
    return {
        authedUser, 
        avatar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthedUser: (id) => {
            dispatch(setAuthedUser(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)