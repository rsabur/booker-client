import './App.css';
import DjContainer from './components/DjContainer';
import NavBar from './components/NavBar';
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom"
import LandingPage from './components/LandingPage';
import ProfilePage from './components/ProfilePage';
import DjPage from './components/DjPage';
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [djs, setDjs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [bookings, setBookings] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [sortBy, setSortBy] = useState('none')

  const history = useHistory()


  useEffect(() => {
    fetch('http://127.0.0.1:3000/djs')
      .then(res => res.json())
      .then(djArr => setDjs(djArr))
  }, [])

  const filteredDjs = djs.filter(dj => {
    return dj.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleAddBooking = (newBooking) => {
    const newBookingArr = [newBooking, ...bookings];
    setBookings(newBookingArr);
  }

  const handleLoginClient = (e) => {
    e.preventDefault()

    const usernameInput = e.target.username.value
    const passwordInput = e.target.password.value



    fetch('http://127.0.0.1:3000/clients')
      .then(res => res.json())
      .then(clients => {
        clients.filter(client => {
          if (client.username === usernameInput && client.password === passwordInput) {
            setCurrentUser(client.id)
            history.push(`/clients/${client.id}`)
          } else {
            return "Username and/or Password does not match!"
          }
        })
      })
  }

  const handleSort = filteredDjs.sort((dj_a, dj_b) => {
    if (sortBy === "Price ↓ Descending") {
      return (dj_a.rate - dj_b.rate)
    } else if (sortBy === "Price ↑ Ascending") {
      return (dj_b.rate - dj_a.rate)
    }
  })


  return (
    <div className="App">
      <header className="App-header">
      <img src="https://i.imgur.com/G9YTRtU.png" class="img-fluid" alt="logo" style={{ width: "65%", height: 140 }} />
        <Switch>
          <Route exact path="/">
            <img src="https://crackmagazine.net/wp-content/uploads/2021/03/191116_PRINTWORKS_BuggedOut_JakeDavis_@hungryvisuals-3677-scaled.jpg" class="img-fluid" alt="dj-controls" style={{ width: "100%", height: 350 }} />
            <LandingPage handleLoginClient={handleLoginClient} />
          </Route>
          <Route exact path="/djs">
            <NavBar setSearchTerm={setSearchTerm} currentUser={currentUser} djs={handleSort} setSortBy={setSortBy} sortBy={sortBy} />
            <DjContainer djs={handleSort} />
          </Route>
          {/* <Route exact path="/profilepage">
          <NavBar setSearchTerm={setSearchTerm} />
            <ProfilePage />
          </Route> */}
          <Route exact path="/djs/:id">
            <DjPage onAddBooking={handleAddBooking} currentUser={currentUser} />
          </Route>
          <Route exact path={`/clients/${currentUser}`}>
            <img src="https://crackmagazine.net/wp-content/uploads/2021/03/191116_PRINTWORKS_BuggedOut_JakeDavis_@hungryvisuals-3677-scaled.jpg" class="img-fluid" alt="dj-controls" style={{ width: "100%", height: 350 }} />
            <ProfilePage currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
