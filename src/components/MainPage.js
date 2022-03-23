import React, { useEffect, useState } from 'react';
import { Form,  Button, Container, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCategory, updateQuestionsAmount } from '../features/Settings';

function MainPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedQuestionsAmount, setSelectedQuestionsAmount] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then((res) => setCategories(res.data.trivia_categories))
      .catch((err) => console.log(err));
  }, []);

  function handleOnClick(ev) {
    ev.preventDefault();

    if(selectedCategory === -1 || selectedQuestionsAmount === 0) {
      return;
    }

    dispatch(updateCategory({ category: selectedCategory }));
    dispatch(updateQuestionsAmount({ questionsAmount: selectedQuestionsAmount }));
    navigate('/questions');
  }

  function handleOnChangeNumber(ev) {
    let number = parseInt(ev.target.value);
    if(number <= 0 ) {
      number = 1;
    }
    else if(number > 50) {
      number = 50;
    }

    setSelectedQuestionsAmount(number);
  }

  return (
    <Container style={{ width: '500px'}}>
      <Form>
      <FloatingLabel controlId="floatingSelect" label="Select category">
        <Form.Select onChange={(ev) => setSelectedCategory(parseInt(ev.target.value))}>
          {categories.map((category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
          })}
        </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Select number of questions">
          <Form.Control type="number" style={{ marginTop: '10px'}} min='1' max='50' onChange={handleOnChangeNumber} value={selectedQuestionsAmount.toString()}/>
        </FloatingLabel>
        <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '20px'}} onClick={handleOnClick}>Submit</Button>
      </Form>
    </Container>
  );
}

export default MainPage;