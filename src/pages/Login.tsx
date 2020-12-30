import React from 'react';
import { useForm } from 'react-hook-form';
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
import { login } from '../redux/auth/thunks/login';
import { useAppDispatch } from '../redux/store';

interface formData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ username, password }: formData) => {
    const res = await dispatch(login({ username, password }));
    if (login.rejected.match(res)) {
      // TODO: Add code here to alert user that their login was incorrect
      // this will have to wait until cognito is fully set up
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
