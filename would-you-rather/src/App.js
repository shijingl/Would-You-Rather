import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import { connect } from 'react-redux'
import { handleInitialUsers } from './actions/shared'
import Dashboard from './components/Dashboard'
import PollDetails from './components/PollDetails'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialUsers())
  }

  render() {
    return (
      <Router>
        <Fragment>
          {
            this.props.authedUser === null
            ? <Route path='/' exact component={Login} />
            : <Fragment>
                <Route path='/' exact component={Dashboard} />
                <Route path='/questions/:question_id' component={PollDetails} />
                <Route path='/add' exact component={null}/>
                <Route path='/leaderboard' exact component={null}/>
              </Fragment>
          }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
