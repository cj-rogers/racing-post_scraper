import React from 'react';

import { Row, Col, Form, Button } from 'react-bootstrap';

class Step1 extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Form
            noValidate
            validated={this.props.validated}
            onSubmit={this.props.handleSubmit}
          >
            <Form.Group controlId="formURL">
              <Form.Control size="lg" type="url" placeholder="Enter racing post URL" value={this.props.url} onChange={this.props.handleChange} required />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Invalid URL! Example: https://www.racingpost.com/racecards/193/navan/2019-07-13/735427/at-a-glance</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" size="lg" disabled={this.props.disable}>Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Step1;
