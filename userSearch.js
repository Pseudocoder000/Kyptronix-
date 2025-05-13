import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row, Alert } from "react-bootstrap";
import { createResult } from '@/components/searchResult'

const UserSearch = () => {
    let router = useRouter();
    const [errorMsg, setErrorMsg] = useState('');
    const [searchVal,setSearchVal] = useState('');
    const [resultJSON,setResultJSON] = useState('');

    async function handleClick(e) {
        e.preventDefault();
        if (errorMsg) setErrorMsg('');
        if (!searchVal) {
            setErrorMsg("Please Enter A Search");
        }
        else {
            try {
                const res = await fetch(`/api/search/${searchVal}`, {
                    method: 'GET'
                });
                const data = await res.json();
                if (data.length > 0) setResultJSON(data);
                else  setErrorMsg("No Posts Could Be Found For This User");
                
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
                    <Card className="card-body text-center" id="results">
                        <h1 className="display-3">
                            Search For A User
                        </h1>
                        <InputGroup>
                            <Form.Control
                                name="search"
                                id="search"
                                type="search"
                                placeholder="search for a user"
                                aria-label="Search"
                                onChange={(e) => {setSearchVal(e.target.value)}}
                                onKeyDown={(e) => { if (typeof window !== 'undefined' && e.key === 'Enter') {handleClick(e)} }}
                            />
                            <Button className="btn-primary"
                                id="search-btn"
                                type="submit"
                                onClick={handleClick}>
                                Search
                            </Button>
                        </InputGroup>
                        {errorMsg && <Alert className="mt-2 alert-warning">{errorMsg}</Alert>}
                        {resultJSON && createResult(resultJSON)}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UserSearch;