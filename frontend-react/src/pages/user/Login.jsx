import React, { useState, useContext } from 'react'
import './css/signin.css'

import { Alert, Form } from 'react-bootstrap'
import UserContext from '../../context/UserContext'
export default function Login() {
    // const [ , setToken ] = useContext(UserContext)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    React.useEffect(() => {
        const form_page = document.querySelector('.body')
        const computed_style = getComputedStyle(form_page)
        const brand = document.getElementById('brand')
        const items = document.querySelectorAll('.item')
        const nav_links = document.querySelectorAll('.nav-link')
        if (computed_style.backgroundColor === 'rgb(245, 245, 245)') {
            brand.style.color = 'rgba(0, 0, 0, 0.9)'
            items.forEach(element => {
                element.classList.add("text-dark")
            })
            nav_links.forEach(link => {
                link.classList.add("text-dark")
            })
        }
    })

    const submitLogin = async () => {
        const response = await fetch('http://127.0.0.1:8000/user/login/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
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
        <div className="text-center body" id="form-page" data-bs-theme="dark">
            <main className="form-signin">
                <form id="loginForm" onSubmit={ (ev) => {
                    ev.preventDefault();
                    try {
                        submitLogin();
                    } catch (e) {
                        alert(e.message)
                    }
                } }>
                    <img className="mb-4" src="/static/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal" style={ { color: "black" } }>Please sign in</h1>

                    <div className="form-floating">
                        <Form.Control type="text" id="floatingInput" onChange={ (e) => setUsername(e.target.value) } autoComplete='username' placeholder="Username" name="username" />
                        <Form.Label htmlFor="floatingInput">Username</Form.Label>
                    </div>
                    <div className="form-floating">
                        <Form.Control type="password" autoComplete='current-password' onChange={ (e) => setPassword(e.target.value) } id="floatingPassword" placeholder="Password"
                            name="password" />
                        <Form.Label htmlFor="floatingPassword">Password</Form.Label>
                    </div>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" id="loginSubmit" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2023</p>
                </form>
            </main>
        </div>
    )
}
