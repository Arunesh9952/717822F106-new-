import React, { Fragment, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
const Sample = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [type, setType] = useState('fibo');
  const [details, setDetails] = useState({
    windowPrevState: [],
    windowCurrState: [],
    numbers: [],
    avg: 0,
  });
  const apiFetch = async (selectedType) => {
    try {
      const url = `http://localhost:9000/numbers/${selectedType}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
      const newNumbers = result.numbers.filter((n) => !details.windowCurrState.includes(n));
      let updatedWindow = [...details.windowCurrState, ...newNumbers];
      if (updatedWindow.length > 10) {
        const overflow = updatedWindow.length - 10;
        updatedWindow = updatedWindow.slice(overflow);
      }
      setDetails({
        windowPrevState: details.windowCurrState,
        windowCurrState: updatedWindow,
        numbers: result.numbers,
        avg: updatedWindow.reduce((a, b) => a + b, 0) / updatedWindow.length,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    apiFetch(type);
  };
  return (
    <Fragment>
      <Container>
        <h1>Average Calculator Microservice</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="numberType">Select Number Type</Label>
            <Input type="select" id="numberType" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="primes">Prime Numbers</option>
              <option value="fibo">Fibonacci Numbers</option>
              <option value="even">Even Numbers</option>
              <option value="rand">Random Numbers</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">Submit</Button>
        </Form>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data && (
          <div style={{ marginTop: '20px' }}>
            <h2>API Response</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h2>Details</h2>
            <pre>{JSON.stringify(details, null, 2)}</pre>
          </div>
        )}
      </Container>
    </Fragment>
  );
};
export default Sample;
