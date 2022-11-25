import React from 'react'
import { Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
// import Header from './header'
import Dash from './dashboard'
import store from '../redux'
// import wave from '../assets/images/wave.jpg'

const Home = () => {
  return (
    <Provider store={store}>
      <Switch>
        {/* <Route exact path="/dashboard" component={() => <Header />} /> */}
        <Route exact path="/dashboard" component={() => <Dash />} />
        <Route exact path="/dashboard/main" />
        <Route exact path="/dashboard/profile/:user" />
      </Switch>
    </Provider>
  )
}

Home.propTypes = {}

export default Home
