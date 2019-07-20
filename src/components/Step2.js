import React from 'react';

import { Row, Col, Table, Spinner } from 'react-bootstrap';

class Step2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      error: ''
    };
  }

  componentDidMount() {
    fetch(`https://api.codetabs.com/v1/proxy?quest=${this.props.url}`)
      .then(res => res.text())
      .then(
        (result) => {
          let parser = new DOMParser();
          let doc = parser.parseFromString(result, 'text/html');

          let rows = doc.getElementsByClassName('RC-glanceRunnerRow');

          let data = [];

          for (var i = 0; i < rows.length; i++) {
            let row = {
              no: rows[i].querySelectorAll('.RC-glanceRunner__no')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              draw: rows[i].querySelectorAll('.RC-glanceRunner__draw')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              form: rows[i].querySelectorAll('.RC-glanceRunner__form')[0].innerHTML.replace(/^\s+|\s+$/, '').trim(),
              horse: rows[i].querySelectorAll('.RC-glanceRunner__name')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              age: rows[i].querySelectorAll('.RC-glanceRunner__age')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              wgt: rows[i].querySelectorAll('.RC-glanceRunner__wgt')[0].innerText.replace(/^\s+|\s+$/, '').replace('-', '&dash;').trim(),
              jockey: rows[i].querySelectorAll('.RC-glanceRunner__team_jockey .RC-glanceRunner__teamName')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              trainer: rows[i].querySelectorAll('.RC-glanceRunner__team_trainer .RC-glanceRunner__teamName')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              rtf: rows[i].querySelectorAll('.RC-glanceRunner__team_trainer .RC-glanceRunner__teamCount')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              allowance: rows[i].querySelectorAll('.RC-glanceRunner__team_jockey .RC-glanceRunner__teamCount')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              or: rows[i].querySelectorAll('.RC-glanceRunner__or')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              ts: rows[i].querySelectorAll('.RC-glanceRunner__ts')[0].innerText.replace(/^\s+|\s+$/, '').trim(),
              rpr: rows[i].querySelectorAll('.RC-glanceRunner__rpr')[0].innerText.replace(/^\s+|\s+$/, '').trim()
            };

            if (row.form.length > 3) {
              row.form = row.form.substr(row.form.length - 3, 3);
            }

            data.push(row);
          }

          this.setState({
            loading: false,
            data: data
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error
          });
        }
      )
  }

  render() {
    const { url } = this.props;
    const { loading, data } = this.state;

    const rows = data.map((row, index) =>
      <tr key={index}>
        <td>{row.no}</td>
        <td>{row.draw}</td>
        <td dangerouslySetInnerHTML={{__html: row.form}} />
        <td>{row.horse}</td>
        <td>{row.age}</td>
        <td dangerouslySetInnerHTML={{__html: row.wgt}} />
        <td>{row.trainer}</td>
        <td>{row.rtf}</td>
        <td>{row.jockey}</td>
        <td>{row.allowance}</td>
        <td>{row.or}</td>
        <td>{row.ts}</td>
        <td>{row.rpr}</td>
      </tr>
    );

    return (
      <>
        {
          loading ? 
          <Row className="text-center">
            <Col>
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
          : 
          <>
            <Row>
              <Col>
                <h4 className="py-3">Result for: {url}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th colSpan="2">NO.</th>
                      <th>DRAW</th>
                      <th>HORSE</th>
                      <th>AGE</th>
                      <th>WGT</th>
                      <th colSpan="2">TRAINER <small>RTF%</small></th>
                      <th colSpan="2">JOCKEY <small>Allowance</small></th>
                      <th>OR</th>
                      <th>TS</th>
                      <th>RPR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
          }
      </>
    );
  }
}

export default Step2;
