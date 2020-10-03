import React from 'react'
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import ProgressBar from './Messages/ProgressBar'
import ProgresBar from './Messages/ProgressBar'

class App extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" >
            <ProgressBar uploadState="uploading" percentUploaded="70" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    )
  }
}

export default App
