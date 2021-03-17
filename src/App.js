import React, { useState, useEffect } from 'react';
import logo from './assets/img/logo.svg';
import './assets/css/main.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import ToastAlert from './components/ToastAlert';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api'
});

function App() {
  const [generate, setGenerate] = useState({});
  const [error, setError] = useState({
    show: false,
    title: '',
    message: ''
  });
  const [report, setReport] = useState({});
  const [isLoading, setLoading] = useState(false);

  // init call to check file download exist
  useEffect(async () => {
    const { data } = await instance.get('/init');
    if(data.status === 'SUCCESS') {
      setGenerate(data.data);
      setReport(data.data);
    }
  }, []);

  // handle onclick on Generate button
  const onGenerate = async (e) => {
    setLoading(true)
    const { data } = await instance.post('/random');
    setLoading(false);
    if(data.status === 'SUCCESS') {
      setGenerate(data.data);
      setError({
        show: false,
        title: '',
        message: ''
      });
    } else {
      setError({
        show: true,
        title: 'Error Generate',
        message: data.msg
      });
    }
  }
  // hanlde Report button
  const onReport = async (e) => {
    setLoading(true)
    const { data } = await instance.get('/report');
    setLoading(false);
    if(data.status === 'SUCCESS') {
      setReport(data.data);
      setError({
        show: false,
        title: '',
        message: ''
      });
    } else {
      setError({
        show: true,
        title: 'Error Get Report',
        message: data.msg
      });
    }
  }

  return (
    <Container fluid>
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <Row className="clearfix">&nbsp;</Row>
      <Container>
        <Row>
          <Col md={3}>&nbsp;</Col>
          <Col md={6} className="text-center">
            <Row md={12}>
              <Button disabled={isLoading} variant="primary" onClick={(e) => onGenerate(e)}>
                {isLoading ? 'Loading…' : 'Generate'}
              </Button>
            </Row>
            <Row md={12} className="mt-5">
              <Form.Label>Link: &nbsp;&nbsp;</Form.Label>
              <a href={generate.filePath} target="_blank">{generate.filePath}</a>
            </Row>
            <Row md={12} className="mt-5">
              <Button disabled={isLoading} variant="primary" onClick={(e) => onReport(e)}>
                {isLoading ? 'Loading…' : 'Report'}
              </Button>
            </Row>
            <Row md={12} className="mt-5 text-left">
              <h1>Total Printable:{'  '}</h1>
              <Form.Label className="col-md-12">Alphabetical String: { report.string }</Form.Label>
              <Form.Label className="col-md-12">Real Numbers: { report.real }</Form.Label>
              <Form.Label className="col-md-12">Integers: { report.integer }</Form.Label>
              <Form.Label className="col-md-12">Alphanumerics: { report.strNumber }</Form.Label>
            </Row>
          </Col>
          <Col md={3}>
            <ToastAlert title={error.title} message={error.message} show={error.show} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
