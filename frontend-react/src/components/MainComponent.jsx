import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'


export default function Root() {
    return (
        <Container className='px-4 px-lg-5 bg-inherit'>
            <Row className='gx-4 gx-lg-5 justify-content-center bg-inherit'>
                <Col md="10" lg="8" xl="7" className='bg-white rounded-lg my-3'>
                    <div className='post-preview'>
                        <a href="/">
                            <h2 className="post-title">Man must explore, and this is exploration at its greatest</h2>
                            <h3 className="post-subtitle">Problems look mighty small from 150 miles up</h3>
                        </a>
                        <p className="post-meta">
                            Posted by <a href="#!">Start Bootstrap</a> on September 24, 2022
                        </p>
                    </div>

                    {/* Divider */ }
                    <hr className='my-4' />
                    {/* Pager */ }
                    <div className='d-flex justify-content-end mb-4'>
                        <Button color='primary' className='text-uppercase bg-blue-700 hover:bg-blue-600 hover:border-blue-600'>
                            Older Posts →
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}