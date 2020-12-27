import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { AuthClient } from '../util/AuthClient';

interface formData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ username, password }: formData) => {
    // This will become async once auth properly set up
    const res = AuthClient.signIn(username, password);
    if (res) {
      window.location.reload();
    }
  };

  return (
    <Container className={'min-vh-100 d-flex align-items-center'}>
      <Col sm={6} className={'col-sm-12 col-md-6 offset-md-3'}>
        <Card>
          <CardBody>
            <CardTitle tag='h1'>Login</CardTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  name='username'
                  placeholder='Enter your username'
                  innerRef={register({
                    required: true,
                  })}
                  invalid={errors.username}
                />
                {errors.username && <FormFeedback>Please enter a username</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type={'password'}
                  name='password'
                  placeholder='Enter your password'
                  innerRef={register({
                    required: true,
                  })}
                  invalid={errors.password}
                />
                {errors.password && <FormFeedback>Please enter a password</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Button type='submit' color={'primary'} block>
                  Login
                </Button>
              </FormGroup>
            </form>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
