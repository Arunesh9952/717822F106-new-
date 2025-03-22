import React, { useState } from 'react';
import {Form,Label, Input, Button } from 'reactstrap';
const Afford = () => {
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
  <div>
    <h1>Average Calculator HTTP MicroService</h1>
        <Form onSubmit={handleSubmit}>
        
            <Label for="numberType">Select Number Type</Label>
            <Input type="select" id="numberType" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="primes">Prime Numbers</option>
              <option value="fibo">Fibonacci Numbers</option>
              <option value="even">Even Numbers</option>
              <option value="rand">Random Numbers</option>
            </Input>
         
          <Button color="primary" type="submit">Submit</Button>
        </Form>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data && (
         
             <div style={{alignItems:'center'}}>
            <h2>API Response</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h2>Details</h2>
            <pre>{JSON.stringify(details, null, 2)}</pre>
          </div>
        
         
        )}
  </div>

  );
};
export default Afford;
