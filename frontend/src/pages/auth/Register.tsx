import { FormEvent, ChangeEvent } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import useAuth from '../../hooks/useAuth';
import { register } from '../../services/auth';

import { useState } from 'react';

const RegisterPage = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { dispatch, AUTH_ACTIONS } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register({ dispatch, username: input.username, email: input.email, password: input.password, AUTH_ACTIONS })
        // console.log("sa");
        // console.log(input.email, input.password);

        // dispatch({type:AUTH_ACTIONS.LOGIN, payload:{email:input.email, password:input.password}})
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name='username' value={input.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' value={input.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' value={input.password} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default RegisterPage;