import { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Card, Image, Button, Modal, Header, Checkbox, Form } from 'semantic-ui-react'

function ProfilePage({ currentUser, setCurrentUser }) {
    const [user, setUser] = useState([])
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [password, setPassword] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory()

    useEffect(() => {
        fetch(`http://127.0.0.1:3000/clients/${currentUser}`)
            .then(resp => resp.json())
            .then(user => {
                setUser(user)
                setIsLoaded(true)
            })
    }, [])

    if (!isLoaded) return <h2>Loading...</h2>


    const handleSubmitEdit = (e) => {
        e.preventDefault()

        const formData = {
            name,
            email,
            avatar,
            location,
            password,
            username,
        }
        // console.log(formData)

        fetch(`http://127.0.0.1:3000/clients/${currentUser}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(client => {
                // console.log(client)
                setCurrentUser(client)
                setUser(client)
                setOpen(false)
                history.push(`/clients/${currentUser}`)
            })
    }

    const handleDelete = () => {
        fetch(`http://localhost:3000/clients/${currentUser}`, {
            method: 'DELETE'
        })
        history.push('/')
    }

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
                                <NavLink style={{ position: 'absolute', right: '0' }} className="nav-link active" aria-current="page" to="/">Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Card>
                <Image src={user.avatar} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{user.name}</Card.Header>
                    <Card.Meta>
                        <span className='location'>{user.location}</span>
                    </Card.Meta>
                    <Card.Description>
                        {user.email}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button>Edit Profile</Button>}>
                        <Modal.Header>Edit Profile</Modal.Header>
                        <Form onSubmit={handleSubmitEdit} className="signup-form">
                            <Form.Field required>
                                <br />
                                <label>Avatar</label>
                                <input
                                    placeholder={user.avatar}
                                    type="text"
                                    name='avatar'
                                    value={avatar}
                                    defaultValue={user.avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Name</label>
                                <input
                                    placeholder={user.name}
                                    type="text"
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Username</label>
                                <input
                                    placeholder={user.username}
                                    type="text"
                                    name='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Email</label>
                                <input
                                    placeholder={user.email}
                                    type="text"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Password</label>
                                <input
                                    placeholder={user.password}
                                    type="password"
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>Location</label>
                                <input
                                    placeholder={user.location}
                                    type="text"
                                    name='location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                        <br />
                        <Modal.Actions>
                            <Button color='black' onClick={() => setOpen(false)}>Cancel</Button>
                            <Button
                                content="Delete My Profile"
                                labelPosition='right'
                                icon='x'
                                onClick={handleDelete}
                                negative
                            />
                        </Modal.Actions>
                    </Modal>
                </Card.Content>
            </Card>
            <br />
        </>
    )
}

export default ProfilePage;