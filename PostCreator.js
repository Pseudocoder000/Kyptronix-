import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthenticator } from "@/hooks/authenticated";
import { Card, Col, Container, Row, Alert, Form, FormControl, Button } from "react-bootstrap";
const PostCreator = () => {
    const authenticated = useAuthenticator();
    let router = useRouter();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    useEffect(() => {
        if (authenticated === false) {
            router.push('/');
        }
    }, [authenticated, router]);


    async function handleSubmit(e) {
        e.preventDefault();
        if (errorMsg) setErrorMsg('');
        if (successMsg) setSuccessMsg();

        if (!e.currentTarget.message.value) {
            setErrorMsg("You Can Not Make An Empty post!");
        }

        else {

            try {
                const formData = new FormData();
                formData.append("message", e.currentTarget.message.value);
                const data = new URLSearchParams(formData);

                const res = await fetch('/api/createPost', {
                    method: 'POST',
                    body: data,
                    credentials: 'include'
                });

                if (res.status === 200) {
                    setSuccessMsg("Post Successfully Created");
                }

                else if (res.status === 401) {
                    setErrorMsg("An Unknown Error Occured While Creating Your Post");
                }
            }

            catch (error) {
                console.log(error.message);
                setErrorMsg(error.message);
            }
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col className="col-md-6 m-auto">
                    <Card className="card-body">
                        <h1 className="text-center mb-3">
                            Create Your Post
                        </h1>
                        {errorMsg && <Alert className="alert-warning">{errorMsg}</Alert>}
                        {successMsg && <Alert className="alert-success">{successMsg}</Alert>}
                        {!successMsg &&
                            <Form onSubmit={handleSubmit} autoComplete="off">
                                <Form.Group>
                                    <Form.Label htmlFor="message" className="mt-4">
                                        Create Your Post
                                    </Form.Label>
                                    <FormControl
                                        type="message"
                                        id="message"
                                        name="message"
                                        placeholder="Write Your Post Here"
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" className="btn-large btn-primary mt-4">Submit</Button>
                                </div>
                            </Form>
                        }
                    </Card>
                </Col>
            </Row>

        </Container>
    )

}

export default PostCreator;