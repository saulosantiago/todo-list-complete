import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { signUp } from '../../actions';
import { ButtonSignIn, ButtonSignUp } from './Styles';

const Register: React.FC = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [emailErr, setemailErr] = useState('');
  const history = useHistory()

  const handleChange = (e: any, name: string) => {
    let user: any = {};
    user[name] = e.target.value;
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    // validations
    switch (name) {
      case 'email':
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;
      case 'password':
        setpassword(user.password);
        break;
      case 'name':
        setname(user.name);
        break;
      default:
        break;
    }
  }

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (email && password && name && !emailErr) {
      const response = await signUp({ name, email, password })
      if(response){
        history.push('/')
      }
    }
  }
  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
      <Col md="4">
        <Card>
          <Form onSubmit={handleSignUp}>
            <Card.Header>
              <h2>Register Page</h2>
            </Card.Header>
            <Card.Body>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control className={(!name.length)? 'is-invalid' : 'is-valid'} type="name" placeholder="Enter name" onChange={(e) => handleChange(e, 'name')} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control className={(emailErr || !email.length)? 'is-invalid' : 'is-valid'} type="email" placeholder="Enter email" onChange={(e) => handleChange(e, 'email')} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className={(!password.length)? 'is-invalid' : 'is-valid'} type="password" placeholder="Password" onChange={(e) => handleChange(e, 'password')} />
                </Form.Group>
            </Card.Body>
            <Card.Footer className="d-flex">
              <ButtonSignUp className="btn btn-secondary" as={Link} to="/login">
                Back
              </ButtonSignUp>
              <ButtonSignIn className="btn btn-primary" type="submit">
                Sign up
              </ButtonSignIn>
            </Card.Footer>
          </Form>
        </Card>
      </Col>
    </Row>
    </Container>
  );
}

export default Register;