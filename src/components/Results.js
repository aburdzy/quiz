import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Results() {
  const result = useSelector((state) => state.result.value);

  return (
    <Container style={{ width: '500px'}}>
      <h2 style={{ textAlign: 'center' }}>Your result</h2>
      <h4 style={{ textAlign: 'center' }}>{result.correctAnswers}/{result.questions}</h4>
      <Button href='/' style={{ marginTop: '10px', width: '100%'}}>Go to main page</Button>
    </Container>
  );
}

export default Results;