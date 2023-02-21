import React from 'react'

// importing bootstrap components from react-bootstrap
import {
    Container,
    Nav,
    Navbar,
    NavDropdown
} from "react-bootstrap"

// importing routes from react-router-dom
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from 'react-router-dom';

import NavbarConfig from '../../static/js/navbar';


export default function NavbarComponent() {
    React.useEffect(() => NavbarConfig())
    return (
        <Navbar variant='dark' expand="lg" id="mainNav" data-bs-theme="dark">
            <Container className="px-4 px-lg-5">
                <LinkContainer to={ '/' }>
                    <Navbar.Brand id="brand">Art Blog</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarResponsive" aria-expanded="true" aria-label="Toggle navigation" title='Menu' />
                <Navbar.Collapse id="navbarResponsive">
                    <Nav color='white' variant='light' className="ms-auto py-4 py-lg-0 text-light">
                        <Nav.Item className="px-lg-3 py-3 py-lg-4">
                            <Nav.Link color='white' href="/" role="button" className='text-light item'>Home</Nav.Link>
                        </Nav.Item>
                        <NavDropdown menuVariant='dark' title={
                            <span className='text-light nav-dropdown item'>Posts</span>
                        } role="button" className="px-lg-3 py-3 py-lg-4">
                            <NavDropdown.Item>Posts</NavDropdown.Item>
                            <LinkContainer to={ '/post/viewpost' }><NavDropdown.Item>My Posts</NavDropdown.Item></LinkContainer>
                            <LinkContainer to={ '/post/create' }><NavDropdown.Item>Create Post</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                        <NavDropdown menuVariant='dark' title={ <span className='text-light nav-dropdown item'>About</span> } className="px-lg-3 py-3 py-lg-4 text-light">
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                            <LinkContainer to={ '/user/login' }>
                                <NavDropdown.Item>Login</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item>Log Out</NavDropdown.Item>
                            <LinkContainer to={ '/user/register' }>
                                <NavDropdown.Item>Sign Up</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Outlet />
            </Container>
        </Navbar>

    )
}
