import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Header, Image, Modal, Checkbox, Form } from 'semantic-ui-react';



function DjPage({ onAddBooking, currentUser }) {
  const [djs, setDjs] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('')
  const [hours_booked, setHours] = useState(1)
  const [location, setLocation] = useState('')
  const [event_name, setEventName] = useState('')
  const [client_id, setClientId] = useState('')
  const history = useHistory()

  const params = useParams()

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/djs/${params.id}`)
      .then((r) => r.json())
      .then((dj) => {
        setDjs(dj);
        setIsLoaded(true)
      });
  }, [params.id]);

  if (!isLoaded) return <h2>Loading...</h2>

  const { name, image, link, bio, genre, rate, id, bookings } = djs

  const showEvents = bookings.map(event => {
    return (
      <div className="cards-bookings">
        <div className="card text-white bg-secondary mb-6" style={{ width: "18rem;" }}>
          <div className="card-body">
            <h5 className="card-title">
              {event.event_name}
            </h5>
            <p className="card-text">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{event.date_format}</li>
                <li className="list-group-item">{event.location}</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    )
  })

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    const formData = {
      date,
      hours_booked,
      location,
      event_name,
      client_id: currentUser,
      dj_id: id,
    };
    console.log(formData)

    fetch('http://127.0.0.1:3000/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(booking => {
        onAddBooking(booking)
        history.push(`/djs`)
      })
  }

  console.log()




  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ width: "100%" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/djs">DJs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/clients/${currentUser}`}>My Profile</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h1> {name} </h1>
      <img src={image} alt={name} style={{ width: "500px", height: "100%" }} />
      <p className="card-text">
        {bio}
      </p>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Genre: {genre}</li>
        <li className="list-group-item">Rate: ${rate}/hour</li>
        <li className="list-group-item">
          <h3>Upcoming Shows:</h3>
          {showEvents}
        </li>
      </ul>
      <br />
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><iframe src={link} width="350" height="390" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></li>
        <li className="list-group-item">
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Book Now</Button>}
          >
            <Modal.Header>Book {name}</Modal.Header>
            <Modal.Content image>
              <Image size='medium' src={image} wrapped />
              <Modal.Description>
                <Form onSubmit={handleBookingSubmit}>
                  {/* <Form.Field>
                    <input type="hidden" id="client_id" name="client_id" value={currentUser} />
                  </Form.Field> */}
                  <Form.Field>
                    <label>Event Name</label>
                    <input type="text"
                      id="event_name"
                      name="event_name"
                      value={event_name}
                      onChange={(e) => setEventName(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Date</label>
                    <input type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Hours Booked</label>
                    <input type="number"
                      id="hours"
                      name="hours"
                      value={hours_booked}
                      onChange={(e) => setHours(e.target.value)}
                      min="1" max="5" />
                  </Form.Field>
                  <Form.Field>
                    <label>Location</label>
                    <select id="location" name="location"
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value=''>Select City</option>
                      <option value="new york">New York</option>
                      <option value="los angeles">Los Angeles</option>
                      <option value="philadelphia">Philadelphia</option>
                      <option value="miami">Miami</option>
                    </select>
                  </Form.Field>
                  <Form.Field>
                    <label>Price: ${rate}/hour</label>
                  </Form.Field>
                  <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => setOpen(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
        </li>
        <br />
      </ul>
    </>
  )
}

export default DjPage;