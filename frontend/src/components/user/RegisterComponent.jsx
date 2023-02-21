import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Register() {
    const [ fullName, setFullName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const notify = (content) => toast(content, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
    const navigate = useNavigate()
    // useEffect(() => {
    // const submitRegistration = async () => {
    //     const form = document.getElementById("registerForm")
    //     const registerForm = new FormData(form)
    //     const response = await fetch(`http://127.0.0.1:8000/user/register?FullName=${fullName}&username=${username}&email=${email}&slug=asfasd&password=${password}`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //     const data = await response.json();
    //     if (!response.ok) {
    //         alert('Could not register')
    //     } else {
    //         alert('Successfully registered')
    //     }


    // }
    //     const form = document.getElementById('registerForm');
    //     form.onsubmit((ev) => { handleSubmit(ev) })
    // })

    const submitRegistration = async () => {
        const response = await fetch(`http://127.0.0.1:8000/user/register?FullName=${fullName}&username=${username}&email=${email}&slug=asdf&password=${password}`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            // body: `fullname=${fullName}&username=${username}&email=${email}&password=${password}`
            // body: JSON.stringify({ fullName: fullName, email: email, username: username, password: password, slug: 'none' })
        })
        const data = await response.json();
        if (!response.ok) {
            alert("Registration failed")
        } else {
            const loginResponse = await fetch('http://127.0.0.1:8000/user/login/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
            })
            const loginData = await loginResponse.json();
            if (!loginResponse.ok) {
                localStorage.setItem('access-token', null)
            } else {
                console.log(loginData)
                localStorage.setItem('access-token', loginData.access_token)
            }
            console.log(data)
        }
    }

    const submitLogin = async () => {
        const response = await fetch('http://127.0.0.1:8000/user/login/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=&username=asdf&password=asdf&scope=&client_id=&client_secret=`
        })
        const data = await response.json();
        if (!response.ok) {
            localStorage.setItem('access-token', null)
        } else {
            console.log(data)
            localStorage.setItem('access-token', data.access_token)
        }
    }

    return (
        <Container className='container-md'>
            <Row md="10" className='gx-4 gx-lg-5 justify-content-center'>
                <Col md='11' lg='9' xl='8'>
                    <form autoComplete="true" id='registerForm' onSubmit={ (ev) => {
                        ev.preventDefault();
                        try {
                            submitRegistration();
                            navigate('/')
                        } catch (e) {
                            alert('Error: ' + e.message)
                        }
                    } }>
                        <ToastContainer />
                        <div className='mb-3'>
                            <Form.Label htmlFor='fullname'>Full Name</Form.Label>
                            <Form.Control type='text' id='fullname' name='fullname' placeholder='Your full name'
                                onChange={ (e) => setFullName(e.target.value) } />
                        </div>
                        <div className='mb-3'>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control type='email' id='email' name='email' onChange={ (e) => setEmail(e.target.value) } placeholder='name@example.com' />
                        </div>
                        <div className='mb-3'>
                            <Form.Label htmlFor='username'>Username</Form.Label>
                            <Form.Control type='text' autoComplete='username' id='username' onChange={ (e) => setUsername(e.target.value) } name='username' placeholder='Your username here' />
                        </div>
                        <div className='mb-3'>
                            <Form.Label htmlFor='password'>Password</Form.Label>
                            <Form.Control type='password' autoComplete='current-password' id='password' onChange={ (e) => setPassword(e.target.value) } name='password' placeholder='Your Password here' />
                        </div>
                        <div className='mb-3 justify-content-end d-flex'>
                            <Button color='primary' id='submit' type='submit'>Submit</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
