import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import { Button, Checkbox, Form, Card } from 'semantic-ui-react'


function Login({ handleLoginClient }) {

    const [showSignup, setSignup] = useState(false)
    const [showLogin, setLogin] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [password, setPassword] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [client, setClient] = useState([])



    const history = useHistory()

    const toggleSignupForm = () => {
        setSignup(showSignup => !showSignup)
        setLogin(false)
    }

    const toggleLoginForm = () => {
        setLogin(showLogin => !showLogin)
        setSignup(false)
    }

    const addClient = (newClient) => {
        const newClientArr = [newClient, ...client]
        setClient(newClientArr)
    }

    const handleSubmitClient = (e) => {
        e.preventDefault()

        const formData = {
            name,
            email,
            avatar,
            location,
            password,
            username,
        }

        fetch('http://127.0.0.1:3000/clients', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(client => {
                addClient(client)
                history.push('/')
            })
    }

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" style={{ width: "100%", align: "left" }}>
                <div className="container-fluid">
                    {/* <div className="login-button"> */}
                    <button onClick={toggleLoginForm} type="button" className="btn btn-primary btn-sm">Login</button>
                    {/* </div> */}
                    {/* <div className="signup-button"> */}
                    <button onClick={toggleSignupForm} type="button" icon="signup" className="btn btn-secondary btn-sm">Signup</button>
                    {/* </div> */}
                </div>
            </nav>
            <Card style={{ display: showLogin ? "" : "none" }}>
                <Card.Content>
                    <Form onSubmit={handleLoginClient} className="Login-form" style={{ display: showLogin ? "" : "none" }}>
                        <Form.Field required>
                            <label>Username</label>
                            <input
                                placeholder='Username'
                                type="text"
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input
                                placeholder='Password'
                                type="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Remember Me' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Card.Content>
            </Card>

            <Card style={{ display: showSignup ? "" : "none" }}>
                <Card.Content>
                    <Form onSubmit={handleSubmitClient} className="signup-form" style={{ display: showSignup ? "" : "none" }}>
                        <Form.Field required>
                            <label>Avatar</label>
                            <input
                                placeholder='avatar'
                                type="text"
                                name='avatar'
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Name</label>
                            <input
                                placeholder='Name'
                                type="text"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Username</label>
                            <input
                                placeholder='username'
                                type="text"
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Email</label>
                            <input
                                placeholder='email'
                                type="text"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input
                                placeholder='password'
                                type="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Location</label>
                            <input
                                placeholder='City'
                                type="text"
                                name='location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Card.Content>
            </Card>
            <br />
        </>
    )
}

export default Login;