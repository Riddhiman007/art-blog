import React from 'react'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'

import background from "../../static/img/ganesh.jpg"
function Header(props) {
    return (
        <header className='masthead' style={ { backgroundImage: props.bg_image } } >
            <Container className='position-relative px-4 px-lg-5'>
                <Row className="gx-4 gx-lg-5 justify-content-center">
                    <Col md="10" lg="8" xl="7">
                        <div className={ props.className }>
                            <h1>{ props.heading }</h1>
                            { props.children }
                        </div>
                    </Col>
                </Row>

            </Container>
        </header>
    )
}

Header.propTypes = {
    bg_image: PropTypes.string,
    heading: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
}

Header.defaultProps = {
    bg_image: `url(${background})`,
    heading: 'Art Blog',
    className: 'site-heading'
}
export default Header;
