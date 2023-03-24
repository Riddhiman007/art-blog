import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import CKEditorComponent from '../../components/CKEditorComponent';

// import CKEditorComponent from '../../components/ckeditor';

function CreatePost() {

    return (
        <Container fluid>
            <Row md="10" className='gx-4 gx-lg-5 justify-content-center'>
                <Col md='11' lg='9' xl='8'>
                    <Form autoComplete='on' encType='multipart/form-data'>
                        <div className="mb-3">
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control type="text" id="title" name="title" />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="sub_title">Sub Title</Form.Label>
                            <Form.Control type="text" id="sub_title" name="sub_title" />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="editor">Content</Form.Label> <br />
                            <CKEditorComponent id='editor' />
                        </div>
                        <div className="mb-3 justify-content-end d-flex">
                            <Button color='primary' type='submit'>Submit</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePost;