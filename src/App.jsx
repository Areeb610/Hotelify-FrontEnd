import LoginSignupPage from './pages/Register/Register'
import Home from './pages/Home/home'
import RoomPage from './pages/Rooms/rooms'
import ReviewsPage from './pages/Reviews/reviews'
import ContactForm from './pages/Contact/contact'
import Admin from './pages/Admin/admin'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './customs.css'
function App() {


  return (
    <Router>  
      <Switch>
        <Route exact path="/">
          <LoginSignupPage  />
        </Route>
        <Route exact path="/home" component ={Home}/>
        <Route exact path="/rooms" component ={RoomPage}/>
        <Route exact path="/reviews" component ={ReviewsPage}/>
        <Route exact path="/contact" component ={ContactForm}/>
        <Route exact path="/admin" component ={Admin}/>


      </Switch>
    </Router>
  )
}

export default App
