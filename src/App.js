import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Step1 from './components/Step1';
import Step2 from './components/Step2';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      url: '',
      validated: false,
      valid: false,
      disable: false
    };
  }

  handleChange(event) {
    this.setState({ 
      url: event.target.value,
      validated: false,
      valid: false
     });
  }

  handleSubmit(event) {
    this.setState({ disable: true });
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      this.setState({ valid: false });
    } else {
      this.setState({ valid: true });
    }

    this.setState({ 
      validated: true,
      disable: false 
    });
  }
  
  render() {
    const { url, validated, valid , disable} = this.state;
    let step2;

    if (valid && validated) {
      step2 = <Step2 url={url} />
    }

    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center py-5">Racing Post - 'At a Glance' Scraper</h1>
          </Col>
        </Row>
        <Step1 url={url} validated={validated} valid={valid} handleChange={this.handleChange} handleSubmit={this.handleSubmit} disable={disable} />
        {step2}
      </Container>
    );
  }
}

export default App;
