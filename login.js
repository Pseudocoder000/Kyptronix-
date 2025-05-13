import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, Row, Card, Form, FormControl, Button, Alert } from "react-bootstrap";

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('')
    let router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        if (errorMsg) setErrorMsg('');
        try {
            const formData = new FormData();
            formData.append("email", e.currentTarget.email.value);
            formData.append("password", e.currentTarget.password.value);
            const data = new URLSearchParams(formData);
            const res = await fetch('/api/login', {
                method: 'POST',
                body: data,
                credentials: 'include'

            });

            if (res.status === 200) {
                router.push('/dashboard')
            }
            else if (res.status === 401) {
                setErrorMsg('email or password is incorrect')
            }
            else {
                setErrorMsg('an unknown error has occured while logging in')
            }
        }

        catch (error) {
            console.log(error.message);
            setErrorMsg(error.message)
        }
    }

    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <Col className="col-md-6 m-auto">
                        <Card className='card-body'>
                            <h1 className="text-center mb-3">Login</h1>
                            {errorMsg && <Alert className="alert-warning">{errorMsg}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="email" className="mt-4">Email</Form.Label>
                                    <FormControl
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password" className="mt-4">Password</Form.Label>
                                    <FormControl
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter Password"
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" className="btn-large btn-primary mt-4">Login</Button>
                                </div>

                            </Form>

                            <p className="lead mt-4">
                                No Account? <Link href="/users/register">Register</Link>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default Login;