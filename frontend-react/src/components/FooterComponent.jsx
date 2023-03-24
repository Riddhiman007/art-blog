import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { faFacebookF, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (

        <footer className='border-top '>
            <Container className='px-4 px-lg-5'>
                <Row className='gx-4 gx-lg-5 justify-content-center'>
                    <Col md="10" lg="8" xl="7">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <a href="/" target={ "_blank" }>
                                    <span className="fa-stack fa-lg">
                                        <FontAwesomeIcon icon={ faCircle } className="fa-stack-2x" />
                                        <FontAwesomeIcon icon={ faTwitter } className="fa-stack-1x" inverse />
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" target={ "_blank" }>
                                    <span className="fa-stack fa-lg">
                                        <FontAwesomeIcon icon={ faCircle } className="fa-stack-2x" />
                                        <FontAwesomeIcon icon={ faFacebookF } className="fa-stack-1x" inverse />
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/" target={ "_blank" }>
                                    <span className="fa-stack fa-lg">
                                        <FontAwesomeIcon icon={ faCircle } className="fa-stack-2x secondary" />
                                        <FontAwesomeIcon icon={ faGithub } inverse className='fa-stack-1x' />

                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="small text-center text-muted fst-italic">Copyright my website </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

