import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateResult } from '../features/Result';
import axios from 'axios';
import { Card, Spinner, Button, ButtonGroup, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const settings = useSelector((state) => state.settings.value);
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function escape(htmlStr) {
    return htmlStr
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll(/&quot;/g, '"')
      .replaceAll(/&#039;/g, "'")
      .replaceAll('&eacute;', 'é')
 }

 function escapeArray(array) {
  let string = array.join('|')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll(/&quot;/g, '"')
    .replaceAll(/&#039;/g, "'")
    .replaceAll('&eacute;', 'é');

  return string.split('|');
}

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=${settings.questionsAmount}&category=${settings.category}`)
      .then((res) => {
        let tmpArray = [];

        res.data.results.map((element) => {
          tmpArray.push({ question: escape(element.question), correctAnswer: escape(element.correct_answer), answers: [...escapeArray(element.incorrect_answers), escape(element.correct_answer)].sort() });
        });

        setQuiz(tmpArray);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOnClick(ev) {
    let selectedAnswer = ev.target.value;

    if(quiz[index].correctAnswer === selectedAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if(quiz.length === index + 1) {
      dispatch(updateResult({ correctAnswers, questions: quiz.length }));
      navigate('/results');
    }

    setIndex(index + 1);
  }

  return (
    <Container style={{ width: '500px'}}>
      {quiz.length > 0 ? 
        <Card>
          <Card.Body>
          <Card.Title style={{ textAlign: 'center', marginBottom: '16px'}}>Question {index + 1}</Card.Title>
          <Card.Text>{quiz[index].question}</Card.Text>
          <ButtonGroup vertical style={{ width: '100%' }}>
            {quiz[index].answers.map((answer, i) => {
              return (
                <Button key={i} style={{ marginTop: '8px' }} value={answer} onClick={handleOnClick}>{answer}</Button>
              );
            })}
            </ButtonGroup>
          </Card.Body>
        </Card>
      : <Spinner/>}
    </Container>
  );
}

export default Quiz;