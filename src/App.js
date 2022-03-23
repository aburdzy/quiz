import './App.css';
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/questions" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
