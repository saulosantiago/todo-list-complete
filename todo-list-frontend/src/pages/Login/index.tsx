import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Toast } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { ButtonSignIn, ButtonSignUp } from './Styles';
import { signIn } from '../../actions';


const Login: React.FC = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [authErr, setAuthlErr] = useState(false);
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
      default:
        break;
    }
  }

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    if (email && password && !emailErr) {
      const response = await signIn({ email, password })
      if(response) {
        history.push('/')
      } else {
        setAuthlErr(true)
      }
    }
  }

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        {
          (authErr)? 
          (
            <Toast style={{ position: "absolute", marginBottom: "400px"}}>
              <Toast.Body>Your email or password is incorrect.</Toast.Body>
            </Toast>
          ):
          ''
        }
      <Col md="4">
        <Card>
          <Form>
            <Card.Header>
              <h2>Login Page</h2>
            </Card.Header>
            <Card.Body>
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
              <ButtonSignUp className="btn btn-secondary" as={Link} to="/register">
                Sign up
              </ButtonSignUp>
              <ButtonSignIn className="btn btn-primary" as={Link} to="#" onClick={handleSignIn}>
                Sign In
              </ButtonSignIn>
            </Card.Footer>
          </Form>
        </Card>
      </Col>
    </Row>
    </Container>
  )
}

export default Login;